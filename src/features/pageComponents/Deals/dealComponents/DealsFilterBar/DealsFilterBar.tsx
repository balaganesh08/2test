import { ChevronDownIcon, FilterIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../../../components/uiElements/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../../../components/uiElements/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "../../../../../components/uiElements/dialog";
import styles from "./styles.module.css";
import { NewDealDialog } from "../../../../../components/NewDealDialog";

interface DealsFilterBarProps {
  onDealAdded: (formData: any) => void;
}

export const DealsFilterBar = ({ onDealAdded }: DealsFilterBarProps): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Data for the deals count
  const dealsData = {
    total: 1290,
    label: "All Deals",
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={styles.dropdownButton}
            >
              Showing: {dealsData.label} ({dealsData.total})
              <ChevronDownIcon className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* Dropdown content would go here */}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          className={styles.filterButton}
        >
          <FilterIcon className={styles.icon} />
          Filter
        </Button>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="px-4 py-2 h-auto bg-primary-700 hover:bg-primary-600 font-small-regular text-white">
            + Create New Deal
          </Button>
        </DialogTrigger>
        <NewDealDialog 
          onDealAdded={(formData) => {
            onDealAdded(formData);
            setIsDialogOpen(false);
          }} 
        />
      </Dialog>
    </div>
  );
};
