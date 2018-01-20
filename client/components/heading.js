import React from "react";
import T from "prop-types";
import { StyledComponent } from "fela-components";

export class Heading extends React.Component {
  static propTypes = {
    children: T.node.isRequired,
  };

  render() {
    const { children } = this.props;
    return (
      <StyledComponent
        use="h2"
        visual={({ theme }) => ({
          fontSize: "1.5rem",
          lineHeight: "1.875rem",
          margin: "0 0 0.5rem",
          fontFamily: theme.roboto,
          color: theme.darkGrey,
          fontWeight: 500,
          textAlign: "center",
        })}>
        {children}
      </StyledComponent>
    );
  }
}
