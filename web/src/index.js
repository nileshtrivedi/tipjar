import React from "react";
import ReactDOM from "react-dom";

import Screens from "./screens";
import Providers from "./Providers";
import bootstrap from "./bootstrap";

bootstrap();

const App = () => (
  <Providers>
    <Screens />
  </Providers>
);

ReactDOM.render(<App />, document.getElementById("root"));
