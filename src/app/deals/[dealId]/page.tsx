"use client";

import { useParams } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import Header from "@/components/ApplicationHeader";
import styles from "../../../features/pageComponents/Deals/styles.module.css";
import DealHeader from "@/components/DealHeader";
import DealMilestones from "@/components/DealMilestones";
import DealSidebar from "@/components/DealSidebar";
import { useState } from "react";

export default function DealOverviewPage() {
  const params = useParams();
  const dealId = params?.dealId as string;
  const [currentStage] = useState("Conversion");
  
  // Handlers for conversion step actions
  const handleMarkStepAsDone = (stepId: string) => {
    console.log(`Mark step ${stepId} as done`);
    // In a real implementation, this would update the state and backend
  };
  
  const handleContinueStep = (stepId: string) => {
    console.log(`Continue step ${stepId}`);
    // In a real implementation, this would advance to the next step
  };
  
  const handleAddStepNote = (stepId: string) => {
    console.log(`Add note to step ${stepId}`);
    // In a real implementation, this would open a note dialog
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
              { label: dealId as string }
            ]} 
          />
        </div>
        
        {/* Header - Full width */}
        <div className="w-full border-b border-gray-200 bg-white px-4 py-2">
          <DealHeader />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-2 sm:p-4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
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
          
          {/* Sidebar with reduced height */}
          <div className="w-full md:w-72 lg:w-80 xl:w-80 flex-shrink-0 border-l border-gray-200 bg-white overflow-y-auto" style={{ maxHeight: '70vh' }}>
            <div className="p-2 sm:p-4">
              <DealSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
