"use client";

import React, { useState } from 'react';
import { PlusCircle, ChevronUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/uiElements/dialog";

interface FollowUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (data: {
    visitType: string;
    date?: string;
    time?: string;
    messageCopy?: string;
    notes?: string;
  }) => void;
  stepTitle?: string;
}

export default function FollowUpDialog({
  open,
  onOpenChange,
  onComplete,
  stepTitle
}: FollowUpDialogProps) {
  const [visitType, setVisitType] = useState("Site visit");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [messageCopy, setMessageCopy] = useState("Hey {customer_name}\n\nThank you for visiting us.\n\nThank you\nTeam Greenfortune");
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  
  const handleSubmit = () => {
    const data: any = { visitType };
    
    // Include fields based on visit type
    if (visitType === "Site visit" || visitType === "Customer visit to showroom") {
      data.date = date;
      data.time = time;
    }
    
    if (visitType === "Customer visit to showroom") {
      data.messageCopy = messageCopy;
    }
    
    if (notes.trim()) {
      data.notes = notes;
    }
    
    onComplete(data);
    onOpenChange(false);
  };
  
  const isFormValid = () => {
    if (visitType === "No visit, measurements collected") {
      return true;
    }
    
    if (visitType === "Site visit" || visitType === "Customer visit to showroom") {
      return date.trim() !== "" && time.trim() !== "";
    }
    
    return false;
  };
  
  const renderVisitTypeFields = () => {
    if (visitType === "No visit, measurements collected") {
      return null;
    }
    
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium">
            Select Date<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="date"
              type="text"
              placeholder="Ex.: 25 Mar, 2025"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="time" className="block text-sm font-medium">
            Select Time<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="time"
              type="text"
              placeholder="Ex.: 9:00"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderMessageCopyField = () => {
    if (visitType !== "Customer visit to showroom") {
      return null;
    }
    
    return (
      <div className="space-y-2">
        <label htmlFor="message-copy" className="block text-sm font-medium">
          Message Copy
        </label>
        <textarea
          id="message-copy"
          value={messageCopy}
          onChange={(e) => setMessageCopy(e.target.value)}
          placeholder="Enter message to be sent to the customer"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-48 resize-none"
        />
      </div>
    );
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-6 h-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mb-4">Schedule Follow-up Visit</DialogTitle>
          <p className="text-gray-600 text-base">
            Enter the aligned date and time for the customer follow-up
          </p>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label htmlFor="visit-type" className="block text-sm font-medium">
              Visit type<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="visit-type"
                value={visitType}
                onChange={(e) => setVisitType(e.target.value)}
                className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="Site visit">Site visit</option>
                <option value="Customer visit to showroom">Customer visit to showroom</option>
                <option value="No visit, measurements collected">No visit, measurements collected</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {renderVisitTypeFields()}
          {renderMessageCopyField()}
          
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
        
        <DialogFooter className="flex justify-end space-x-2">
          <DialogClose asChild>
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
          </DialogClose>
          
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            disabled={!isFormValid()}
          >
            Schedule
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
