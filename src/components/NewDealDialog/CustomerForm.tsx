"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/uiElements/button";
import { Input } from "@/components/uiElements/input";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/uiElements/dialog";
import { FormStepProps } from "./types";

export function CustomerForm({ formData, onInputChange, onNext, onClose }: FormStepProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold text-neutral-600">
          Step 1 of 3
        </DialogTitle>
        <DialogDescription className="text-xl font-semibold pt-4">
          Customer contact details:
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Customer Name<span className="text-red-500">*</span>
          </label>
          <Input 
            type="text" 
            value={formData.customer.name}
            onChange={(e) => onInputChange('customer', 'name', e.target.value)}
            placeholder="Enter full name" 
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Mobile<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600">
                +91
              </span>
              <Input 
                type="tel" 
                value={formData.customer.mobile}
                onChange={(e) => onInputChange('customer', 'mobile', e.target.value)}
                placeholder="10 digit mobile number" 
                className="w-full pl-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Email</label>
              <span className="text-sm text-neutral-400">optional</span>
            </div>
            <Input 
              type="email" 
              value={formData.customer.email}
              onChange={(e) => onInputChange('customer', 'email', e.target.value)}
              placeholder="Enter a valid email ID" 
              className="w-full" 
            />
          </div>
        </div>
      </div>

      <DialogFooter className="flex justify-end absolute bottom-4 right-4">
        <Button variant="outline" className="mr-2" onClick={onClose}>
          Cancel
        </Button>
        <Button className="bg-primary-700" onClick={onNext}>
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogFooter>
    </>
  );
}
