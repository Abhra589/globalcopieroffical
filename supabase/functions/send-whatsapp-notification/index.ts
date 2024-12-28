import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const ADMIN_WHATSAPP = "918777060249" // Replace with actual admin number

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { type, orderDetails } = await req.json()
    
    if (type === 'new_order') {
      const message = createOrderMessage(orderDetails)
      await sendWhatsAppMessage(message, ADMIN_WHATSAPP)
    } else if (type === 'payment_received') {
      const message = createPaymentReceivedMessage(orderDetails)
      await sendWhatsAppMessage(message, orderDetails.customerPhone)
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
        status: 400,
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

function createPaymentReceivedMessage(orderDetails: any) {
  return `Payment Received!\n\n` +
    `Thank you for your payment of ₹${orderDetails.total.toFixed(2)}.\n\n` +
    `Order Details:\n` +
    `Pages: ${orderDetails.pageCount}\n` +
    `Copies: ${orderDetails.copies}\n` +
    `Paper: ${orderDetails.selectedGsm}gsm\n` +
    `Type: ${orderDetails.selectedType === 'bw' ? 'Black & White' : 'Color'}\n` +
    `Sides: ${orderDetails.selectedSides === 'single' ? 'Single side' : 'Both sides'}\n` +
    `Delivery: ${orderDetails.deliveryType === 'pickup' ? 'Store Pickup' : 'Home Delivery'}\n\n` +
    `For any questions, please contact us on WhatsApp.`
}

async function sendWhatsAppMessage(message: string, phoneNumber: string) {
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  
  // In a real implementation, you would use the WhatsApp Business API
  // For now, we'll just log the URL
  console.log('WhatsApp URL:', whatsappUrl)
  
  // Return success for now
  return true
}