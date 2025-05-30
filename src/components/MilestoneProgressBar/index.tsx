import React from "react";
import styles from "./styles.module.css";

interface MilestoneProgressBarProps {
  currentStage?: string;
  progress?: number;
  lost?: boolean;
  onStageClick?: (stage: string) => void;
}

const stages = [
  "New Lead",
  "Conversion",
  "Survey",
  "Production",
  "Delivery & Installation",
  "Closed",
];

function getStageImage(stage: string, idx: number, currentStage: string, progress: number, lost: boolean) {
  const currentIdx = stages.indexOf(currentStage);
  const isLastStage = stage === "Closed";
  
  if (lost && stage === "Lost") {
    return "/milestone-lost.png";
  }
  // If it's the last stage and progress is 100%, show completed
  if (isLastStage && progress === 100) {
    return "/milestone-completed-bg.png";
  }
  // If it's the current stage and not the last stage, show ongoing
  if (idx === currentIdx) {
    return "/milestone-ongoing.png";
  }
  // If it's before the current stage, show completed
  if (idx < currentIdx) {
    // For stages after New Lead (index 0), use a different completed image
    return idx > 0 ? "/Completed.png" : "/milestone-completed-bg.png";
  }
  // Otherwise, show upcoming
  return "/milestone-upcoming.png";
}

function getStageTextClassName(idx: number, currentStage: string, progress: number) {
  const currentIdx = stages.indexOf(currentStage);
  const isLastStage = stages[idx] === 'Closed';
  
  if (isLastStage && progress === 100) return styles.stageTextCompleted;
  if (idx < currentIdx) return styles.stageTextCompleted;
  if (idx === currentIdx) return styles.stageTextCurrent;
  return styles.stageTextUpcoming;
}

const MilestoneProgressBar: React.FC<MilestoneProgressBarProps> = ({
  currentStage = "Conversion",
  progress = 15,
  lost = false,
  onStageClick = () => {},
}) => (
  <div className={styles.container}>
    {stages.map((stage, idx) => (
      <div
        key={stage}
        className={`${styles.stageContainer} ${stage === currentStage ? styles.activeStage : ''}`}
        onClick={() => onStageClick(stage)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onStageClick(stage)}
        aria-label={`Go to ${stage} stage`}
      >
        <img
          src={getStageImage(stage, idx, currentStage, progress, lost)}
          alt={stage}
          className={styles.stageImage}
        />
        <span
          className={`${styles.stageText} ${getStageTextClassName(idx, currentStage, progress)}`}
        >
          {stage}
        </span>
        {idx < stages.length - 1 && <span className={styles.spacer} />}
      </div>
    ))}
  </div>
);

export default MilestoneProgressBar;
