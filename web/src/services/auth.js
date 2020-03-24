import firebase from "firebase/app";

import { firebase as firebaseConfig } from "config";
import { setAppStateBulk, getAppState, appStateKeys } from "appState";

export const initFirebase = () => firebase.initializeApp(firebaseConfig);

export const getAuth = () => {
  const firebaseUid = getAppState(appStateKeys.FIREBASE_UID);

  return {
    firebaseUid,
    isAuthenticated: !!firebaseUid
  };
};

export const updateFirebaseAuth = firebaseAuth => {
  const firebaseUid = firebaseAuth?.user?.uid;
  const email = firebaseAuth?.user?.email;
  const displayName = firebaseAuth?.user?.displayName;

  setAppStateBulk({
    [appStateKeys.FIREBASE_AUTH]: firebaseAuth,
    [appStateKeys.FIREBASE_UID]: firebaseUid,
    [appStateKeys.EMAIL]: email,
    [appStateKeys.DISPLAY_NAME]: displayName
  });
};
