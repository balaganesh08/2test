import React from "react";
import styles from "./DetailsTab.module.css";

interface ProjectDetail {
  label: string;
  value: string | number;
}

interface DetailsTabProps {
  estimatedOrderValue?: string;
  orderAmountPaid?: string;
  paidPercentage?: number;
  projectDetails?: {
    stage?: string;
    subStage?: string;
    area?: string;
    orderValue?: string;
    projectType?: string;
    windows?: number;
    doors?: number;
  };
}

export default function DetailsTab({
  estimatedOrderValue = "₹ 25,000.00",
  orderAmountPaid = "₹ 0",
  paidPercentage = 0,
  projectDetails = {
    stage: "Lead",
    subStage: "T&C pending",
    area: "1290 sft.",
    orderValue: "₹ 25,000.00",
    projectType: "4BHK",
    windows: 8,
    doors: 3
  }
}: DetailsTabProps) {
  return (
    <>
      {/* Payment Section */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          Payment
        </div>
        <div className={styles.label}>Estimated order value</div>
        <div className={styles.value}>{estimatedOrderValue}</div>
        <div className={styles.label}>Order amount paid till date</div>
        <div className={styles.paymentAmount}>
          <span className={styles.value}>{orderAmountPaid}</span>
          <span className={styles.percentageBadge}>{paidPercentage}%</span>
        </div>
        <button
          className={styles.requestPaymentButton}
          disabled
        >
          ₹ Request Payment
        </button>
      </div>

      {/* Project Section */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          Project
        </div>
        
        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <div className={styles.label}>Stage</div>
            <div className={styles.value}>{projectDetails.stage}</div>
          </div>
          
          <div className={styles.detailItem}>
            <div className={styles.label}>Sub-stage</div>
            <div className={styles.value}>{projectDetails.subStage}</div>
          </div>
          
          <div className={styles.detailItem}>
            <div className={styles.label}>Area</div>
            <div className={styles.value}>{projectDetails.area}</div>
          </div>
          
          <div className={styles.detailItem}>
            <div className={styles.label}>Order value</div>
            <div className={styles.value}>{projectDetails.orderValue}</div>
          </div>
          
          <div className={styles.detailItem}>
            <div className={styles.label}>Project type</div>
            <div className={styles.value}>{projectDetails.projectType}</div>
          </div>
          
          <div className={styles.doubleColumn}>
            <div className={styles.doubleColumnItem}>
              <div className={styles.label}>Windows</div>
              <div className={styles.value}>{projectDetails.windows}</div>
            </div>
            <div className={styles.doubleColumnItem}>
              <div className={styles.label}>Doors</div>
              <div className={styles.value}>{projectDetails.doors}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 