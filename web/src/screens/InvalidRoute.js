import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import invalidRouteImage from "assets/404.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const InvalidRouteImage = styled.div`
  background-image: url(${invalidRouteImage});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 25%;
`;

const Heading = styled.h1`
  margin: ${({ theme }) => theme.spacing(8)}px 0;
  text-align: center;
`;

export default () => {
  return (
    <Container>
      <InvalidRouteImage />
      <Heading>We couldn't find what you were looking for...</Heading>
      <Link to="/">
        <Button color="primary" size="large" variant="contained">
          Browse creators
        </Button>
      </Link>
    </Container>
  );
};
