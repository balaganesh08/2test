"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "../../../../../components/uiElements/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/uiElements/table";
import styles from "./styles.module.css";
import { DealStageMenu as OriginalDealStageMenu } from "@/components/DealStageMenu";

// Define our own StageNames type to match the one in DealStageMenu but with our additional stage
type StageNames =
  | "New Lead"
  | "Conversion"
  | "Production"
  | "Delivery & Installation"
  | "Lost"
  | "Referred"
  | "Completed"
  | "Quotation (C2)";

// Define a type for the stage object
type StageObject = {
  name: StageNames;
  icon: string;
};

// Create a wrapper component for DealStageMenu to handle type compatibility
interface DealStageMenuWrapperProps {
  currentStage: StageObject;
  onStageChange: (newStage: StageNames) => void;
}

const DealStageMenu: React.FC<DealStageMenuWrapperProps> = ({ currentStage, onStageChange }) => {
  // Map our actions to the original component's expected format
  const handleActionSelect = (action: string) => {
    if (action === "advance") {
      // Get the next stage based on the current stage
      const nextStage = getNextStage(currentStage.name);
      onStageChange(nextStage);
    } else {
      // Handle other actions as needed
      console.log(`Action ${action} selected`);
    }
  };

  // Create a compatible stage object for the original component
  const compatibleStage = {
    name: currentStage.name as any, // Use type assertion to bypass type checking
    icon: currentStage.icon
  };

  return (
    <OriginalDealStageMenu
      currentStage={compatibleStage}
      onActionSelect={handleActionSelect}
    />
  );
};

// Helper function to determine the next stage in the flow
const getNextStage = (currentStage: StageNames): StageNames => {
  const stageFlow: Record<StageNames, StageNames> = {
    "New Lead": "Conversion",
    "Conversion": "Production",
    "Production": "Delivery & Installation",
    "Delivery & Installation": "Completed",
    "Lost": "New Lead", // Default fallback
    "Referred": "New Lead", // Default fallback
    "Completed": "New Lead", // Default fallback
    "Quotation (C2)": "Conversion"
  };
  
  return stageFlow[currentStage];
};

interface DealsTableProps {
  deals: {
    id: number;
    dealId: string;
    projectName: string;
    stage: StageObject;
    area: string;
    dealValue: string;
    contact: string;
    created: string;
    nextSteps: string;
    dueDate: string;
    hasTimer?: boolean;
  }[];
}

export const DealsTable = ({ deals }: DealsTableProps): JSX.Element => {
  const router = useRouter();

  // Define table data for reusability
  const tableHeaders = [
    { id: "checkbox", label: "", width: "auto" },
    { id: "dealId", label: "Deal ID", width: "120px", sortable: false },
    { id: "projectName", label: "Project Name", width: "auto", sortable: true },
    { id: "stage", label: "Stage", width: "184px", sortable: false },
    { id: "area", label: "Area (in Sft)", width: "104px", sortable: true },
    { id: "dealValue", label: "Deal Value", width: "112px", sortable: true },
    { id: "contact", label: "Contact", width: "136px", sortable: false },
    { id: "created", label: "Created", width: "104px", sortable: true },
    { id: "nextSteps", label: "Next steps", width: "236px", sortable: false },
    { id: "dueDate", label: "Due Date", width: "104px", sortable: true },
    { id: "actions", label: "", width: "56px", sortable: false },
  ];

  const tableData = deals;

  function getStageData(index: number): StageObject {
    const stages: StageObject[] = [
      { name: "New Lead", icon: "/ellipse-8.svg" },
      { name: "Conversion", icon: "/ellipse-7.svg" },
      { name: "Conversion", icon: "/ellipse-7.svg" },
      { name: "Conversion", icon: "/ellipse-7.svg" },
      { name: "Production", icon: "/ellipse-7-4.svg" },
      { name: "Delivery & Installation", icon: "/ellipse-7-1.svg" },
      { name: "Lost", icon: "" },
      { name: "Referred", icon: "" },
      { name: "Completed", icon: "completed" },
      { name: "Delivery & Installation", icon: "/ellipse-7-1.svg" },
      { name: "New Lead", icon: "/ellipse-8.svg" },
      { name: "Delivery & Installation", icon: "/ellipse-7-1.svg" },
      { name: "Production", icon: "/ellipse-7-4.svg" },
      { name: "Production", icon: "/ellipse-7-4.svg" },
      { name: "New Lead", icon: "/ellipse-8.svg" },
      { name: "Quotation (C2)" as StageNames, icon: "" },
    ];

    return stages[index % stages.length];
  }

  const handleStageChange = (dealId: string, newStageName: StageNames) => {
    console.log(`Changing deal ${dealId} to stage: ${newStageName}`);

    // Implement your stage change logic here
    // Create a proper stage object with the new stage name
    const newStage: StageObject = {
      name: newStageName,
      icon: getIconForStage(newStageName)
    };
    // Your implementation to update the deal's stage
  };
  


  // Helper function to get the appropriate icon for a stage
  const getIconForStage = (stageName: StageNames): string => {
    const stageIcons: Record<StageNames, string> = {
      "New Lead": "/ellipse-8.svg",
      "Conversion": "/ellipse-7.svg",
      "Production": "/ellipse-7-4.svg",
      "Delivery & Installation": "/ellipse-7-1.svg",
      "Lost": "",
      "Referred": "",
      "Completed": "completed",
      "Quotation (C2)": ""
    };
    return stageIcons[stageName];
  };

  const handleActionSelect = (dealId: string, action: string) => {
    console.log(`Action ${action} selected for deal ${dealId}`);
    switch (action) {
      case 'advance':
        // Handle advance deal
        break;
      case 'mark_future':
        // Handle mark as future
        break;
      case 'move_foregone':
        // Handle move to foregone
        break;
      // Add other cases
    }
  };

  return (
    <div className={styles.container}>
      <Table>
        <TableHeader className={styles.tableHeader}>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableHead
                key={header.id}
                className={styles.headerCell}
                style={{width: header.width !== "auto" ? header.width : "auto"}}
              >
                {header.id === "checkbox" ? (
                  <Checkbox className={styles.checkbox} />
                ) : (
                  <div className={styles.headerContent}>
                    <div className={styles.headerText}>
                      {header.label}
                    </div>
                    {header.sortable && (
                      <img
                        className={styles.sortIcon}
                        alt="Sort descending"
                        src="/sort-descending.svg"
                      />
                    )}
                  </div>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row) => (
            <TableRow 
              key={row.id} 
              className={styles.tableRow}
              style={{ cursor: "pointer" }}
              onClick={() => router.push(`/deals/${row.id}`)}
            >
              <TableCell className={styles.checkboxCell}>
                <Checkbox className={styles.checkbox} />
              </TableCell>
              <TableCell className={styles.tableCellContent}>
                <div className={styles.cellText}>
                  {row.dealId}
                </div>
              </TableCell>
              <TableCell className={styles.tableCellContent}>
                <div className={styles.headerContent}>
                  <div className={styles.cellText}>
                    {row.projectName}
                  </div>
                  {row.hasTimer && (
                    <img
                      className={styles.timerIcon}
                      alt="Clock hour"
                      src="/clock-hour-4.svg"
                    />
                  )}
                </div>
              </TableCell>
              <TableCell className={styles.tableCell}>
               <div className={styles.cellText} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {row.stage.icon && row.stage.name !== "New Lead" && row.stage.name !== "Conversion" && row.stage.name !== "Production" && row.stage.name !== "Delivery & Installation" && (
                    <img
                      className={styles.stageIndicatorInner}
                      alt="Stage indicator"
                      src={row.stage.icon}
                      width="16"
                      height="16"
                    />
                  )}
                  {row.stage.name === "New Lead" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.newLeadIcon}
                    >
                      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="white" />
                      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#0891B2" />
                      <path
                        d="M8 3C9.0559 3 10.0847 3.33427 10.9389 3.95492C11.7932 4.57556 12.429 5.4507 12.7553 6.45492L8 8V3Z"
                        fill="#0891B2"
                      />
                    </svg>
                  )}
                  {row.stage.name === "Conversion" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.conversionIcon}
                    >
                      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="white" />
                      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#0891B2" />
                      <path
                        d="M8 3C9.19052 3 10.342 3.42479 11.2472 4.19797C12.1525 4.97115 12.7522 6.04197 12.9384 7.21783C13.1247 8.39369 12.8852 9.59741 12.2632 10.6125C11.6412 11.6276 10.6773 12.3874 9.54508 12.7553L8 8V3Z"
                        fill="#0891B2"
                      />
                    </svg>
                  )}
                  {row.stage.name === "Production" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.productionIcon}
                    >
                      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="white" />
                      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#0891B2" />
                      <path
                        d="M8 3C8.78905 3 9.5669 3.18675 10.27 3.54497C10.973 3.90319 11.5813 4.42272 12.0451 5.06107C12.5089 5.69943 12.815 6.43849 12.9384 7.21783C13.0619 7.99716 12.9991 8.79465 12.7553 9.54508C12.5115 10.2955 12.0935 10.9776 11.5355 11.5355C10.9776 12.0935 10.2955 12.5115 9.54509 12.7553C8.79465 12.9991 7.99717 13.0619 7.21783 12.9384C6.43849 12.815 5.69943 12.5089 5.06108 12.0451L8 8V3Z"
                        fill="#0891B2"
                      />
                    </svg>
                  )}
                  {row.stage.name === "Delivery & Installation" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.deliveryIcon}
                    >
                      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="white" />
                      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#0891B2" />
                      <path
                        d="M8 3C9.0559 3 10.0847 3.33427 10.9389 3.95492C11.7932 4.57556 12.429 5.4507 12.7553 6.45492C13.0816 7.45913 13.0816 8.54087 12.7553 9.54509C12.429 10.5493 11.7932 11.4244 10.9389 12.0451C10.0847 12.6657 9.0559 13 8 13C6.9441 13 5.91531 12.6657 5.06107 12.0451C4.20684 11.4244 3.57101 10.5493 3.24472 9.54508C2.91843 8.54087 2.91843 7.45913 3.24472 6.45491L8 8V3Z"
                        fill="#0891B2"
                      />
                    </svg>
                  )}
                  {row.stage.name === "Completed" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.completedIcon}
                    >
                      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="white" />
                      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#0891B2" />
                    </svg>
                  )}
                  {row.stage.name === "Referred" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.referredIcon}
                    >
                      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="white" />
                      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#0891B2" />
                    </svg>
                  )}
                  {row.stage.name === "Lost" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.lostIcon}
                    >
                      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="white" />
                      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#0891B2" />
                    </svg>
                  )}
                  {row.stage.name === "Quotation (C2)" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.quotationIcon}
                    >
                      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="white" />
                      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#0891B2" />
                      <path d="M8 3C8.8422 3 9.67075 3.21274 10.4088 3.61847C11.1468 4.0242 11.7704 4.60978 12.2216 5.32087C12.6729 6.03196 12.9373 6.84551 12.9901 7.68605C13.043 8.52658 12.8827 9.36685 12.5241 10.1289L8 8V3Z" fill="#0891B2" />
                    </svg>
                  )}
                  {row.stage.name}
                </div> 
              </TableCell>
              <TableCell className={styles.tableCellContent}>
                <div className={styles.cellText}>
                  {row.area}
                </div>
              </TableCell>
              <TableCell className={styles.tableCellContent}>
                <div className={styles.cellText}>
                  {row.dealValue}
                </div>
              </TableCell>
              <TableCell className={styles.tableCellContent}>
                <div className={styles.cellText}>
                  {row.contact}
                </div>
              </TableCell>
              <TableCell className={styles.tableCellContent}>
                <div className={styles.cellText}>
                  {row.created}
                </div>
              </TableCell>
              <TableCell className={styles.tableCellContent}>
                <div className={styles.cellText}>
                  {row.nextSteps}
                </div>
              </TableCell>
              <TableCell className={styles.tableCellContent}>
                <div className={styles.cellText}>
                  {row.dueDate}
                </div>
              </TableCell>
              <TableCell className={styles.tableCellContent}>
                <div className={styles.actionsMenu}>
                <DealStageMenu 
                  currentStage={row.stage} 
                  onStageChange={(newStage) => handleStageChange(row.dealId, newStage)}
                />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
