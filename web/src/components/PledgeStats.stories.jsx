import React from "react";
import PledgeStats from "./PledgeStats";

export default {
  title: "PledgeStats",
  component: PledgeStats
}

export const ExhibitA = () => (
    <PledgeStats
      pledgeCount={203}
      earningsPaise={1234500}
    />
)
