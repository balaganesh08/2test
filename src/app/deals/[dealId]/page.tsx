"use client";

import { useParams } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import Header from "@/components/ApplicationHeader";
import DealHeader from "@/components/DealHeader";
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
              { label: dealId }
            ]} 
          />
        </div>
        
        {/* Customer Header */}
        <div className="w-full border-b border-gray-200 bg-white px-8 py-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{mockCustomer.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{mockCustomer.company}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                <img src="/whatsapp.png" alt="WhatsApp" className="w-4 h-4 mr-2" />
                Chat with Customer
              </button>
              <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700">
                <img src="/vector-2.svg" alt="Advance" className="w-4 h-4 mr-2" />
                Advance Deal
              </button>
              <button className="px-2 py-2 text-gray-500 hover:text-gray-700">⋮</button>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-gray-400 mr-2" />
              <span>{mockCustomer.address}</span>
              <a href="#" className="text-cyan-600 hover:underline ml-2">Get directions</a>
            </div>
          </div>
          
          <div className="flex items-center mt-4 gap-6">
            <div className="flex items-center gap-6 text-sm">
              <span>{mockCustomer.area} Sq. ft.</span>
              <span>{mockCustomer.bhk}</span>
              <div className="flex items-center">
                <img src="/window-icon.svg" alt="Windows" className="w-4 h-4 mr-1" />
                <span>{mockCustomer.windows} units</span>
              </div>
              <div className="flex items-center">
                <img src="/door-icon.svg" alt="Doors" className="w-4 h-4 mr-1" />
                <span>{mockCustomer.doors} units</span>
              </div>
            </div>
            <div className="flex items-center gap-6 ml-auto">
              <a href={`mailto:${mockCustomer.email}`} className="flex items-center text-gray-600 hover:text-gray-800">
                <Mail className="w-4 h-4 mr-2" />
                {mockCustomer.email}
              </a>
              <a href={`tel:${mockCustomer.phone}`} className="flex items-center text-gray-600 hover:text-gray-800">
                <Phone className="w-4 h-4 mr-2" />
                {mockCustomer.phone}
              </a>
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