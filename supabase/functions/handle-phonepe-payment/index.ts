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
    // Validate environment variables
    if (!MERCHANT_ID || !SALT_KEY || !SALT_INDEX) {
      console.error('Missing required environment variables');
      throw new Error('Server configuration error');
    }

    const { orderId, amount } = await req.json()
    console.log('Received payment request:', { orderId, amount })

    // Validate input
    if (!orderId || !amount) {
      throw new Error('Missing required parameters: orderId and amount are required');
    }

    const merchantTransactionId = `${orderId}_${Date.now()}`
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: "MUID" + orderId,
      amount: Math.round(amount * 100), // Convert to paise and ensure integer
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
      merchantTransactionId,
      base64Payload: base64Payload.substring(0, 50) + '...',
      xVerify: xVerify.substring(0, 10) + '...'
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

    const responseData = await response.json()
    console.log('PhonePe response:', responseData)

    if (!response.ok) {
      console.error('PhonePe API error:', responseData)
      throw new Error(`PhonePe API error: ${responseData.message || 'Unknown error'}`)
    }

    return new Response(
      JSON.stringify(responseData),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error processing payment:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        status: 400, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})