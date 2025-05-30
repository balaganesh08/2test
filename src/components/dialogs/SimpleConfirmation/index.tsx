"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/uiElements/dialog";
import { Button } from "@/components/uiElements/button";

interface SimpleConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
}

export default function SimpleConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  title
}: SimpleConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            {title}
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-2">
            Are you sure you want to mark this step as complete?
          </p>
        </DialogHeader>
        
        <DialogFooter className="mt-6">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            Mark as Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
