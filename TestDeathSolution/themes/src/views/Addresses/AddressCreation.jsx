import React, { Component } from "react";
// @material-ui/core components
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Form, Formik } from "formik";
import * as schemas from "models/addressSchemas.js";
import * as mapService from "services/googleMapsService.js";
import * as addressService from "services/addressService.js";
import Input from "@material-ui/core/Input";

export default class AddressCreation extends Component {
  constructor(props) {
    super(props);
    this.validation = schemas.getAddressSchema;
    this.state = {
      addressData: this.validation.initialValues,
      location: {
        lat: 0,
        long: 0
      }
    };
  }

  componentDidMount() {
    if (this.props.address !== undefined) {
      this.getAddressId(this.props.address);
    }
  }

  getAddressId = address => {
    addressService.getId(address).then(this.onGetAddressSuccess);
  };

  onGetAddressSuccess = resp => {
    this.setState({ addressData: JSON.parse(resp.Item.Value) });
  };

  handleSubmit = values => {
    this.setState(
      {
        addressData: values
      },
      () => this.setMapData()
    );
  };

  onGeoLocationSuccess = response => {
    let dest = JSON.parse(response.Item);

    let latLong = dest.results[0].geometry.location;

    this.setState(
      {
        location: {
          lat: latLong.lat,
          long: latLong.lng
        }
      },
      () => this.createAddress()
    );
  };

  onGeoLocateFailure = resp => {
    console.log(resp);
  };

  setMapData = () => {
    let mapImageUrl = encodeURIComponent(
      this.state.addressData.lineOne.replace(/[&\\#,+()$~%.'":*?<>{}]/g, "") +
        "," +
        this.state.addressData.lineTwo.replace(/[&\\#,+()$~%.'":*?<>{}]/g, "") +
        "," +
        this.state.addressData.city.replace(/[&\\#,+()$~%.'":*?<>{}]/g, "") +
        "," +
        this.state.addressData.state.replace(/[&\\#,+()$~%.'":*?<>{}]/g, "") +
        "," +
        this.state.addressData.postalCode.replace(
          /[&\\#,+()$~%.'":*?<>{}]/g,
          ""
        )
    );
    this.setState(
      {
        mapImage: mapImageUrl
      },
      () => this.geoLocateMe(this.state.mapImage)
    );
  };

  geoLocateMe = mapUrlString => {
    mapService
      .geoLocation2(mapUrlString)
      .then(this.onGeoLocationSuccess)
      .catch(this.onGeoLocateFailure);
  };

  createAddress = () => {
    let addressData = this.state.addressData;
    let latLong = this.state.location;

    let payload = {
      value: JSON.stringify(addressData),
      userId: 1,
      lat: latLong.lat,
      long: latLong.long,
      addressCategory: "Place"
    };

    if (this.props.address !== undefined) {
      addressService.update(payload, this.props.address);
    } else {
      addressService.create(payload);
    }
  };

  removeAddressRequest = () => {
    this.props.remove(this.props.address);
  };

  render() {
    const styleClasses = {
      headerStyles: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
      },
      paragraphStyles: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      }
    };

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={3}>
            <Card>
              <CardHeader color="primary">
                <h4 style={styleClasses.headerStyles}>
                  Register Your Address:{" "}
                </h4>
                <p style={styleClasses.paragraphStyles}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <Formik
                  enableReinitialize={true}
                  initialValues={this.state.addressData}
                  onSubmit={this.handleSubmit}
                  validationSchema={this.validation()}
                >
                  {props => {
                    const {
                      values,
                      touched,
                      errors,
                      isSubmitting,
                      handleChange,
                      handleBlur,
                      handleSubmit
                    } = props;
                    return (
                      <Form onSubmit={handleSubmit}>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={8}>
                            <InputLabel for="lineOne">
                              {" "}
                              Address Line 1:
                            </InputLabel>
                          </GridItem>

                          <GridItem xs={12} sm={12} md={8}>
                            <Input
                              id="lineOne"
                              type="text"
                              value={values.lineOne || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.lineOne && touched.lineOne ? "error" : ""
                              }
                            />
                            {errors.lineOne && touched.lineOne && (
                              <label className="error">{errors.lineOne}</label>
                            )}
                          </GridItem>

                          <GridItem xs={12} sm={12} md={8}>
                            <InputLabel for="lineTwo">
                              Address Line 2:
                            </InputLabel>
                          </GridItem>

                          <GridItem xs={12} sm={12} md={8}>
                            <Input
                              id="lineTwo"
                              type="text"
                              value={values.lineTwo || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.lineTwo && touched.lineTwo ? "error" : ""
                              }
                            />
                            {errors.lineTwo && touched.lineTwo && (
                              <label className="error">{errors.lineTwo}</label>
                            )}
                          </GridItem>

                          <GridItem xs={12} sm={12} md={8}>
                            <InputLabel for="city">City:</InputLabel>
                          </GridItem>

                          <GridItem xs={12} sm={12} md={8}>
                            <Input
                              id="city"
                              type="text"
                              value={values.city || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.city && touched.city ? "error" : ""
                              }
                            />
                            {errors.city && touched.city && (
                              <label className="error">{errors.city}</label>
                            )}
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            <InputLabel for="postalCode">State:</InputLabel>
                          </GridItem>

                          <GridItem xs={12} sm={12} md={8}>
                            <Input
                              id="state"
                              type="text"
                              value={values.state || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.state && touched.state ? "error" : ""
                              }
                            />
                            {errors.state && touched.state && (
                              <label className="error">{errors.state}</label>
                            )}
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            <InputLabel for="postalCode">ZIP:</InputLabel>
                          </GridItem>

                          <GridItem xs={12} sm={12} md={8}>
                            <Input
                              id="postalCode"
                              type="text"
                              value={values.postalCode || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.postalCode && touched.postalCode
                                  ? "error"
                                  : ""
                              }
                            />
                            {errors.postalCode && touched.postalCode && (
                              <label className="error">
                                {errors.postalCode}
                              </label>
                            )}
                          </GridItem>
                        </GridContainer>

                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          onClick={e => this.removeAddressRequest(e)}
                        >
                          Delete
                        </Button>
                      </Form>
                    );
                  }}
                </Formik>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
