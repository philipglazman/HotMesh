import React from "react";
import moment from "moment";

import { Content } from "./content";
import { Countdown } from "./countdown";
import { Dialog } from "./dialog";
import { Footer } from "./footer";
import { Heading } from "./heading";

export class StepTwo extends React.Component {
  render() {
    return (
      <Dialog>
        <Content>
          <Heading>Hooray!<br />You are now online</Heading>
        </Content>
        <Footer>
          <Countdown dateTime={moment().add(1, "hours").toString()}/>
        </Footer>
      </Dialog>
    );
  }
}
