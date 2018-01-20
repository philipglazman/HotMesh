import React from "react";
import T from "prop-types";
import { StyledComponent } from "fela-components";

export class Layout extends React.Component {
  static propTypes = {
    children: T.node.isRequired,
  };

  render() {
    const { children } = this.props;
    return (
      <StyledComponent
        visual={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#FFBD04",
          backgroundImage: "url(/img/background.png)",
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        {children}
      </StyledComponent>
    );
  }
}
