import React from "react";
import T from "prop-types";
import { StyledComponent } from "fela-components";

class Paragraph extends React.Component {
  static propTypes = {
    children: T.node,
  };

  render() {
    const { children } = this.props;
    return (
      <StyledComponent
        use="p"
        visual={({ theme }) => ({
          color: theme.lightGrey,
          fontFamily: theme.roboto,
          fontWeight: 400,
          textAlign: "center",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          margin: "0 0 0.875rem 0",
        })}>
        {children}
      </StyledComponent>
    );
  }
}

export { Paragraph };
