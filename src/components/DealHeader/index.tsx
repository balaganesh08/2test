import React from "react";
import { 
  PencilIcon, 
  WhatsAppIcon, 
  PlayerTrackNextIcon, 
  MapPinIcon, 
  MailIcon, 
  PhoneIcon
} from "../icons";

// Simple SVG icons for window and door
const WindowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const DoorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14 12v.01" />
    <path d="M6 21h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z" />
  </svg>
);
import styles from "./styles.module.css";

interface DealHeaderProps {
  onEdit?: () => void;
  onChat?: () => void;
  onAdvance?: () => void;
  onMenu?: () => void;
  width?: number | string;
  customer?: {
    name: string;
    company: string;
    address: string;
    email: string;
    phone: string;
    area: string | number;
    bhk: string;
    windows: number;
    doors: number;
  };
}

export default function DealHeader({
  onEdit = () => console.log("Edit customer details"),
  onChat = () => console.log("Chat with customer"),
  onAdvance = () => console.log("Advance deal"),
  onMenu = () => console.log("Open menu"),
  width,
  customer = {
    name: "Shekhar K. Kumar",
    company: "Sumdha Homes",
    address: "1-8-196/23, Road No. 32, Gandhi Nagar, Juparpalli, Hyderabad, 501789",
    email: "shekhark@gmail.com",
    phone: "+91 9948932190",
    area: "1290",
    bhk: "4BHK",
    windows: 8,
    doors: 3
  }
}: DealHeaderProps) {
  // Format the phone number to match the design (removing country code if present)
  const formattedPhone = customer.phone.replace(/^\+91\s*/, '');
  
  return (
    <div className={styles.container} style={width ? { maxWidth: width } : undefined}>
      <div className={styles.headerTop}>
        <div className={styles.customerInfo}>
          <h1 className={styles.customerName}>{customer.name}</h1>
          <div className={styles.companyName}>{customer.company}</div>
        </div>
        
        <div className={styles.actions}>
          <button className={styles.iconButton} onClick={onEdit} aria-label="Edit customer details">
            <PencilIcon className={styles.icon} />
          </button>
          <button className={styles.chatButton} onClick={onChat}>
            <WhatsAppIcon className={styles.icon} />
            Chat with Customer
          </button>
          <button className={styles.advanceButton} onClick={onAdvance}>
            <PlayerTrackNextIcon className={styles.icon} />
            Advance Deal
          </button>
          <button className={styles.iconButton} onClick={onMenu} aria-label="More options">
            ⋮
          </button>
        </div>
      </div>
      
      <div className={styles.contactInfo}>
        <div className={styles.contactItem}>
          <MapPinIcon className={styles.contactIcon} />
          <span>{customer.address}</span>
        </div>
        
        <div className={styles.propertyDetails}>
          <div className={styles.propertyItem}>
            <span className={styles.propertyValue}>{customer.area} sqft</span>
          </div>
          <div className={styles.propertyItem}>
            <span className={styles.propertyValue}>{customer.bhk}</span>
          </div>
          <div className={styles.propertyItem}>
            <WindowIcon className={styles.propertyIcon} />
            <span className={styles.propertyValue}>{customer.windows} units</span>
          </div>
          <div className={styles.propertyItem}>
            <DoorIcon className={styles.propertyIcon} />
            <span className={styles.propertyValue}>{customer.doors} units</span>
          </div>
        </div>
        
        <div className={styles.contactInfoRight}>
          <div className={styles.contactItem}>
            <MailIcon className={styles.contactIcon} />
            <span>{customer.email}</span>
          </div>
          <div className={styles.contactItem}>
            <PhoneIcon className={styles.contactIcon} />
            <span>{formattedPhone}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 