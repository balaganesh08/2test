import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../uiElements/dropdown-menu";
import { 
  ArrowRight,
  Clock,
  File,
  History,
  MoreHorizontal,
  Package,
  PackageCheck,
  Send,
  Trash2,
  MessageSquare
} from "lucide-react";
import { Button } from "../uiElements/button";
import styles from "./styles.module.css";

type StageNames = 
  | "New Lead"
  | "Conversion"
  | "Production"
  | "Delivery & Installation"
  | "Lost"
  | "Referred"
  | "Completed";

interface DealStageMenuProps {
  currentStage: {
    name: StageNames;
    icon: string;
  };
  onActionSelect: (action: string) => void;
}

const stageActions: Record<StageNames, Array<{ id: string; label: string; icon: React.ReactNode }>> = {
  "New Lead": [
    { id: "advance", label: "Advance the deal", icon: <ArrowRight className={styles.icon} /> },
    { id: "mark_future", label: "Mark as in-future", icon: <Clock className={styles.icon} /> },
    { id: "move_foregone", label: "Move to Foregone", icon: <Trash2 className={styles.icon} /> },
  ],
  "Conversion": [
    { id: "advance", label: "Advance the deal", icon: <ArrowRight className={styles.icon} /> },
    { id: "payment_history", label: "Show payment history", icon: <History className={styles.icon} /> },
    { id: "view_quotation", label: "View latest quotation", icon: <File className={styles.icon} /> },
    { id: "mark_future", label: "Mark as in-future", icon: <Clock className={styles.icon} /> },
    { id: "move_foregone", label: "Move to Foregone", icon: <Trash2 className={styles.icon} /> },
  ],
  "Production": [
    { id: "advance", label: "Advance the deal", icon: <ArrowRight className={styles.icon} /> },
    { id: "payment_history", label: "Show payment history", icon: <History className={styles.icon} /> },
    { id: "view_quotation", label: "View latest quotation", icon: <File className={styles.icon} /> },
    { id: "mark_future", label: "Mark as in-future", icon: <Clock className={styles.icon} /> },
    { id: "move_foregone", label: "Move to Foregone", icon: <Trash2 className={styles.icon} /> },
  ],
  "Delivery & Installation": [
    { id: "advance", label: "Advance the deal", icon: <ArrowRight className={styles.icon} /> },
    { id: "payment_history", label: "Show payment history", icon: <History className={styles.icon} /> },
    { id: "view_quotation", label: "View latest quotation", icon: <File className={styles.icon} /> },
    { id: "proof_delivery", label: "Show proof of delivery", icon: <PackageCheck className={styles.icon} /> },
    { id: "delivery_challan", label: "Show delivery challan", icon: <Package className={styles.icon} /> },
    { id: "mark_future", label: "Mark as in-future", icon: <Clock className={styles.icon} /> },
    { id: "move_foregone", label: "Move to Foregone", icon: <Trash2 className={styles.icon} /> },
  ],
  "Lost": [
    { id: "write_customer", label: "Write to customer", icon: <Send className={styles.icon} /> },
    { id: "show_notes", label: "Show Notes", icon: <MessageSquare className={styles.icon} /> },
  ],
  "Referred": [
    { id: "write_customer", label: "Write to customer", icon: <Send className={styles.icon} /> },
    { id: "show_notes", label: "Show Notes", icon: <MessageSquare className={styles.icon} /> },
  ],
  "Completed": [
    { id: "payment_history", label: "Show payment history", icon: <History className={styles.icon} /> },
    { id: "view_quotation", label: "View latest quotation", icon: <File className={styles.icon} /> },
    { id: "proof_delivery", label: "Show proof of delivery", icon: <PackageCheck className={styles.icon} /> },
    { id: "delivery_challan", label: "Show delivery challan", icon: <Package className={styles.icon} /> },
  ],
};

export function DealStageMenu({ currentStage, onActionSelect }: DealStageMenuProps) {
  const actions = stageActions[currentStage.name] || [];
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={styles.triggerButton}>
          <MoreHorizontal className={styles.icon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={styles.menuContent}>
        {actions.map((action, index) => (
          <React.Fragment key={action.id}>
            <DropdownMenuItem 
              onClick={() => onActionSelect(action.id)} 
              className={styles.menuItem}
            >
              {action.icon}
              {action.label}
            </DropdownMenuItem>
            {index < actions.length - 1 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
