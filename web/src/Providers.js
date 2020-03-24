import React from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import { ThemeProvider as MUIThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "./theme";

const CssBasslineProvider = ({ children }) => (
  <>
    <CssBaseline />
    {children}
  </>
);

export default ({ children }) => {
  return (
    <CssBasslineProvider>
      <MUIThemeProvider theme={theme}>
        <SCThemeProvider theme={theme}>{children}</SCThemeProvider>
      </MUIThemeProvider>
    </CssBasslineProvider>
  );
};
