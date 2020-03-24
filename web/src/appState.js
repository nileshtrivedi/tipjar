const APP_STATE_KEY = "APP_STATE";

const setAppState = (key, value) => {
  const appState = { ...JSON.parse(localStorage.getItem(APP_STATE_KEY)) };
  appState[key] = value;
  localStorage.setItem(APP_STATE_KEY, JSON.stringify(appState));
};

const setAppStateBulk = data => {
  const appState = {
    ...JSON.parse(localStorage.getItem(APP_STATE_KEY)),
    ...data
  };

  localStorage.setItem(APP_STATE_KEY, JSON.stringify(appState));
};

const getAppState = key => {
  const appState = JSON.parse(localStorage.getItem(APP_STATE_KEY));
  const result = appState?.[key];

  return result;
};

const resetAppState = () => {
  localStorage.removeItem(APP_STATE_KEY);
};

const appStateKeys = {
  FIREBASE_AUTH: "FIREBASE_AUTH",
  FIREBASE_UID: "FIREBASE_UID",
  DISPLAY_NAME: "DISPLAY_NAME",
  EMAIL: "EMAIL"
};

export {
  setAppState,
  setAppStateBulk,
  getAppState,
  resetAppState,
  appStateKeys
};
