import React from "react";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";

export default class AddressCard extends React.Component {
  handleClick = () => {
    this.props.modalRequester(this.props.address.AddressId);
  };

  handleDelete = () => {
    this.props.remove(this.props.address.AddressId);
  };
  render() {
    return (
      <Card>
        <CardHeader>
          <img
            style={{
              marginLeft: "20px",
              height: "500px",
              // width: "500px",
              overflow: "hidden"
            }}
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
        <CardFooter>
          {" "}
          <Button onClick={e => this.handleClick(e)}> Update</Button>
          <Button onClick={e => this.handleDelete(e)}> Delete</Button>
        </CardFooter>
      </Card>
    );
  }
}
