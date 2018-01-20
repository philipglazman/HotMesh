import React from "react";

import { Content } from "./content";
import { Dialog } from "./dialog";
import { Footer } from "./footer";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";
import { Qr } from "./qr";

export class StepOne extends React.Component {
  render() {
    const address = "some-wallet-address";
    const btcPrice = 0.0001;

    return (
      <Dialog>
        <Content>
          <Heading>HOTMESH</Heading>
          <Paragraph>Send Bitcoin to the wallet address below to buy time online.</Paragraph>
          <Qr string={address} />
        </Content>
        <Footer>
          1 hour
          &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
          $1
          &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
          {btcPrice} BTC
        </Footer>
      </Dialog>
    );
  }
}
