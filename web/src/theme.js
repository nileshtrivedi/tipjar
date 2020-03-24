import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        fontFamily: "Source Sans Pro"
      }
    }
  },
  typography: {
    fontFamily: "Source Sans Pro"
  },
  props: {
    MuiButton: {
      disableElevation: true
    }
  }
});
