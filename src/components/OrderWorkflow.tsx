import { Steps } from "@/components/ui/steps"

export const OrderWorkflow = () => {
  const steps = [
    {
      title: "Order Form Submission",
      description: "Fill out the printing details form with your document and requirements."
    },
    {
      title: "Payment Initiation",
      description: "Review your order summary and proceed to the payment page."
    },
    {
      title: "Admin Notification",
      description: "Our admin team receives your order details via WhatsApp for immediate processing."
    },
    {
      title: "Payment Processing",
      description: "Complete your payment securely through PhonePe payment gateway."
    },
    {
      title: "Payment Confirmation",
      description: "Admin receives payment confirmation and reviews your order."
    },
    {
      title: "Order Processing",
      description: "Admin schedules delivery and marks the order as received."
    },
    {
      title: "Customer Confirmation",
      description: "You receive a WhatsApp confirmation with order and delivery details."
    },
    {
      title: "Order Complete",
      description: "Thank you for connecting with GlobalCopier!"
    }
  ]

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary mb-6">How It Works</h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              {index + 1}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}