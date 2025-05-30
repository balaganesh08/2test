export interface FormData {
  customer: {
    name: string;
    mobile: string;
    email?: string;
  };
  site: {
    projectName: string;
    projectType: string;
    siteArea?: string;
    address: string;
  };
  referral: {
    referenceType: string;
    referenceName: string;
    mobile?: string;
    location?: string;
    notes?: string;
  };
}

export interface FormStepProps {
  formData: FormData;
  onInputChange: (step: keyof FormData, field: string, value: string) => void;
  onNext: () => void;
  onBack?: () => void;
  onClose: () => void;
}

export interface StepIndicatorProps {
  currentStep: number;
}
