/**
 * Form utility functions following the Single Responsibility Principle
 * Centralizes form-related utilities to avoid code duplication
 */

import { validateField } from './validation';

// Updated ValidationRule interface to support formValues parameter
export interface ValidationRule {
  validate: (value: any, formValues?: Record<string, any>) => boolean;
  message: string;
}

/**
 * Common validation rules that can be reused across forms
 */
export const commonValidationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    validate: (value) => value !== undefined && value !== null && value !== '',
    message,
  }),
  
  email: (message = 'Please enter a valid email address'): ValidationRule => ({
    validate: (value) => {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return emailRegex.test(value);
    },
    message,
  }),
  
  minLength: (length: number, message = `Must be at least ${length} characters`): ValidationRule => ({
    validate: (value) => value.length >= length,
    message,
  }),
  
  maxLength: (length: number, message = `Must be at most ${length} characters`): ValidationRule => ({
    validate: (value) => value.length <= length,
    message,
  }),
  
  pattern: (regex: RegExp, message = 'Invalid format'): ValidationRule => ({
    validate: (value) => regex.test(value),
    message,
  }),
  
  match: (matchField: string, message = 'Fields do not match'): ValidationRule => ({
    validate: (value, formValues) => formValues ? value === formValues[matchField] : false,
    message,
  }),
  
  number: (message = 'Must be a number'): ValidationRule => ({
    validate: (value) => !isNaN(Number(value)),
    message,
  }),
  
  min: (min: number, message = `Must be at least ${min}`): ValidationRule => ({
    validate: (value) => Number(value) >= min,
    message,
  }),
  
  max: (max: number, message = `Must be at most ${max}`): ValidationRule => ({
    validate: (value) => Number(value) <= max,
    message,
  }),
};

/**
 * Validate a form field with multiple rules
 */
export const validateFormField = (value: any, rules: ValidationRule[], formValues?: any): string | null => {
  for (const rule of rules) {
    if (!rule.validate(value, formValues)) {
      return rule.message;
    }
  }
  return null;
};

/**
 * Validate an entire form
 */
export const validateForm = (
  values: Record<string, any>,
  validationSchema: Record<string, ValidationRule[]>
): Record<string, string | null> => {
  const errors: Record<string, string | null> = {};
  
  Object.entries(validationSchema).forEach(([field, rules]) => {
    const error = validateFormField(values[field], rules, values);
    if (error) {
      errors[field] = error;
    }
  });
  
  return errors;
};

/**
 * Check if a form has any validation errors
 */
export const hasFormErrors = (errors: Record<string, string | null>): boolean => {
  return Object.values(errors).some(error => error !== null);
};

/**
 * Format form values before submission (e.g., trim strings, convert numbers)
 */
export const formatFormValues = <T extends Record<string, any>>(
  values: T,
  formatters: Partial<Record<keyof T, (value: any) => any>>
): T => {
  const formattedValues = { ...values } as T;
  
  (Object.entries(formatters) as [keyof T, (value: any) => any][]).forEach(([field, formatter]) => {
    if (values[field] !== undefined && formatter) {
      formattedValues[field as keyof T] = formatter(values[field]);
    }
  });
  
  return formattedValues;
};
