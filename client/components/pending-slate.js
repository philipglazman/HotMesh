import React from "react";
import { StyledComponent } from "fela-components";

import { PendingIndicator } from "./pending-indicator";

export const PendingSlate = () => (
  <StyledComponent
    visual={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
    <PendingIndicator />
  </StyledComponent>
);
