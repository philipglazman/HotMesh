import React from "react";
import T from "prop-types";

import { Content } from "./content";
import { Dialog } from "./dialog";
import { Footer } from "./footer";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";
import { Qr } from "./qr";

import { getPrice } from "../services/api";
import { withFetch } from "./with-fetch";

const config = {
  fetch: getPrice,
};

@withFetch(config)
export class StepOne extends React.Component {
  static propTypes = {
    data: T.object.isRequired,
  }

  render() {
    const { address, btcPrice } = this.props.data;

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
