import React from "react";
import { ThemeProvider } from "fela-components";

export class AppTheme extends React.Component {
  static theme = {
    // Colors
    darkGrey: "#3E3A35",
    lightGrey: "#807D7B",

    // Fonts
    roboto: "'Roboto', sans-serif",

    // Screen sizes
    xs: "@media (min-width: 20rem) and (max-width: 35rem)",
    sm: "@media (min-width: 36rem)",
    md: "@media (min-width: 48rem)",
    lg: "@media (min-width: 62rem)",
    xl: "@media (min-width: 75rem)",
  };

  render() {
    return <ThemeProvider theme={AppTheme.theme} {...this.props} />;
  }
}
