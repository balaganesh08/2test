"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/uiElements/dialog";
import { Button } from "@/components/uiElements/button";
import { Upload, PlusCircle, ChevronUp } from 'lucide-react';

interface MeasurementsUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (data: {
    measurements?: File | null;
    notes?: string;
  }) => void;
}

export default function MeasurementsUploadDialog({
  open,
  onOpenChange,
  onComplete
}: MeasurementsUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const fileType = droppedFile.type;
      
      // Check if file is jpg or pdf
      if (fileType === 'image/jpeg' || fileType === 'application/pdf') {
        setFile(droppedFile);
      } else {
        alert('Please upload only JPG or PDF files');
      }
    }
  };

  const handleSubmit = () => {
    onComplete({
      measurements: file,
      notes: notes.trim() ? notes : undefined
    });
    
    // Reset form
    setFile(null);
    setNotes('');
    onOpenChange(false);
  };

  const isSubmitDisabled = !file;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Add measurements to request quotation
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-2">
            Upload the collected measurements of the site
          </p>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Measurements<span className="text-red-500">*</span>
            </label>
            
            <div 
              className={`border-2 border-dashed rounded-md p-8 text-center ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                accept=".jpg,.jpeg,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {!file ? (
                <div className="space-y-3">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div>
                    <label htmlFor="file-upload" className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      Browse
                    </label>
                    <span className="text-gray-600"> or Drag & drop file to upload</span>
                  </div>
                  <p className="text-sm text-gray-500">.jpg or .pdf formats only</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <div className="bg-blue-100 rounded-md px-3 py-2 text-blue-800 flex items-center">
                      <span className="truncate max-w-[300px]">{file.name}</span>
                      <button 
                        onClick={() => setFile(null)} 
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Click to browse another file
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {!showNotes ? (
            <button 
              type="button"
              onClick={() => setShowNotes(true)} 
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <PlusCircle className="w-5 h-5 mr-1" />
              Add Notes
            </button>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="notes" className="block text-sm font-medium">
                  Notes
                </label>
                <button 
                  type="button"
                  onClick={() => setShowNotes(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
              </div>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes here..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              />
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className="bg-teal-600 hover:bg-teal-700"
          >
            Add & Request Quotation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
