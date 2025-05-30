import { StageConfig } from "@/typeDefinitions/milestoneTypes";

export const stageConfigs: Record<string, StageConfig> = {
  "New Lead": {
    title: "New Lead (C0)",
    totalSteps: 3,
    steps: [
      {
        title: "Initial Contact",
        description: "First contact with the customer",
        completed: true
      },
      {
        title: "Requirement Gathering",
        description: "Collect basic requirements",
        completed: true
      },
      {
        title: "Basic Information",
        description: "Record customer and site details",
        completed: true
      }
    ]
  },
  "Conversion": {
    title: "Conversion",
    totalSteps: 6,
    steps: [
      {
        title: "Follow up with customer to schedule a visit",
        description: "Connect with customer to confirm visiting",
        completed: false
      },
      {
        title: "Add Measurements",
        description: "Collect or update measurements to generate a quotation",
        completed: false
      },
      {
        title: "Send quotation to the customer",
        description: "Quotation once received, review it and send it to the customer",
        completed: false
      },
      {
        title: "Get approval on quotation from the customer",
        description: "Mark final quotation and proceed to payment",
        completed: false
      },
      {
        title: "Send token payment details",
        description: "Send payment details to collect the token amount",
        completed: false
      },
      {
        title: "Confirm token payment",
        description: "Share the payment details to confirm the payment from accounts team",
        completed: false
      }
    ]
  },
  "Survey": {
    title: "Survey",
    totalSteps: 4,
    steps: [
      {
        title: "Request to schedule a final survey",
        description: "Send a request to survey team for the final measurements",
        completed: false
      },
      {
        title: "Final quotation",
        description: "Get atleast 50% of the payment done to move the order to production",
        completed: false
      },
      {
        title: "Share quotation",
        description: "Quotation once received, review it and send it to the customer.",
        completed: false
      },
      {
        title: "Advance payment (50%)",
        description: "Send payment details to collect the advance amount",
        completed: false
      }
    ]
  },
  "Production": {
    title: "Production",
    totalSteps: 5,
    steps: [
      {
        title: "Start Production",
        description: "Begin manufacturing process based on approved specifications",
        completed: false
      },
      {
        title: "Quality Check",
        description: "Perform quality control checks during production",
        completed: false
      },
      {
        title: "Assembly",
        description: "Assemble components according to specifications",
        completed: false
      },
      {
        title: "Final Inspection",
        description: "Conduct final quality inspection before packaging",
        completed: false
      },
      {
        title: "Packaging",
        description: "Package products securely for transportation",
        completed: false
      }
    ]
  },
  "Delivery & Installation": {
    title: "Delivery & Installation",
    totalSteps: 4,
    steps: [
      {
        title: "Payment before delivery",
        description: "Send payment details to collect the amount",
        completed: false
      },
      {
        title: "Delivery Status",
        description: "Request delivery to send the production to site location",
        completed: false
      },
      {
        title: "Installation Status",
        description: "Details of work order under installation with status",
        completed: false
      },
      {
        title: "Final payment",
        description: "Details of work order that completed the installation process",
        completed: false
      }
    ]
  },
  "Closed": {
    title: "Closed",
    totalSteps: 1,
    steps: [
      {
        title: "Warranty card status",
        description: "All pending dues are cleared to close the deal. Check notes for more details and QC Checklist",
        completed: false
      }
    ]
  }
};
