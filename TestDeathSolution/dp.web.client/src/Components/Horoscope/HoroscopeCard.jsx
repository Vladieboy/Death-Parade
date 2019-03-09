import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";

export default class HoroscopeCard extends Component {
  render() {
    console.log(this.props.horoscope);
    return (
      <div>
        <Card>
          {" "}
          <CardBody>{this.props.horoscope.Horoscope}</CardBody>
        </Card>
      </div>
    );
  }
}
