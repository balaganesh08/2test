"use client";

import React from "react";
import { Sidebar } from "../../../components/layout/Sidebar";
import { DealsHeader } from "../../pageComponents/Deals/dealComponents/DealsHeader";
import styles from "./dashboardLayout.module.css";

const DashboardLayout = () => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <DealsHeader />
      <div className={styles.mainContent} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <h1 style={{ fontSize: "2rem", color: "#888" }}>Page Under Construction</h1>
      </div>
    </div>
  </div>
);

export default DashboardLayout;
