import React from "react";
import T from "prop-types";
import { StyledComponent } from "fela-components";

export class Content extends React.Component {
  static propTypes = {
    children: T.node.isRequired,
  };

  render() {
    const { children } = this.props;
    return (
      <StyledComponent
        visual={{
          padding: "2.5rem 1.875rem 3.125rem 1.875rem",
          border: "1px solid rgba(134, 147, 154, 0.20)",
        }}>
        {children}
      </StyledComponent>
    );
  }
}
