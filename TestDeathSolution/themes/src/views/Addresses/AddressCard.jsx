import React from "react";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

export default class AddressCard extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <img
            src={
              "//maps.googleapis.com/maps/api/staticmap?zoom=15&size=640x640&maptype=roadmap&markers=color:red|" +
              `${this.props.mapImageUrl}` +
              "|&key=AIzaSyDPt4lOsC7-Fo-BBk_WD_DeQO2ozHe2y6A"
            }
          />{" "}
        </CardHeader>
        <CardBody>
          {" "}
          <div>this is the body</div>{" "}
        </CardBody>
        <CardFooter> this is the footer </CardFooter>
      </Card>
    );
  }
}
