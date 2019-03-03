import React, { Conponent, Component } from "react";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

export default class RedditCard extends Component {
  render() {
    return (
      <Card>
        <CardBody>{this.props.reddit.Title}</CardBody>
        <CardBody>
          <div>{this.props.reddit.Image}</div>
        </CardBody>
      </Card>
    );
  }
}
