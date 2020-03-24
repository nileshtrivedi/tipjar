import React from "react";
import Memberships from "./Memberships";

export default {
  title: "Memberships",
  component: Memberships
}

export const ExhibitA = () => (
  <div style={{ backgroundColor: "white" }}>
    <Memberships
      memberships={[{
        amountPaise: 5000,
        paymentCycle: "MONTHLY",
        description: "Access to private WhatsApp group"
      },{
        amountPaise: 10000,
        paymentCycle: "MONTHLY",
        description: "Exclusive podcasts and video footage with usage rights"
      },{
        amountPaise: 50000,
        paymentCycle: "MONTHLY",
        description: "Personal online conversations, video chats and in-person meets"
      },{
        amountPaise: 100000,
        paymentCycle: "MONTHLY",
        description: "Personal online conversations, video chats and in-person meets"
      }]}
    />
  </div>
)
