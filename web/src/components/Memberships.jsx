import React, { useState } from "react";
import { arrayOf, shape } from "prop-types";
import { useHistory } from "react-router-dom";
import { sortBy } from "lodash-es";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from '@material-ui/core/Snackbar';

import { membershipType } from "types";
import { checkout } from "services/razorpay";

const MainContainer = styled(Container)`
  margin: ${({ theme }) => theme.spacing(4)}px auto;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${({ theme }) => theme.spacing(2)}px;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Membership = ({
  amountPaise,
  paymentCycle,
  description,
  onJoinClick
}) => {
  const paymentCycleString = {
    MONTHLY: "per month",
    YEARLY: "per year",
    ONETIME: "one time"
  };

  const rupees = paise => paise / 100;

  const useStyles = makeStyles(theme => ({
    amount: {
      textAlign: "center",
      fontWeight: "600",
      marginTop: theme.spacing(2) + "px"
    },
    paymentCycle: {
      textAlign: "center",
      fontWeight: "500"
    },
    joinButton: {
      display: "block",
      margin: theme.spacing(2) + "px auto"
    }
  }));

  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" className={classes.amount}>
          &#8377;{rupees(amountPaise)}
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          className={classes.paymentCycle}
        >
          {paymentCycleString[paymentCycle]}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.joinButton}
          onClick={onJoinClick}
        >
          Join
        </Button>
        <Typography variant="body1">{description}</Typography>
      </CardContent>
    </Card>
  );
};

Membership.propTypes = membershipType;

const Memberships = ({ memberships }) => {
  const history = useHistory();
  const useStyles = makeStyles(theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff"
    }
  }));

  const classes = useStyles();

  const [overlayOpen, setOverlayOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  const onCheckoutSuccess = ({ pledgeId }) => {
    setOverlayOpen(false);
    history.push({
      pathname: '/thank_you',
      state: { pledge: pledgeId }
    })
  };

  const onCheckoutDismiss = () => {
    setOverlayOpen(false);
  };

  const onJoinClick = async (membership) => {
    setOverlayOpen(true);

    try {
      await checkout({
        membership,
        onSuccess: onCheckoutSuccess,
        onDismiss: onCheckoutDismiss
      });
    } catch (error) {
      console.error(error);
      setOverlayOpen(false);
      setShowError(true);
    }
  };
  return (
    <MainContainer>
      <CardGrid>
        {sortBy(memberships, ["amountPaise"]).map((membership, index) => (
          <Membership
            key={index}
            onJoinClick={() => onJoinClick(membership)}
            {...membership}
          />
        ))}
      </CardGrid>
      <Backdrop className={classes.backdrop} open={overlayOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showError}
        onClose={() => setShowError(false)}
        autoHideDuration={6000}
        message="Something went wrong. Please try again later."
      />
    </MainContainer>
  );
};

Memberships.propTypes = {
  memberships: arrayOf(shape(membershipType))
};

export default Memberships;
