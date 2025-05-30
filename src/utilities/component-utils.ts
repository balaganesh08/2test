/**
 * Component utility functions following the Single Responsibility Principle
 * Centralizes component-related utilities to avoid code duplication
 */

import React from 'react';
import { cn } from './utils';

/**
 * Type for component variants
 */
export type ComponentVariant = 'default' | 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';

/**
 * Type for component sizes
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Get variant-based class names
 */
export const getVariantClasses = (
  variant: ComponentVariant = 'default',
  baseClasses: Record<ComponentVariant, string>
): string => {
  return baseClasses[variant] || baseClasses.default;
};

/**
 * Get size-based class names
 */
export const getSizeClasses = (
  size: ComponentSize = 'md',
  sizeClasses: Record<ComponentSize, string>
): string => {
  return sizeClasses[size] || sizeClasses.md;
};

/**
 * Combine component classes with variant and size
 */
export const getComponentClasses = (
  className: string | undefined,
  variant: ComponentVariant | undefined,
  size: ComponentSize | undefined,
  baseClasses: Record<ComponentVariant, string>,
  sizeClasses: Record<ComponentSize, string>
): string => {
  return cn(
    getVariantClasses(variant || 'default', baseClasses),
    getSizeClasses(size || 'md', sizeClasses),
    className
  );
};

/**
 * Create a polymorphic component (component that can render as different HTML elements)
 */
export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentProps<C extends React.ElementType, Props = {}> = {
  as?: C;
} & React.ComponentPropsWithoutRef<C> & Props;

export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> };

/**
 * Helper to create component with consistent props interface
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Helper to create component with consistent variant and size props
 */
export interface VariantComponentProps extends BaseComponentProps {
  variant?: ComponentVariant;
  size?: ComponentSize;
}

/**
 * Helper to create component with consistent disabled and loading props
 */
export interface InteractiveComponentProps extends VariantComponentProps {
  disabled?: boolean;
  loading?: boolean;
}

// Removed ConditionalRender component due to TypeScript compatibility issues
// Conditional rendering can be done directly in components with the ternary operator
