/**
 * FormField - A reusable form field component that handles labels, inputs, and error messages
 * Following the Single Responsibility Principle - handles only the form field display and interaction
 */
import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utilities/utils';

// Define variants for different field states using class-variance-authority
const formFieldVariants = cva(
  'w-full rounded-md border bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input',
        error: 'border-red-500 focus-visible:ring-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface FormFieldProps 
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof formFieldVariants> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * FormField component for consistent form field styling and behavior
 * Supports various input types, error states, and helper text
 */
export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, helperText, className, variant, type = 'text', id, ...props }, ref) => {
    // Generate a unique ID for input-label association if not provided
    const inputId = id || `field-${label?.toLowerCase().replace(/\s+/g, '-')}`;
    
    return (
      <div className="space-y-2 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        
        <input
          id={inputId}
          type={type}
          className={cn(
            formFieldVariants({ variant: error ? 'error' : 'default' }),
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          ref={ref}
          {...props}
        />
        
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-500">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
