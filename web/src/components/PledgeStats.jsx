import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

const PledgeStatsWrapper = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing(2)}px 0;
`;

const PledgeCountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
`;

const EarningsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
`;

const PledgeCount = ({ pledgeCount }) => (
  <PledgeCountWrapper>
    <Typography variant="h5">{pledgeCount}</Typography>
    <Typography variant="subtitle1" color="textSecondary">
      PLEDGES
    </Typography>
  </PledgeCountWrapper>
);

const Earnings = ({ earningsPaise }) => (
  <EarningsWrapper>
    <Typography variant="h5">
      {new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
      }).format(earningsPaise / 100)}
    </Typography>
    <Typography variant="subtitle1" color="textSecondary">
      PER MONTH
    </Typography>
  </EarningsWrapper>
);

const PledgeStats = ({ pledgeCount, earningsPaise }) => {
  if(!pledgeCount && !earningsPaise) return null

  return (
    <PledgeStatsWrapper>
      {pledgeCount && <PledgeCount pledgeCount={pledgeCount} />}
      {earningsPaise && <Earnings earningsPaise={earningsPaise} />}
    </PledgeStatsWrapper>
  );
};

PledgeStats.propTypes = {
  pledgeCount: PropTypes.number,
  earningsPaise: PropTypes.number
};

export default PledgeStats;
