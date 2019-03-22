import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";

export default class HoroscopeCard extends Component {
  render() {
    console.log(this.props.horoscope);
    return (
      <div>
        <Card>
          {" "}
          <CardBody>
            <blockquote>
              <p>{this.props.horoscope.Horoscope}</p>
            </blockquote>
          </CardBody>
        </Card>
      </div>
    );
  }
}
