import React from "react";
import PropTypes from "prop-types";

import { Col, Row, Container } from "reactstrap";

import Reddit from "views/Reddit/Reddit.jsx";
import Maps from "views/MyFancyMap.jsx";
import Horoscope from "views/Horoscope/HoroscopeDisplayContainer";

class Dashboard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Container>
              <Row>
                <Col xs={12} sm={6} md={7}>
                  <h12>Welcome to your...</h12>
                  <h1>DEATH PARADE</h1>
                  <Maps />
                  <Horoscope />
                </Col>
                <Col xs={12} sm={6} md={5}>
                  <Reddit />
                </Col>

                <Col xs={12} sm={6} md={4} />
              </Row>
              <Row>
                <Col xs={12} sm={6} md={3} />
                <Col xs={12} sm={6} md={3} />
              </Row>
              <Row>
                <Col xs={12} sm={6} md={3} />
                <Col xs={12} sm={6} md={3} />
              </Row>
            </Container>
          </Row>
        </div>
      </>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Dashboard;
