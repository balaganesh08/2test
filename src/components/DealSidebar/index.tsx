import React, { useState } from "react";
import SidebarTabs from "../SidebarTabs";
import DetailsTab from "./tabs/DetailsTab";
import NotesTab from "./tabs/NotesTab";
import QuotationsTab from "./tabs/QuotationsTab";
import styles from "./styles.module.css";

interface DealSidebarProps {
  initialTab?: string;
  width?: number | string;
  height?: string;
}

export default function DealSidebar({
  initialTab = "details",
  width = 320,
  height = "calc(100vh - 57px)"
}: DealSidebarProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const tabs = [
    { id: "details", label: "Details" },
    { id: "quotations", label: "Quotations" },
    { id: "notes", label: "Notes" }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case "details":
        return <DetailsTab />;
      case "quotations":
        return <QuotationsTab 
          documents={[
            { fileName: "shekhar-quotation.pdf", date: "23 Mar, 2025", time: "12:21" },
            { fileName: "shekhar-quotation.pdf", date: "29 Mar, 2025", time: "12:21" },
            { fileName: "shekhar-quotation-r_ated.pdf", date: "05 May, 2025", time: "12:21", isFinal: true }
          ]}
        />;
      case "notes":
        return <NotesTab 
          siteVisit={{
            date: "18 May, 2025",
            time: "11:00 AM",
            notes: "N/A",
            createdAt: "21:02, 23 Mar 2025"
          }}
        />;
      default:
        return <DetailsTab />;
    }
  };

  return (
    <div
      className={styles.container}
      style={
        (width !== 320 || height !== "calc(100vh - 57px)") 
          ? { width, height } 
          : undefined
      }
    >
      <SidebarTabs 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className={styles.content}>
        {renderTabContent()}
      </div>
    </div>
  );
} 