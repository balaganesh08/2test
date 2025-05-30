"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/uiElements/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
} from "@/components/uiElements/dialog";

import { FormData } from "./types";
import { StepIndicator } from "./StepIndicator";
import { CustomerForm } from "./CustomerForm";
import { SiteForm } from "./SiteForm";
import { ReferralForm } from "./ReferralForm";
import { submitDeal } from "./api";

interface NewDealDialogProps {
  onDealAdded: (formData: any) => void;
}

export function NewDealDialog({ onDealAdded }: NewDealDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    customer: { name: '', mobile: '', email: '' },
    site: { projectName: '', projectType: '', siteArea: '', address: '' },
    referral: { 
      referenceType: '',
      referenceName: '',
      mobile: '',
      location: '',
      notes: ''
    }
  });

  /**
   * Handle input changes for any form field
   */
  const handleInputChange = (step: keyof FormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value
      }
    }));
  };

  /**
   * Validate the current step before proceeding
   */
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.customer.name && !!formData.customer.mobile;
      case 2:
        return !!formData.site.projectName && !!formData.site.projectType && !!formData.site.address;
      case 3:
        return !!formData.referral.referenceType && !!formData.referral.referenceName;
      default:
        return false;
    }
  };

  /**
   * Move to the next step if validation passes
   */
  const handleNext = () => {
    if (!validateStep(currentStep)) {
      // TODO: Show validation error
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  /**
   * Move to the previous step
   */
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  /**
   * Submit the form data
   */
  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    try {
      await submitDeal(formData);
      onDealAdded(formData);
      handleClose();
    } catch (error) {
      console.error('Failed to submit deal:', error);
      // TODO: Show error message
    }
  };

  /**
   * Close the dialog and reset form state
   */
  const handleClose = () => {
    setCurrentStep(1);
    setOpen(false);
  };

  /**
   * Handle dialog open/close events
   */
  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      handleClose();
    }
    setOpen(isOpen);
  };

  return (
    <DialogContent className="sm:max-w-[800px]">
      <DialogClose className="absolute right-4 top-4" onClick={handleClose}>
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogClose>
        <div className="flex">
          {/* Left side - Steps */}
          <StepIndicator currentStep={currentStep} />

          {/* Right side - Form */}
          <div className="flex-1 pl-8">
            {currentStep === 1 && (
              <CustomerForm 
                formData={formData} 
                onInputChange={handleInputChange} 
                onNext={handleNext} 
                onClose={handleClose}
              />
            )}
            
            {currentStep === 2 && (
              <SiteForm 
                formData={formData} 
                onInputChange={handleInputChange} 
                onNext={handleNext} 
                onBack={handleBack}
                onClose={handleClose}
              />
            )}
            
            {currentStep === 3 && (
              <ReferralForm 
                formData={formData} 
                onInputChange={handleInputChange} 
                onBack={handleBack} 
                onSubmit={handleSubmit}
                onClose={handleClose}
                onNext={handleNext}
              />
            )}
          </div>
        </div>
    </DialogContent>
  );
}
