import React from "react";
import T from "prop-types";
import createDebug from "debug";
import invariant from "invariant";
import { connect } from "react-redux";

const debug = createDebug("with-request");

const initialState = {
  status: "initial",
  response: null,
};

class Request extends React.Component {
  static propTypes = {
    request: T.func.isRequired,
    children: T.func,
    onPending: T.func,
    onFulfilled: T.func,
    onRejected: T.func,
    mapResponse: T.func,
    mapError: T.func,
  };

  static defaultProps = {
    children: () => null,
    onPending: () => {},
    onFulfilled: () => {},
    onRejected: () => {},
    mapResponse: data => ({ data }),
    mapError: error => ({ error }),
  };

  state = initialState;

  reset = () => {
    this.setState(initialState);
  };

  request = async (...args) => {
    const {
      request,
      onPending,
      onFulfilled,
      onRejected,
      mapResponse,
      mapError,
    } = this.props;
    const action = this.request;
    const reset = this.reset;

    return new Promise((resolve, reject) => {
      this.setState({ status: "pending" }, async () => {
        debug("Promise set to pending");
        onPending({ ...this.props, action: this.request });

        try {
          const response = mapResponse(await request(...args));
          this.setState({ status: "fulfilled", response }, () => {
            onFulfilled({ ...this.props, response, action, reset });
            resolve({ ...this.props, response, action, reset });
            debug("Promise fulfilled %o", response);
          });
        } catch (error) {
          const response = mapError(error);
          this.setState({ status: "rejected", response }, () => {
            onRejected({ ...this.props, response, action, reset });
            reject({ ...this.props, response, action, reset });
            debug("Promise rejected %o", response);
          });
        }
      });
    });
  };

  render() {
    const { status, response } = this.state;
    const {
      children,
      onPending: _omit1,
      onFulfilled: _omit2,
      onRejected: _omit3,
      mapResponse: _omit4,
      mapError: _omit5,
      ...otherProps
    } = this.props;
    const action = this.request;
    const reset = this.reset;

    const request = { status, ...response, action, reset };
    const props = { ...otherProps, request };

    return children(props);
  }
}

export function withRequest(mapRequestToProps) {
  return WrappedComponent => {
    invariant(
      WrappedComponent,
      "[with-request] Missing `WrappedComponent` component.",
    );

    class RequestEnhancer extends React.Component {
      static propTypes = {
        children: T.node,
      };

      render() {
        return (
          <Request {...this.props}>
            {props =>
              <WrappedComponent {...props} children={this.props.children} />
            }
          </Request>
        );
      }
    }

    return connect(mapRequestToProps)(RequestEnhancer);
  };
}
