import React from "react";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { getPledge } from "services/pledge";

const ThankYou = () => {
  const { state } = useLocation();
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);

  const pledge = state?.pledge;

  React.useEffect(() => {
    setLoading(true);

    const checkPledgeValidity = async () => {
      const pledgeData = await getPledge({ pledge });

      if (!pledgeData) {
        history.push("/404");
      }

      setLoading(false);
    };

    checkPledgeValidity();
  }, [history, pledge]);

  const useStyles = makeStyles(theme => ({
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: `${theme.spacing(5)}px`,
      height: "100vh"
    },
    heading: {
      margin: `${theme.spacing(8)}px 0 ${theme.spacing(5)}px`,
      textAlign: "center"
    },
    checkCircleIcon: {
      color: theme.palette.success.main,
      fontSize: 300
    },
    backdrop: {
      color: theme.palette.common.white
    }
  }));

  const classes = useStyles();

  return (
    <Container>
      {!loading ? (
        <CardContent className={classes.content}>
          <CheckCircleIcon className={classes.checkCircleIcon} />
          <Typography variant="h3" className={classes.heading}>
            Awesome! You're now a member.
          </Typography>
          <Link to="/">
            <Button color="primary" size="large" variant="contained">
              Browse other creators
            </Button>
          </Link>
        </CardContent>
      ) : null}
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default ThankYou;
