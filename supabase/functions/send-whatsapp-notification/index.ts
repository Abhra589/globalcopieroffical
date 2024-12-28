import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    const { type, orderDetails } = await req.json()
    console.log('Received request:', { type, orderDetails })

    if (type === 'new_order') {
      const message = createOrderMessage(orderDetails)
      await sendWhatsAppMessage(message, "918777060249") // Admin number
      
      // Also send confirmation to customer if phone is provided
      if (orderDetails.customerPhone) {
        const customerMessage = createCustomerMessage(orderDetails)
        await sendWhatsAppMessage(customerMessage, orderDetails.customerPhone)
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

function createOrderMessage(orderDetails: any) {
  return `New Order Received!\n\n` +
    `Order ID: ${orderDetails.orderId}\n` +
    `Pages: ${orderDetails.pageCount}\n` +
    `Copies: ${orderDetails.copies}\n` +
    `Paper: ${orderDetails.selectedGsm}gsm\n` +
    `Type: ${orderDetails.selectedType === 'bw' ? 'Black & White' : 'Color'}\n` +
    `Sides: ${orderDetails.selectedSides === 'single' ? 'Single side' : 'Both sides'}\n` +
    `Delivery: ${orderDetails.deliveryType === 'pickup' ? 'Store Pickup' : 'Home Delivery'}\n` +
    `Total Amount: ₹${orderDetails.total.toFixed(2)}\n\n` +
    `File URL: ${orderDetails.fileUrl}`
}

function createCustomerMessage(orderDetails: any) {
  return `Thank you for your order!\n\n` +
    `Order Details:\n` +
    `Pages: ${orderDetails.pageCount}\n` +
    `Copies: ${orderDetails.copies}\n` +
    `Paper: ${orderDetails.selectedGsm}gsm\n` +
    `Type: ${orderDetails.selectedType === 'bw' ? 'Black & White' : 'Color'}\n` +
    `Sides: ${orderDetails.selectedSides === 'single' ? 'Single side' : 'Both sides'}\n` +
    `Delivery: ${orderDetails.deliveryType === 'pickup' ? 'Store Pickup' : 'Home Delivery'}\n` +
    `Total Amount: ₹${orderDetails.total.toFixed(2)}\n\n` +
    `We'll process your order soon!`
}

async function sendWhatsAppMessage(message: string, phoneNumber: string) {
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  
  console.log('WhatsApp URL generated:', whatsappUrl)
  
  // In a production environment, you would use the WhatsApp Business API
  // For now, we'll return the URL that can be used to send the message
  return whatsappUrl
}