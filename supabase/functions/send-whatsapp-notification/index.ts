import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const WHATSAPP_TOKEN = Deno.env.get('WHATSAPP_TOKEN')
const WHATSAPP_NUMBER = '120363025211366227'

serve(async (req) => {
  try {
    const { type, orderDetails } = await req.json()

    if (type !== 'new_order') {
      return new Response(
        JSON.stringify({ error: 'Invalid notification type' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const message = `New Order Received!\n\n` +
      `Order ID: ${orderDetails.orderId}\n` +
      `Pages: ${orderDetails.pageCount}\n` +
      `Copies: ${orderDetails.copies}\n` +
      `GSM: ${orderDetails.selectedGsm}\n` +
      `Print Type: ${orderDetails.selectedType}\n` +
      `Print Sides: ${orderDetails.selectedSides}\n` +
      `Delivery: ${orderDetails.deliveryType}\n` +
      `Total Amount: ₹${orderDetails.total}\n\n` +
      `Document URL: ${orderDetails.fileUrl}`

    const response = await fetch('https://graph.facebook.com/v17.0/' + WHATSAPP_NUMBER + '/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: '919884098840',
        type: 'text',
        text: { body: message },
      }),
    })

    const result = await response.json()

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})