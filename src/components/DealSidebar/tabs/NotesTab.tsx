import React from "react";
import styles from "./NotesTab.module.css";

interface SiteVisit {
  date: string;
  time: string;
  notes: string;
  createdAt: string;
}

interface NotesTabProps {
  siteVisit?: SiteVisit;
}

export default function NotesTab({
  siteVisit = {
    date: "18 May, 2025",
    time: "11:00 AM",
    notes: "N/A",
    createdAt: "21:02, 23 Mar 2025"
  }
}: NotesTabProps) {

  return (
    <div className={styles.container}>
      <div className={styles.tabContent}>
        <div className={styles.siteVisitContainer}>
          <div className={styles.siteVisitHeader}>
            <div className={styles.siteVisitDot}></div>
            <div className={styles.siteVisitTitle}>Site visit scheduled</div>
          </div>
          
          <div className={styles.siteVisitDetails}>
            <div className={styles.siteVisitRow}>
              <div className={styles.siteVisitLabel}>
                <span className={styles.calendarIcon}>📅</span> Date:
              </div>
              <div className={styles.siteVisitValue}>{siteVisit.date}</div>
            </div>
            
            <div className={styles.siteVisitRow}>
              <div className={styles.siteVisitLabel}>
                <span className={styles.clockIcon}>🕒</span> Time:
              </div>
              <div className={styles.siteVisitValue}>{siteVisit.time}</div>
            </div>
            
            <div className={styles.siteVisitRow}>
              <div className={styles.siteVisitLabel}>
                <span className={styles.notesIcon}>📝</span> Notes:
              </div>
              <div className={styles.siteVisitValue}>{siteVisit.notes}</div>
            </div>
          </div>
          
          <button className={styles.addMeasurementsButton}>Add Measurements</button>
          
          <div className={styles.siteVisitTimestamp}>{siteVisit.createdAt}</div>
        </div>
      </div>
      
      <div className={styles.noteInputContainer}>
        <div className={styles.notesToolbar}>
          <button className={styles.toolbarButton}>
            <span className={styles.attachmentIcon}>📎</span>
          </button>
          <button className={styles.toolbarButton}>
            <span className={styles.boldIcon}>B</span>
          </button>
          <button className={styles.toolbarButton}>
            <span className={styles.italicIcon}>I</span>
          </button>
        </div>
        
        <textarea 
          placeholder="Write your notes..." 
          className={styles.notesTextarea}
        />
        
        <div className={styles.notesActions}>
          <button className={styles.cancelButton}>Cancel</button>
          <button className={styles.saveButton}>Save</button>
        </div>
      </div>
    </div>
  );
} 