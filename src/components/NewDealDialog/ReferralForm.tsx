"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/uiElements/button";
import { Input } from "@/components/uiElements/input";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/uiElements/dialog";
import { FormStepProps } from "./types";

export function ReferralForm({ formData, onInputChange, onBack, onSubmit }: FormStepProps & { onSubmit: () => void }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold text-neutral-600">
          Step 3 of 3
        </DialogTitle>
        <DialogDescription className="text-xl font-semibold pt-4">
          Referral details:
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Reference*
          </label>
          <Input
            type="text"
            value={formData.referral.referenceType}
            onChange={(e) => onInputChange('referral', 'referenceType', e.target.value)}
            placeholder="Select"
            className="w-full"
          />
        </div>

        {formData.referral.referenceType && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Reference Name*
              </label>
              <Input
                type="text" 
                value={formData.referral.referenceName}
                onChange={(e) => onInputChange('referral', 'referenceName', e.target.value)}
                placeholder="Search..."
                className="w-full"
              />
            </div>

            <div className="mt-6">
              <h3 className="text-sm text-neutral-600 mb-4">New Reference details:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mobile*</label>
                  <Input
                    type="tel"
                    value={formData.referral.mobile}
                    onChange={(e) => onInputChange('referral', 'mobile', e.target.value)}
                    placeholder="+91 91234 13242"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location*</label>
                  <Input
                    type="text"
                    value={formData.referral.location}
                    onChange={(e) => onInputChange('referral', 'location', e.target.value)}
                    placeholder="Madhapur, Hyderabad"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Notes</label>
                  <span className="text-sm text-neutral-400">optional</span>
                </div>
                <textarea
                  value={formData.referral.notes}
                  onChange={(e) => onInputChange('referral', 'notes', e.target.value)}
                  placeholder="Add additional notes..."
                  className="w-full min-h-[100px] rounded-md border border-input px-3 py-2"
                />
              </div>
            </div>
          </>
        )}
      </div>

      <DialogFooter className="flex justify-end absolute bottom-[-1] right-4">
        <Button variant="outline" className="mr-2" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button variant="default" className="bg-primary-700" onClick={onSubmit}>
          Create
        </Button>
      </DialogFooter>
    </>
  );
}
