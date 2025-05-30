"use client";

import React from "react";
import { HomeIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "../../components/uiElements/button";
import { Separator } from "../../components/uiElements/separator";
import { Avatar, AvatarFallback } from "../../components/uiElements/avatar";
import styles from "./styles.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarButtonProps {
  icon: React.ReactNode;
  variant?: "ghost" | "secondary";
  selected?: boolean;
  to: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, variant = "ghost", selected = false, to }) => (
  <Link href={to}>
    <Button
      variant={variant}
      size="icon"
      className={`${styles.sidebarButton} ${variant === "ghost" ? styles.sidebarButtonGhost : styles.sidebarButtonSecondary} ${selected ? styles.selected : ""}`}
    >
      {icon}
    </Button>
  </Link>
);

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <img
          className={styles.logoImage}
          alt="Logo icon"
          src="/logo-icon.svg"
        />
      </div>
      <Separator className="w-full" />
      {/* Navigation Icons */}
      <div className={styles.navContainer}>
        <SidebarButton
          icon={<HomeIcon className="w-5 h-5" />}
          variant="ghost"
          selected={pathname === "/"}
          to="/"
        />
        <SidebarButton
          icon={<ShoppingCartIcon className="w-5 h-5" />}
          variant="secondary"
          selected={pathname === "/deals"}
          to="/deals"
        />
      </div>
      {/* User Avatar */}
      <div className={styles.userContainer}>
        <Avatar className={styles.avatar}>
          <AvatarFallback className={styles.avatarFallback}>HT</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
