import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../../components/uiElements/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/uiElements/select";
import styles from "./styles.module.css";

export const DealsPagination = (): JSX.Element => {
  // Data for the items per page options
  const perPageOptions = [10, 25, 50, 100];

  return (
    <div className={styles.container}>
      <div className={styles.paginationLeft}>
        <span className={styles.paginationText}>
          Show
        </span>

        <Select defaultValue="50">
          <SelectTrigger className={styles.selectTrigger}>
            <SelectValue placeholder="50" />
          </SelectTrigger>
          <SelectContent>
            {perPageOptions.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className={styles.paginationText}>
          per page
        </span>
      </div>

      <div className={styles.paginationRight}>
        <Button
          variant="outline"
          size="sm"
          className={`${styles.paginationButton} ${styles.disabledButton}`}
          disabled
        >
          <ChevronLeftIcon className={styles.icon} />
          Previous
        </Button>

        <Button variant="outline" size="sm" className={styles.paginationButton}>
          Next
          <ChevronRightIcon className={styles.iconRight} />
        </Button>
      </div>
    </div>
  );
};
