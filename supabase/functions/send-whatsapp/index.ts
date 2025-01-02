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
    const { message } = await req.json()
    
    // Validate input
    if (!message) {
      throw new Error('Missing required parameter: message')
    }

    // Create WhatsApp URL with fixed admin number
    const whatsappUrl = `https://wa.me/918777060249?text=${encodeURIComponent(message)}`
    
    console.log('Generated WhatsApp URL:', whatsappUrl)

    return new Response(
      JSON.stringify({ 
        url: whatsappUrl,
        success: true 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error generating WhatsApp URL:', error)
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