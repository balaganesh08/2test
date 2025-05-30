import React from "react";
import styles from "./styles.module.css";

interface TabItem {
  id: string;
  label: string;
}

interface SidebarTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function SidebarTabs({
  tabs,
  activeTab,
  onTabChange
}: SidebarTabsProps) {
  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
} 