import React from "react";
import styles from "./QuotationsTab.module.css";

interface QuotationDocument {
  fileName: string;
  date: string;
  time: string;
  isFinal?: boolean;
}

interface QuotationsTabProps {
  documents?: QuotationDocument[];
}

export default function QuotationsTab({
  documents = [
    { fileName: "shekhar-quotation.pdf", date: "23 Mar, 2025", time: "12:21" },
    { fileName: "shekhar-quotation.pdf", date: "29 Mar, 2025", time: "12:21" },
    { fileName: "shekhar-quotation-r_ated.pdf", date: "05 May, 2025", time: "12:21", isFinal: true }
  ]
}: QuotationsTabProps) {

  return (
    <div className={styles.container}>
      {/* Quotation documents */}
      <div className={styles.documentsContainer}>
        {/* Pending quotation card */}
        <div className={styles.documentCard}>
          <div className={styles.documentHeader}>
            <div className={styles.pendingLabel}>
              <span className={styles.pendingIcon}>⚠️</span> Quotation Pending
            </div>
            <button className={styles.closeButton}>×</button>
          </div>
          <div className={styles.documentContent}>
            <div className={styles.pendingMessage}>Measurements sent to Quotation team</div>
            <div className={styles.pendingSubMessage}>Quotation will be provided soon. Refresh to check updates</div>
          </div>
        </div>
        
        {/* Document cards */}
        {documents.map((doc, index) => (
          <div key={index} className={`${styles.documentCard} ${doc.isFinal ? styles.finalDocument : ''}`}>
            {doc.isFinal && (
              <div className={styles.finalLabel}>
                <span className={styles.checkIcon}>✓</span> Marked as Final
              </div>
            )}
            <div className={styles.documentInfo}>
              <div className={styles.documentIcon}>📄</div>
              <div className={styles.documentDetails}>
                <div className={styles.documentName}>{doc.fileName}</div>
                <div className={styles.documentDate}>{doc.time} • {doc.date} • v1</div>
              </div>
            </div>
            <div className={styles.documentActions}>
              {!doc.isFinal ? (
                <>
                  <button className={styles.actionButton}>Open</button>
                  <div className={styles.documentMessage}>Review this quotation for sharing and download</div>
                </>
              ) : (
                <>
                  <button className={styles.downloadButton}>↓</button>
                  <button className={styles.shareButton}>→ Share</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 