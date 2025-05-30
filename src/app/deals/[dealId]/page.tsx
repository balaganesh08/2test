"use client";

import { useParams } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import Header from "@/components/ApplicationHeader";
import DealHeader from "@/components/DealHeader";
import DealMilestones from "@/components/DealMilestones";
import DealSidebar from "@/components/DealSidebar";
import { useState } from "react";

const mockCustomer = {
  name: "Shekhar K. Kumar",
  company: "Sumdha Homes",
  address: "1-8-196/23, road no. 32, gandhi nagar, juparpalli, hyderabad, 501789",
  email: "shekhark@gmail.com",
  phone: "99489 32190",
  area: "1290 sft.",
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
        <div className="w-full border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{mockCustomer.name}</h1>
              <p className="text-sm text-gray-500">{mockCustomer.company}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Chat with Customer
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Advance Deal
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>{mockCustomer.area}</span>
              <span>•</span>
              <span>{mockCustomer.bhk}</span>
              <span>•</span>
              <span>{mockCustomer.windows} windows</span>
              <span>•</span>
              <span>{mockCustomer.doors} doors</span>
            </div>
            <div className="flex items-center gap-4">
              <a href={`mailto:${mockCustomer.email}`} className="text-blue-600 hover:underline">{mockCustomer.email}</a>
              <a href={`tel:${mockCustomer.phone}`} className="text-blue-600 hover:underline">{mockCustomer.phone}</a>
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