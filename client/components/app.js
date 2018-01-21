import React from "react";
import T from "prop-types";

import { Layout } from "./layout";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";

import { getAddressPaid } from "../services/api";
import { withRequest } from "./with-request";

const config = {
  request: getAddressPaid,
};

@withRequest(config)
export class App extends React.Component {
  static propTypes = {
    request: T.object.isRequired,
  };

  state = {
    isPaid: false,
  };

  componentDidMount() {
    if (!!global.window) {
      this.interval = setInterval(
        () => {
          if (this.props.request.status !== "pending"
            && !this.state.isPaid) {
            this.props.request.action()
          }
        }
      , 10000);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.request.status === "pending"
      && nextProps.request.status === "fulfilled") {
      if (nextProps.request.data.paid) {
        this.setState({ isPaid: true });
      }
    }
  }

  componentWillUnmount() {
    if (!!global.window) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { isPaid } =  this.state;
    return (
      <Layout>
        {isPaid ? <StepTwo /> : <StepOne />}
      </Layout>
    );
  }
}
