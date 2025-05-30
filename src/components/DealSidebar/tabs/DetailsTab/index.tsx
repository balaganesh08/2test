import React from "react";
import styles from "./styles.module.css";

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
        <div className={styles.fieldLabel}>Estimated order value</div>
        <div className={styles.fieldValue}>{estimatedOrderValue}</div>
        <div className={styles.fieldLabel}>Order amount paid till date</div>
        <div className={styles.amountWrapper}>
          <span className={styles.amountValue}>{orderAmountPaid}</span>
          <span className={styles.percentageBadge}>{paidPercentage}%</span>
        </div>
        <button
          className={styles.paymentButton}
          disabled
        >
          ₹ Request Payment
        </button>
      </div>

      {/* Project Section */}
      <div>
        <div className={styles.sectionTitle}>
          Project
        </div>
        
        {/* Project details with exact styling */}
        <div className={styles.projectDetails}>
          <div>
            <div className={styles.fieldLabel}>Stage</div>
            <div className={styles.projectDetail}>{projectDetails.stage}</div>
          </div>
          
          <div>
            <div className={styles.fieldLabel}>Sub-stage</div>
            <div className={styles.projectDetail}>{projectDetails.subStage}</div>
          </div>
          
          <div>
            <div className={styles.fieldLabel}>Area</div>
            <div className={styles.projectDetail}>{projectDetails.area}</div>
          </div>
          
          <div>
            <div className={styles.fieldLabel}>Order value</div>
            <div className={styles.projectDetail}>{projectDetails.orderValue}</div>
          </div>
          
          <div>
            <div className={styles.fieldLabel}>Project type</div>
            <div className={styles.projectDetail}>{projectDetails.projectType}</div>
          </div>
          
          <div className={styles.projectDetailRow}>
            <div>
              <div className={styles.fieldLabel}>Windows</div>
              <div className={styles.projectDetail}>{projectDetails.windows}</div>
            </div>
            <div>
              <div className={styles.fieldLabel}>Doors</div>
              <div className={styles.projectDetail}>{projectDetails.doors}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 