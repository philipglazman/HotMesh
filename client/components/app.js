import React from "react";

import { Layout } from "./layout";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";

export class App extends React.Component {
  render() {
    const step = 1;
    return (
      <Layout>
        {this.renderStep(step)}
      </Layout>
    );
  }

  renderStep(step) {
    switch (step) {
      case 1: return <StepOne />;
      case 2: return <StepTwo />;
      default: null;
    }
  }
}
