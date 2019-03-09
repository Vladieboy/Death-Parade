import React, { Component } from "react";
// @material-ui/core components
import InputLabel from "@material-ui/core/InputLabel";
// core components

import { Card, CardHeader, CardBody, Button } from "reactstrap";
import { Form, Formik } from "formik";
import * as schemas from "../../Schemas/addressSchemas";
import * as mapService from "../../Services/googleMapsService.js";
import * as addressService from "../../Services/addressService.js";
import Input from "@material-ui/core/Input";
// import TextArea from "@material-ui/core/TextField";

export default class AddressCreation extends Component {
  constructor(props) {
    super(props);
    this.validation = schemas.getAddressSchema;
    this.state = {
      addressData: this.validation.initialValues,
      tc: false,
      tcu: false,
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
      addressId: this.props.address,
      value: JSON.stringify(addressData),
      userId: 1,
      lat: latLong.lat,
      long: latLong.long,
      addressCategory: this.state.addressData.lineOne,
      notes: addressData.title
    };

    if (this.props.address !== undefined) {
      addressService
        .update(payload, this.props.address)
        .then(this.onAddressUpdateSuccess);
    } else {
      addressService.create(payload).then(this.onAddressSuccess);
    }
  };

  removeAddressRequest = () => {
    this.props.remove(this.props.address);
  };

  onAddressSuccess = () => {
    this.setState({
      tc: true
    });
  };
  onAddressUpdateSuccess = () => {
    this.setState(
      {
        tcu: false
      },
      () => this.componentDidUpdate()
    );
  };

  componentDidUpdate() {}

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
        {/* <GridContainer> */}
        <div>
          {/* <GridItem xs={12} sm={12} md={6}> */}
          <Card>
            <CardHeader color="primary">
              <h4 style={styleClasses.headerStyles}>Register Your Address: </h4>
              <p style={styleClasses.paragraphStyles}>Complete your profile</p>
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
                      <div>
                        <InputLabel for="lineOne"> Address Line 1:</InputLabel>
                      </div>
                      <div>
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
                      </div>
                      <div>
                        <InputLabel for="lineTwo">Address Line 2:</InputLabel>
                      </div>
                      <div>
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
                      </div>
                      <div>
                        <InputLabel for="city">City:</InputLabel>
                      </div>
                      <div>
                        <Input
                          id="city"
                          type="text"
                          value={values.city || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={errors.city && touched.city ? "error" : ""}
                        />
                        {errors.city && touched.city && (
                          <label className="error">{errors.city}</label>
                        )}
                      </div>
                      <div>
                        <InputLabel for="postalCode">State:</InputLabel>
                      </div>
                      <div>
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
                      </div>
                      <div>
                        <InputLabel for="postalCode">ZIP:</InputLabel>
                      </div>
                      <div>
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
                          <label className="error">{errors.postalCode}</label>
                        )}
                      </div>
                      <div>
                        <InputLabel for="title">
                          Notes on this Location:
                        </InputLabel>
                      </div>
                      <div>
                        <Input
                          id="title"
                          type="text"
                          value={values.title || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.title && touched.title ? "error" : ""
                          }
                        />
                        {errors.title && touched.title && (
                          <label className="error">{errors.title}</label>
                        )}
                      </div>

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
        </div>
        {/* <Snackbar
          place="tc"
          color="primary"
          icon={AddAlert}
          message="Successfully Posted!"
          open={this.state.tc}
          closeNotification={() => this.setState({ tc: false })}
          close
        />
        <Snackbar
          place="tc"
          color="primary"
          icon={AddAlert}
          message="Successfully Updated!"
          open={this.state.tcu}
          closeNotification={() => this.setState({ tcu: false })}
          close
        /> */}
        {/* </GridContainer> */}
      </div>
    );
  }
}
