import React from "react";
import T from "prop-types";
import { StyledComponent } from "fela-components";
import clipboard from "clipboard-js";

import { Button } from "./button";

export class Qr extends React.Component {
  static propTypes = {
    string: T.node.isRequired,
  };

  render() {
    const { string } = this.props;
    const size = 150;
    return (
      <StyledComponent
        visual={{
          width: `${size}px`,
          margin: "2rem auto 0",
        }}>
        <StyledComponent
          visual={{
            width: `${size}px`,
            height: `${size}px`,
            boxSizing: "border-box",
            borderTop: "1px solid rgba(134, 147, 154, 0.20)",
            borderRight: "1px solid rgba(134, 147, 154, 0.20)",
            borderLeft: "1px solid rgba(134, 147, 154, 0.20)",
            backgroundColor: "white",
            backgroundImage: `url(https://chart.googleapis.com/chart?chs=${size}x${size}&cht=qr&chl=${string}&chld=|3)`,
          }}
        />
        <Button onClick={() => clipboard.copy(string)}>Copy address</Button>
      </StyledComponent>
    );
  }
}
