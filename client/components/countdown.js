import React from "react";
import T from "prop-types";
import moment from "moment";
import "moment-countdown";

class Countdown extends React.Component {
  static propTypes = {
    dateTime: T.string.isRequired,
  };

  componentDidMount() {
    if (!!global.window) {
      this.interval = setInterval(() => this.forceUpdate(), 1000);
    }
  }

  componentWillUnmount() {
    if (!!global.window) {
      clearInterval(this.interval);
    }
  }

  render() {
    const timespan = moment().countdown(this.props.dateTime);

    return (
      <span>
        {timespan.hours < 10 ? `0${timespan.hours}` : timespan.hours}
        &nbsp;:&nbsp;
        {timespan.minutes < 10 ? `0${timespan.minutes}` : timespan.minutes}
        &nbsp;:&nbsp;
        {timespan.seconds < 10 ? `0${timespan.seconds}` : timespan.seconds}
      </span>
    );
  }
}

export { Countdown };
