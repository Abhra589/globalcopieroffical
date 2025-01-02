import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts"

const MERCHANT_ID = Deno.env.get('PHONEPE_MERCHANT_ID')
const SALT_KEY = Deno.env.get('PHONEPE_KEY')
const SALT_INDEX = Deno.env.get('PHONEPE_KEY_INDEX')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { orderId, amount } = await req.json()
    console.log('Received payment request:', { orderId, amount })

    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: orderId,
      merchantUserId: "MUID" + orderId,
      amount: amount * 100, // Convert to paise
      redirectUrl: `${req.headers.get("origin")}/payment-status`,
      redirectMode: "REDIRECT",
      callbackUrl: `${req.headers.get("origin")}/api/phonepe-callback`,
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    }

    const base64Payload = btoa(JSON.stringify(payload))
    
    // Create SHA256 hash
    const encoder = new TextEncoder()
    const data = encoder.encode(base64Payload + "/pg/v1/pay" + SALT_KEY)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const sha256 = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    
    const xVerify = sha256 + "###" + SALT_INDEX

    console.log('Sending request to PhonePe:', {
      base64Payload,
      xVerify: xVerify.substring(0, 10) + '...' // Log only part of the verification string
    })

    const response = await fetch("https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
      },
      body: JSON.stringify({
        request: base64Payload
      })
    })

    const data = await response.json()
    console.log('PhonePe response:', data)

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing payment:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})