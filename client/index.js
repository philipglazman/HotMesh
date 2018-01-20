import "babel-polyfill";
import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom";
import { Provider as FelaProvider } from "fela-components";
import { createRenderer } from "fela";
import debug from "debug";

import { App } from "./components/app";
import { AppTheme } from "./components/app-theme";

// Expose debug on window to make it reachable through browser console.
// That way you can adjust what you want logged simply through typing in the
// console: `debug.enable('signals:*')`, or whatever...
window.debug = debug;

const renderer = createRenderer();
const reactMountNode = document.getElementById("app");

ReactDOM.render(
  <FelaProvider
    renderer={renderer}
    staticStyles="html {-webkit-font-smoothing: antialiased} body {margin: 0; font-family: 'Roboto', sans-serif} *:focus {outline: none}">
    <AppTheme>
      <App />
    </AppTheme>
  </FelaProvider>,
  reactMountNode,
);
