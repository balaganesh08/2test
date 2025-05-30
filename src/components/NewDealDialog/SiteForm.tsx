"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/uiElements/button";
import { Input } from "@/components/uiElements/input";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/uiElements/dialog";
import { FormStepProps } from "./types";

export function SiteForm({ formData, onInputChange, onNext, onBack }: FormStepProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">
          Step 2 of 3
        </DialogTitle>
        <DialogDescription className="text-xl font-semibold pt-4">
          Site details:
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-1 py-2">
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Project Name<span className="text-red-500">*</span>
          </label>
          <Input 
            type="text" 
            value={formData.site.projectName}
            onChange={(e) => onInputChange('site', 'projectName', e.target.value)}
            placeholder="Project Name" 
            className="w-[590px] h-[32px] rounded border border-neutral-300 px-2 py-1.5"
          />
        </div>

        <div className="grid grid-cols-2 gap-1 items-center">
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Project type<span className="text-red-500">*</span>
            </label>
            <Input 
              type="text" 
              value={formData.site.projectType}
              onChange={(e) => onInputChange('site', 'projectType', e.target.value)}
              placeholder="Ex.: 2BHK, G+3" 
              className="w-[285px] h-[34px] rounded border border-neutral-300 px-2 py-1.5"
            />
          </div>

          <div className="space-y-1 ml-[-8px]">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Site Area</label>
              <span className="text-sm text-neutral-400 ml-2">optional</span>
            </div>
            <Input 
              type="text" 
              value={formData.site.siteArea}
              onChange={(e) => onInputChange('site', 'siteArea', e.target.value)}
              placeholder="Site area" 
              className="w-[285px] h-[32px] rounded border border-neutral-300 px-2 py-1.5"
              style={{ marginLeft: '8px' }}
            />
          </div>
        </div>

        <div className="space-y-1 py-2">
          <label className="text-sm font-medium">
            Site Address<span className="text-red-500">*</span>
          </label>
          <Input 
            type="text"
            value={formData.site.address}
            onChange={(e) => onInputChange('site', 'address', e.target.value)}
            placeholder="Enter full address including zip code" 
            className="w-[590px] h-[96px] rounded border border-neutral-300 px-1 py-16"
            style={{ textAlign: 'start', paddingTop: '0px', lineHeight: 'normal' }}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Geo Location</label>
          <div className="w-[590px] h-[96px] bg-neutral-100 rounded-[6px] border border-neutral-300 overflow-hidden">
            {/* Map component would go here */}
          </div>
        </div>
      </div>

      <DialogFooter className="flex justify-end mt-32">
        <Button variant="outline" className="mr-2" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button variant="default" className="bg-primary-700" onClick={onNext}>
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogFooter>
    </>
  );
}
