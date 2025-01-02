import * as React from "react"
 
interface StepsProps {
  children: React.ReactNode
}
 
export function Steps({ children }: StepsProps) {
  return (
    <div className="space-y-4">
      {children}
    </div>
  )
}

interface StepProps {
  title: string
  description?: string
}

export function Step({ title, description }: StepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
        1
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
    </div>
  )
}