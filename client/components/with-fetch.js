import React from "react";
import T from "prop-types";
import createDebug from "debug";
import invariant from "invariant";

import { PendingSlate } from "./pending-slate";
import { RejectedSlate } from "./rejected-slate";

const debug = createDebug("with-fetch");

class Fetch extends React.Component {
  static propTypes = {
    fetch: T.func.isRequired,
    shouldRefetch: T.func,
    pending: T.func,
    rejected: T.func,
    fulfilled: T.func,
    onPending: T.func,
    onFulfilled: T.func,
    onRejected: T.func,
    mapResponse: T.func,
    mapError: T.func,
  };

  static defaultProps = {
    pending: () => null,
    fulfilled: () => null,
    rejected: () => null,
    onPending: () => {},
    onFulfilled: () => {},
    onRejected: () => {},
    mapResponse: response => ({ data: response.body }),
    mapError: error => ({ error }),
    shouldRefetch: () => false,
  };

  state = {
    status: "pending",
    response: null,
  };

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    // In some cases, it can happen that a component stays mounted, but a
    // new fetch operation should happen regardless. For example, the user
    // navigates from one "detail" view to another. The component stays
    // mounted, but because we navigated to a new route with a different ID,
    // we need to do a new fetch.
    const { props } = this;
    if (props.shouldRefetch(prevProps, props)) {
      this.fetch();
    }
  }

  fetch = async () => {
    const {
      fetch,
      onPending,
      onFulfilled,
      onRejected,
      mapResponse,
      mapError,
    } = this.props;

    this.setState({ status: "pending" }, async () => {
      debug("Promise set to pending");
      onPending({ ...this.props, fetch: this.fetch });

      try {
        const response = mapResponse(await fetch());
        onFulfilled({ ...this.props, response, fetch: this.fetch });
        debug("Promise fulfilled %o", response);
        this.setState({ status: "fulfilled", response });
      } catch (error) {
        const response = mapError(error);
        onRejected({ ...this.props, response, fetch: this.fetch });
        debug("Promise rejected %o", response);
        this.setState({ status: "rejected", response });
      }
    });
  };

  render() {
    const { status, response } = this.state;
    const { fulfilled, rejected, pending, ...rest } = this.props;

    const props = { ...rest, ...response, fetch: this.fetch };

    switch (status) {
      case "fulfilled":
        return fulfilled(props);
      case "rejected":
        return rejected(props);
      default:
        return pending(props);
    }
  }
}

export function withFetch(config) {
  const {
    Rejected = RejectedSlate,
    Pending = PendingSlate,
    ...otherConfig
  } = config;

  return Fulfilled => {
    invariant(Fulfilled, "[with-fetch] Missing `Fulfilled` component.");

    return class FetchEnhancer extends React.Component {
      render() {
        return (
          <Fetch
            {...this.props}
            {...otherConfig}
            rejected={props => <Rejected {...props} />}
            pending={props => <Pending {...props} />}
            fulfilled={props => <Fulfilled {...props} />}
          />
        );
      }
    }
  };
}
