import React from "react";
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useHistory } from "react-router-dom";
import { withTheme } from "styled-components";

import { updateFirebaseAuth } from "services/auth";

const Auth = () => {
  const history = useHistory();
  const goToDashboard = () => {
    history.push("/dashboard");
  };

  const onSigninSuccess = firebaseAuth => {
    updateFirebaseAuth(firebaseAuth);
    goToDashboard();
  };

  const uiConfig = {
    signInFlow: "popup",
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: onSigninSuccess
    }
  };

  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
};

export default withTheme(Auth);
