"use client";

import React, { useState } from "react";
import { Sidebar } from "../../../components/layout/Sidebar";
import { DealsHeader } from "./dealComponents/DealsHeader";
import { DealsFilterBar } from "./dealComponents/DealsFilterBar";
import { DealsTable } from "./dealComponents/DealsTable";
import { DealsPagination } from "./dealComponents/DealsPagination";
import { NewDealDialog } from "@/components/NewDealDialog";
import styles from "./styles.module.css";

type StageNames = 
  | 'New Lead' 
  | 'Conversion' 
  | 'Production' 
  | 'Delivery & Installation' 
  | 'Lost' 
  | 'Referred' 
  | 'Completed' 
  | 'Quotation (C2)';

interface Deal {
  id: number;
  dealId: string;
  projectName: string;
  stage: {
    name: StageNames;
    icon: string;
  };
  area: string;
  dealValue: string;
  contact: string;
  created: string;
  nextSteps: string;
  dueDate: string;
  hasTimer?: boolean;
}

export const DealsPage = (): JSX.Element => {
  const [deals, setDeals] = useState<Deal[]>(() => {
    // Initial data - you might want to fetch this from an API in a real app
    return Array(16).fill(null).map((_, index) => {
      const stage = getStageData(index);
      return {
        id: index,
        dealId: `2025019${String(284 + index).padStart(3, '0')}`,
        projectName: `Sumdha Homes${index === 1 ? ' & Apartments' : ''}`,
        hasTimer: [1, 4, 7].includes(index),
        stage: {
          name: stage.name as StageNames,
          icon: stage.icon
        },
        area: index === 0 || index === 10 || index === 14 ? "-" : "1250 sft",
        dealValue: index === 0 || index === 10 || index === 14 ? "-" : "₹ 25,000",
        contact: "99489 32190",
        created: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' }),
        nextSteps: index === 8
          ? "Sign off pending from Accounts team"
          : index === 0 || index === 2 || index === 6
            ? "Follow up"
            : "Visit Site for initial measurements",
        dueDate: index === 2 || index === 4 || index === 10 || index === 14
          ? "-"
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })
      };
    });
  });

  const handleAddDeal = (formData: any) => {
    const newDeal: Deal = {
      id: deals.length > 0 ? Math.max(...deals.map(d => d.id)) + 1 : 1,
      dealId: String(2025019000 + Math.floor(Math.random() * 1000)),
      projectName: formData.site.projectName || 'New Project',
      stage: { 
        name: 'New Lead' as StageNames, 
        icon: '/ellipse-8.svg' 
      },
      area: formData.site.siteArea ? `${formData.site.siteArea} sft` : '0 sft',
      dealValue: '₹ 0',
      contact: formData.customer.mobile || '',
      created: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' }),
      nextSteps: 'Initial follow up',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' }),
      hasTimer: false
    };
    setDeals(prevDeals => [newDeal, ...prevDeals]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Sidebar />
        <DealsHeader />
        <div className={styles.mainContent}>
          <DealsFilterBar onDealAdded={handleAddDeal} />
          <DealsTable deals={deals} />
          <DealsPagination />
        </div>
      </div>
    </div>
  );
};

// Helper function to get stage data
function getStageData(index: number) {
  const stages = [
    { name: "New Lead" as StageNames, icon: "/ellipse-8.svg" },
    { name: "Conversion" as StageNames, icon: "/ellipse-7.svg" },
    { name: "Conversion" as StageNames, icon: "/ellipse-7.svg" },
    { name: "Conversion" as StageNames, icon: "/ellipse-7.svg" },
    { name: "Production" as StageNames, icon: "/ellipse-7-4.svg" },
    { name: "Delivery & Installation" as StageNames, icon: "/ellipse-7-1.svg" },
    { name: "Lost" as StageNames, icon: "" },
    { name: "Referred" as StageNames, icon: "" },
    { name: "Completed" as StageNames, icon: "completed" },
    { name: "Delivery & Installation" as StageNames, icon: "/ellipse-7-1.svg" },
    { name: "New Lead" as StageNames, icon: "/ellipse-8.svg" },
    { name: "Delivery & Installation" as StageNames, icon: "/ellipse-7-1.svg" },
    { name: "Production" as StageNames, icon: "/ellipse-7-4.svg" },
    { name: "Production" as StageNames, icon: "/ellipse-7-4.svg" },
    { name: "New Lead" as StageNames, icon: "/ellipse-8.svg" },
    { name: "Quotation (C2)" as StageNames, icon: "" }
  ];
  return stages[index % stages.length];
}
