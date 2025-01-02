import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createHash } from "https://deno.land/std@0.168.0/hash/mod.ts"

const MERCHANT_ID = Deno.env.get('PHONEPE_MERCHANT_ID')
const SALT_KEY = Deno.env.get('PHONEPE_KEY')
const SALT_INDEX = Deno.env.get('PHONEPE_KEY_INDEX')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { orderId, amount } = await req.json()

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
    const string = base64Payload + "/pg/v1/pay" + SALT_KEY
    const sha256 = createHash("sha256").update(string).toString()
    const xVerify = sha256 + "###" + SALT_INDEX

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

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})