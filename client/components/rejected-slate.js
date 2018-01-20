import React from "react";

import { Content } from "./content";
import { Dialog } from "./dialog";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";

export class RejectedSlate extends React.Component {
  render() {
    return (
      <Dialog>
        <Content>
          <Heading>An error occured</Heading>
          <Paragraph>
            There has been an error. Please try again later.
          </Paragraph>
        </Content>
      </Dialog>
    );
  }
}
