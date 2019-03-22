import React, { Component } from "react";

import { CardHeader, CardBody } from "reactstrap";

export default class RedditCard extends Component {
  imageOrNot = () => {
    if (this.props.reddit.Image.includes("/r/occult/")) {
      return (
        <a href={"https://www.reddit.com" + this.props.reddit.Image}>
          {" "}
          Visit this Thread{" "}
        </a>
      );
    } else {
      return (
        <img
          style={{ height: "300px", width: "300px" }}
          src={this.props.reddit.Image}
          alt="ERROR loading"
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
