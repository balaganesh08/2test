import React from "react";
import { PencilIcon, WhatsAppIcon, PlayerTrackNextIcon, MapPinIcon, MailIcon, PhoneIcon } from "../icons";
import styles from "./styles.module.css";

const DealCustomerHeader = ({
  customer = {
    name: "Shekhar K. Kumar",
    company: "Sumdha Homes",
    address: "1-8-196/23, road no. 32, gandhi nagar, juparpalli, hyderabad, 501789",
    email: "shekhark@gmail.com",
    phone: "9948932190",
  },
  onChat,
  onAdvance,
  onMenu,
  onEdit,
}: {
  customer?: {
    name: string;
    company: string;
    address: string;
    email: string;
    phone: string;
  };
  onChat?: () => void;
  onAdvance?: () => void;
  onMenu?: () => void;
  onEdit?: () => void;
}) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <div>
        <div className={styles.customerName}>{customer.name}</div>
      </div>
      <div className={styles.actions}>
        <button className={styles.iconButton} onClick={onEdit}>
          <PencilIcon />
        </button>
        <button className={styles.chatButton} onClick={onChat}>
          <WhatsAppIcon />
          Chat with Customer
        </button>
        <button className={styles.advanceButton} onClick={onAdvance}>
          <PlayerTrackNextIcon />
          Advance Deal
        </button>
        <button className={styles.menuButton} onClick={onMenu}>
          ⋮
        </button>
      </div>
    </div>
    <div className={styles.companyName}>{customer.company}</div>
    <div className={styles.contactInfo}>
      <span className={styles.contactItem}>
        <span>{customer.address}</span>
        <a href="#" className={styles.link}>
          <MapPinIcon />
          Get directions
        </a>
      </span>
      <a href={`mailto:${customer.email}`} className={styles.link}>
        <MailIcon />
        {customer.email}
      </a>
      <a href={`tel:${customer.phone}`} className={styles.link}>
        <PhoneIcon />
        {customer.phone.replace(/(\d{5})(\d{5})/, "$1 $2")}
      </a>
    </div>
  </div>
);

export default DealCustomerHeader;
