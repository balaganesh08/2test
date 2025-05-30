import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./uiElements/breadcrumb";
import { ChevronRight } from "lucide-react";
import styles from "./ApplicationHeader.module.css";

type BreadcrumbType = {
  label: string;
  href?: string;
};

interface HeaderProps {
  breadcrumbs: BreadcrumbType[];
}

const Header: React.FC<HeaderProps> = ({ breadcrumbs }) => (
  <header className={styles.header}>
    <Breadcrumb>
      <BreadcrumbList className={styles.breadcrumbList}>
        {breadcrumbs.map((bc, idx) => (
          <React.Fragment key={idx}>
            <BreadcrumbItem className={styles.breadcrumbItem}>
              {bc.href ? (
                <BreadcrumbLink 
                  href={bc.href}
                  className={styles.breadcrumbLink}
                >
                  {bc.label}
                </BreadcrumbLink>
              ) : (
                <span className={styles.breadcrumbPage}>
                  {bc.label}
                </span>
              )}
            </BreadcrumbItem>
            {idx < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator className={styles.separator}>
                <ChevronRight className={styles.separatorIcon} />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  </header>
);

export default Header;
