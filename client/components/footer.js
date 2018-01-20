import React from "react";
import T from "prop-types";
import { StyledComponent } from "fela-components";

export class Footer extends React.Component {
  static propTypes = {
    children: T.node.isRequired,
  };

  render() {
    const { children } = this.props;
    return (
      <StyledComponent
        visual={{
          height: "5rem",
          overflow: "hidden",
          backgroundColor: "#CD4F2D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "1px solid #923922",
          color: "white",
          fontWeight: 500,
          fontSize: "1.125rem",
          lineHeight: "1.625rem",
        }}>
        {children}
      </StyledComponent>
    );
  }
}
