import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FollowUpDialog, SimpleConfirmationDialog, MeasurementsUploadDialog } from '../dialogs';
import styles from './MilestoneStepsList.module.css';

interface Step {
  title: string;
  description: string;
  completed: boolean;
}

interface MilestoneStepsListProps {
  title: string;
  steps: Step[];
  totalSteps: number;
  completedSteps: number;
  isActive?: boolean;
  variant?: 'completed' | 'current' | 'upcoming';
}

export default function MilestoneStepsList({ 
  title, 
  steps, 
  totalSteps,
  completedSteps,
  isActive = false,
  variant = 'upcoming',
  onMarkStepAsDone
}: MilestoneStepsListProps & { onMarkStepAsDone?: (stepId: string) => void }) {
  const [isExpanded, setIsExpanded] = useState(isActive);
  const [markAsDoneDialogOpen, setMarkAsDoneDialogOpen] = useState(false);
  const [simpleDialogOpen, setSimpleDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<{id: string, title: string} | null>(null);

  // Check if all steps are completed
  const allStepsCompleted = steps.every(step => step.completed);
  const effectiveVariant = allStepsCompleted ? 'completed' : variant;

  const getContainerClass = () => {
    return `${styles.container} ${styles[effectiveVariant] || styles.default}`;
  };

  const getTitleClass = () => {
    return `${styles.title} ${styles[effectiveVariant] || styles.default}`;
  };

  // Create step indicator circle
  const createStepCircle = (completed: boolean, isCurrent: boolean) => {
    const size = 24;
    const radius = 8;
    const center = size / 2;
    
    if (completed) {
      // Completed step (green checkmark in circle)
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={center} cy={center} r={radius} fill="#10b981" />
          <path 
            d="M7 12l3 3 7-7" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    } else if (isCurrent) {
      // Current step (blue circle with white dot)
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={center} cy={center} r={radius} fill="#3b82f6" />
          <circle cx={center} cy={center} r="3" fill="white" />
        </svg>
      );
    } else {
      // Upcoming step (gray circle with dash border)
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle 
            cx={center} 
            cy={center} 
            r={radius - 1} 
            fill="white" 
            stroke="#9ca3af" 
            strokeWidth="1.5"
            strokeDasharray="3,3"
          />
        </svg>
      );
    }
  };

  // Handle mark as done completion
  const handleMarkAsDoneComplete = (data: any) => {
    if (currentStep && onMarkStepAsDone) {
      onMarkStepAsDone(currentStep.id);
    }
    setMarkAsDoneDialogOpen(false);
  };

  // Handle simple confirmation
  const handleSimpleConfirmation = () => {
    if (currentStep && onMarkStepAsDone) {
      onMarkStepAsDone(currentStep.id);
    }
  };

  return (
    <>
      <div 
        className={`${getContainerClass()}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={styles.header}>
          <div className={styles.headerContent}>
            {(effectiveVariant === 'completed' || allStepsCompleted) && (
              <div className={styles.checkIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="8" fill="#10b981" />
                  <path 
                    d="M7 12l3 3 7-7" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    fill="none"
                  />
                </svg>
              </div>
            )}
            <div className={styles.content}>
              <div className={styles.titleContainer}>
                <span className={getTitleClass()}>
                  {title}
                </span>
                {effectiveVariant === 'current' && (
                  <span className={styles.statusBadge}>
                    Deal is ongoing
                  </span>
                )}
              </div>
              <div className={styles.progressText}>
                {completedSteps} of {totalSteps} steps completed
              </div>
            </div>
          </div>
          <div className={styles.timestamp}>
            {isExpanded ? (
              <ChevronUp size={16} color="#6b7280" />
            ) : (
              <ChevronDown size={16} color="#6b7280" />
            )}
            <span className={styles.timeAgo}>
              {completedSteps === totalSteps ? 'Completed in 2 days' : 'Started 1 day ago'}
            </span>
          </div>
        </div>

      {isExpanded && (
        <div className={styles.stepsList}>
          {steps.map((step, index) => {
            const isCurrent = variant === 'current' && index === 0;
            const isLast = index === steps.length - 1;
            const stepStatusClass = step.completed ? 'completed' : isCurrent ? 'current' : 'default';
            
            return (
              <div key={index} className={styles.stepItem}>
                {/* Vertical connecting line between steps */}
                {!isLast && (
                  <div 
                    className={`${styles.connectorLine} ${step.completed ? styles.completed : styles.default}`} 
                    style={{
                      height: isLast ? 'calc(100% - 12px)' : '100%'
                    }}
                  />
                )}
                
                <div className={styles.stepContent}>
                  <div className={styles.stepIcon}>
                    {createStepCircle(step.completed, isCurrent)}
                  </div>
                  <div className={`${styles.stepDetails} ${isLast ? styles.lastStep : ''}`}>
                    <div className={styles.stepHeader}>
                      <div className={styles.stepTitleContainer}>
                        <span className={`${styles.stepTitle} ${styles[stepStatusClass]}`}>
                          {step.title}
                        </span>
                        {isCurrent && (
                          <span className={styles.currentBadge}>
                            Current
                          </span>
                        )}
                      </div>
                      {!step.completed && isActive && (
                        <button
                          className={styles.markAsDoneButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            const stepTitle = step.title;
                            console.log('Step title:', stepTitle);
                            setCurrentStep({ id: `${index}`, title: stepTitle });
                            
                            // Use the existing dialog only for the follow-up step
                            if (stepTitle.includes("Follow up with customer")) {
                              console.log('Opening MarkAsDoneDialog');
                              setMarkAsDoneDialogOpen(true);
                            } else {
                              console.log('Opening SimpleConfirmationDialog');
                              setSimpleDialogOpen(true);
                            }
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Mark as done
                        </button>
                      )}
                    </div>
                    <div className={styles.stepDescription}>
                      {step.description}
                    </div>
                    {step.completed && (
                      <div className={styles.completedInfo}>
                        <span>Completed on May 20, 2025</span>
                        <span>•</span>
                        <a href="#" className={styles.viewDetailsLink}>
                          View details
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>

      {/* Detailed dialog for Follow up step */}
      <FollowUpDialog
        open={markAsDoneDialogOpen}
        onOpenChange={setMarkAsDoneDialogOpen}
        onComplete={handleMarkAsDoneComplete}
        stepTitle={currentStep?.title}
      />

      {/* Simple dialog for all other steps */}
      <SimpleConfirmationDialog
        open={simpleDialogOpen}
        onOpenChange={setSimpleDialogOpen}
        onConfirm={handleSimpleConfirmation}
        title={`Mark "${currentStep?.title}" as done?`}
      />
    </>
  );
}
