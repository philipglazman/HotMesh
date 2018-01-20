import React from "react";
import T from "prop-types";
import { StyledComponent } from "fela-components";

export class Dialog extends React.Component {
  static propTypes = {
    children: T.node.isRequired,
  };

  render() {
    const { children } = this.props;
    return (
      <StyledComponent
        animations={{
          popIn: {
            from: { transform: "scale(0.9)" },
            to: { transform: "scale(1)" },
          },
        }}
        visual={({ animations }) => ({
          animationName: animations.popIn,
          animationDuration: "0.2s",
          position: "relative",
          width: "24rem",
          margin: "0 auto",
          boxShadow: "0 2px 10px rgba(76, 30, 18, 0.30)",
          backgroundColor: "white",
        })}>
        {children}
      </StyledComponent>
    );
  }
}
