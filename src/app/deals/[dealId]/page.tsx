"use client";

import { useParams } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import Header from "@/components/ApplicationHeader";
import DealMilestones from "@/components/DealMilestones";
import DealSidebar from "@/components/DealSidebar";
import { useState } from "react";
import { MapPin, Mail, Phone } from 'lucide-react';

const mockCustomer = {
  name: "Shekhar K. Kumar",
  company: "Sumdha Homes",
  address: "1-8-196/23, road no. 32, gandhi nagar, juparpalli, hyderabad, 501789",
  email: "shekhark@gmail.com",
  phone: "99489 32190",
  area: "1290",
  bhk: "4BHK",
  windows: 8,
  doors: 3
};

export default function DealOverviewPage() {
  const params = useParams();
  const dealId = params?.dealId as string;
  const [currentStage] = useState("Conversion");
  
  const handleMarkStepAsDone = (stepId: string) => {
    console.log(`Mark step ${stepId} as done`);
  };
  
  const handleContinueStep = (stepId: string) => {
    console.log(`Continue step ${stepId}`);
  };
  
  const handleAddStepNote = (stepId: string) => {
    console.log(`Add note to step ${stepId}`);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-14 md:ml-16 transition-all duration-200 bg-gray-50">
        <div className="border-b border-gray-200">
          <Header 
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Deals", href: "/deals" },
              { label: "2025019284" }
            ]} 
          />
        </div>
        
        {/* Customer Header */}
        <div className="w-full border-b border-gray-200 bg-white px-8 py-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{mockCustomer.name}</h1>
              <p className="text-sm text-gray-500">{mockCustomer.company}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
                <img src="/whatsapp.png" alt="WhatsApp" className="w-4 h-4 mr-2" />
                Chat with Customer
              </button>
              <button className="flex items-center px-3 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M2 3.33334V12.6667L7.33333 8.00001L2 3.33334Z" fill="white"/>
                  <path d="M8.66667 3.33334V12.6667L14 8.00001L8.66667 3.33334Z" fill="white"/>
                </svg>
                Advance Deal
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="8" cy="3" r="1.5"/>
                  <circle cx="8" cy="8" r="1.5"/>
                  <circle cx="8" cy="13" r="1.5"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span>{mockCustomer.address}</span>
              <a href="#" className="text-cyan-600 hover:underline ml-1">Get directions</a>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                <span className="text-gray-900">{mockCustomer.area} Sq. ft.</span>
                <span className="text-gray-900">{mockCustomer.bhk}</span>
                <div className="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" className="text-gray-500">
                    <rect x="2" y="2" width="12" height="12" rx="1"/>
                    <line x1="2" y1="6" x2="14" y2="6"/>
                    <line x1="6" y1="14" x2="6" y2="6"/>
                  </svg>
                  <span className="text-gray-900">{mockCustomer.windows} units</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" className="text-gray-500">
                    <path d="M4 14h8a1 1 0 001-1V3a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1z"/>
                    <circle cx="9.5" cy="8" r=".5" fill="currentColor"/>
                  </svg>
                  <span className="text-gray-900">{mockCustomer.doors} units</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <a href={`mailto:${mockCustomer.email}`} className="flex items-center text-gray-600 hover:text-gray-800">
                  <Mail className="w-4 h-4 mr-1 text-gray-400" />
                  {mockCustomer.email}
                </a>
                <a href={`tel:${mockCustomer.phone}`} className="flex items-center text-gray-600 hover:text-gray-800">
                  <Phone className="w-4 h-4 mr-1 text-gray-400" />
                  {mockCustomer.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <DealMilestones 
                currentStage={currentStage}
                progress={15}
                useDetailedConversionSteps={true}
                onMarkStepAsDone={handleMarkStepAsDone}
                onContinueStep={handleContinueStep}
                onAddStepNote={handleAddStepNote}
              />
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="w-full md:w-80 border-l border-gray-200 bg-white">
            <DealSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}