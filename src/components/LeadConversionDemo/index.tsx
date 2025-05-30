"use client";

import React, { useState } from 'react';
import ConversionSteps, { ConversionStep } from '../LeadConversionSteps';

// Example conversion steps data based on the provided image
const initialSteps: ConversionStep[] = [
  {
    id: 'follow-up',
    title: 'Follow up with customer to schedule a visit',
    description: 'Connect with customer to confirm visiting',
    completed: false,
    isActive: true
  },
  {
    id: 'measurements',
    title: 'Add Measurements',
    description: 'Collect or update measurements to generate a quotation',
    completed: false,
    isActive: false
  },
  {
    id: 'send-quotation',
    title: 'Send quotation to the customer',
    description: 'Quotation once received, review it and send it to the customer.',
    completed: false,
    isActive: false
  },
  {
    id: 'get-approval',
    title: 'Get approval on quotation from the customer',
    description: 'Mark final quotation and proceed to payment',
    completed: false,
    isActive: false
  },
  {
    id: 'send-payment',
    title: 'Send token payment details',
    description: 'Send payment details to collect the token amount',
    completed: false,
    isActive: false
  },
  {
    id: 'confirm-payment',
    title: 'Confirm token payment',
    description: 'Share the payment details to confirm the payment from accounts team',
    completed: false,
    isActive: false
  }
];

export default function ConversionStepsDemo() {
  const [steps, setSteps] = useState<ConversionStep[]>(initialSteps);
  const [activeStepId, setActiveStepId] = useState('follow-up');
  
  // Handler for marking a step as done
  const handleMarkAsDone = (stepId: string) => {
    // Find the current step index and next step
    const currentIndex = steps.findIndex(s => s.id === stepId);
    const nextIndex = currentIndex + 1;
    const nextStepId = nextIndex < steps.length ? steps[nextIndex].id : null;
    
    // Update steps
    setSteps(prevSteps => 
      prevSteps.map(step => {
        if (step.id === stepId) {
          return { ...step, completed: true, isActive: false };
        }
        if (nextStepId && step.id === nextStepId) {
          return { ...step, isActive: true };
        }
        return step;
      })
    );
    
    // Set the next step as active, if there is one
    if (nextStepId) {
      setActiveStepId(nextStepId);
    }
  };
  
  // Handler for continuing to the next step
  const handleContinue = (stepId: string) => {
    // Find the current step index
    const currentIndex = steps.findIndex(s => s.id === stepId);
    const nextIndex = currentIndex + 1;
    
    // Make sure there is a next step
    if (nextIndex < steps.length) {
      const nextStepId = steps[nextIndex].id;
      
      // Update the steps
      setSteps(prevSteps => 
        prevSteps.map(step => {
          if (step.id === stepId) {
            return { ...step, completed: true, isActive: false };
          }
          if (step.id === nextStepId) {
            return { ...step, isActive: true };
          }
          return step;
        })
      );
      
      // Explicitly set the new active step ID
      setActiveStepId(nextStepId);
    }
  };
  
  // Handler for adding a note (just a placeholder for demo)
  const handleAddNote = (stepId: string) => {
    console.log(`Add note for step ${stepId}`);
    // In a real implementation, this would open a note dialog
  };
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 600 }}>Conversion Steps</h1>
      <ConversionSteps 
        steps={steps}
        activeStep={activeStepId}
        onMarkAsDone={handleMarkAsDone}
        onContinue={handleContinue}
        onAddNote={handleAddNote}
        isOngoing={true}
        title="Conversion"
      />
    </div>
  );
} 