import React, { Conponent, Component } from "react";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

export default class RedditCard extends Component {
  imageOrNot = () => {
    if (this.props.reddit.Image.includes("/r/occult/")) {
      return <a href={"reddit.com" + this.props.reddit.Image}> Link </a>;
    } else {
      return (
        <img
          style={{ height: "300px", width: "300px" }}
          src={this.props.reddit.Image}
          alt="ERROR loading Image"
        />
      );
    }
  };

  render() {
    return (
      <div>
        <CardHeader>{this.props.reddit.Title}</CardHeader>
        <CardBody>{this.imageOrNot()}</CardBody>
      </div>
    );
  }
}
