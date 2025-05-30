"use client";

import { Check } from "lucide-react";
import { StepIndicatorProps } from "./types";

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { id: 1, label: "Customer details" },
    { id: 2, label: "Site details" },
    { id: 3, label: "Referral details" },
  ];

  return (
    <div className="w-[372px] bg-neutral-50 p-6 -m-6 rounded-l-lg">
      <h2 className="text-xl font-semibold mb-2">Create a new deal</h2>
      <p className="text-neutral-600 text-sm mb-8">
        Fill out the essential details to create & add a new deal to your pipeline
      </p>
      
      <div className="flex flex-col">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <div className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center font-medium z-10 ${
                  currentStep > step.id
                    ? 'bg-primary-600 text-white' // Completed step
                    : currentStep === step.id
                      ? 'bg-primary-600 text-white border-2 border-primary-600' // Current step
                      : 'bg-white border-2 border-neutral-300 text-neutral-500' // Future step
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step.id
                )}
              </div>
              <span 
                className={`ml-3 ${
                  currentStep === step.id 
                    ? 'font-medium text-neutral-800' 
                    : currentStep > step.id
                      ? 'text-primary-600'
                      : 'text-neutral-500'
                }`}
              >
                {step.label}
              </span>
            </div>
            
            {/* Vertical connector line */}
            {index < steps.length - 1 && (
              <div 
                className={`absolute left-4 top-8 w-[2px] h-12 transform -translate-x-1/2 ${
                  currentStep > step.id + 1 
                    ? 'bg-primary-600' // Completed connector
                    : currentStep > step.id
                      ? 'bg-gradient-to-b from-primary-600 to-neutral-300' // Active connector
                      : 'bg-neutral-300' // Inactive connector
                }`}
              />
            )}
            
            {/* Spacing between steps */}
            {index < steps.length - 1 && <div className="h-12" />}
          </div>
        ))}
      </div>
    </div>
  );
}
