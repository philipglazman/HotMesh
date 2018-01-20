import React from "react";
import T from "prop-types";
import { StyledComponent } from "fela-components";


export class Button extends React.Component {
  static propTypes = {
    children: T.node.isRequired,
  };

  render() {
    const { children, ...otherProps } = this.props;

    return (
      <StyledComponent
        {...otherProps}
        use="button"
        visual={({ theme }) => ({
          width: "100%",
          height: "2.5rem",
          border: "1px solid rgba(76, 30, 18, 0.3)",
          fontWeight: 500,
          fontFamily: theme.roboto,
          fontSize: "0.875rem",
          lineHeight: "0.875rem",
          whiteSpace: "nowrap",
          cursor: "pointer",
          color: "white",
          backgroundColor: "#CD4F2D",
          ":hover": {
            backgroundColor: "#BD4728",
          },
          ":focus": {
            backgroundColor: "#BD4728",
          },
          ":active": {
            backgroundColor: "#B74526",
          },
        })}>
        <StyledComponent
          visual={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {children}
        </StyledComponent>
      </StyledComponent>
    );
  }
}
