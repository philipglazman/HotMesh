import React from "react";
import T from "prop-types";
import { StyledComponent } from "fela-components";

class Dot extends React.Component {
  static propTypes = {
    delay: T.string.isRequired,
  };

  render() {
    const { delay } = this.props;
    return (
      <StyledComponent
        visual={({ animations }) => ({
          width: "8px",
          height: "8px",
          backgroundColor: "white",
          margin: "3px",
          borderRadius: "50%",
          animationName: animations.pulse,
          animationDuration: "1.4s",
          animationDelay: delay,
          animationIterationCount: "infinite",
          animationFillMode: "both",
        })}
        animations={{
          pulse: {
            "0%": { opacity: "0.5", transform: "scale(1)" },
            "30%": { opacity: "1", transform: "scale(1.15)" },
            "60%": { opacity: "0.5", transform: "scale(1)" },
            "100%": { opacity: "0.5", transform: "scale(1)" },
          },
        }}
      />
    );
  }
}

export class PendingIndicator extends React.Component {
  render() {
    const { props } = this;
    return (
      <StyledComponent
        visual={({ fadeIn }) => ({
          display: "flex",
          height: "12px",
          alignItems: "center",
          justifyContent: "center",
          animationName: fadeIn,
          animationDuration: "0.6s",
          animationFillMode: "both",
        })}
        animations={{
          fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        }}>
        <Dot delay="0.20s" {...props} />
        <Dot delay="0.35s" {...props} />
        <Dot delay="0.50s" {...props} />
      </StyledComponent>
    );
  }
}
