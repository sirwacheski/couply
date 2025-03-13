import React from "react";

import Routes from "./routes/main.routes";
import ApplicationProvider from "./providers/ApplicationProvider";

function Application() {
  return (
    <ApplicationProvider>
      <Routes />
    </ApplicationProvider>
  );
}

export default Application;