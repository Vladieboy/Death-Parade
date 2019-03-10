import React, { Component } from "react";
import "./App.css";

import { Route, Switch, withRouter } from "react-router-dom";

import LandingPage from "./Components/LandingPage";
import Navigation from "./Components/Navigation";
import mainList from "./routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: true
    };
  }

  getComponents = (route, index) => (
    <Route
      key={index}
      {...this.props}
      exact
      path={route.path}
      render={props => (
        <route.component {...this.state.currentUser} {...props} />
      )}
    />
  );

  notARobot = () => {
    this.setState({
      isAuthorized: true
    });
  };

  getRoutes = () => {
    if (this.state.isAuthorized) {
      return (
        <Navigation
          {...this.props}
          currentUser={this.state.currentUser}
          logOut={this.logOut}
        >
          {mainList.map(this.getComponents)}
        </Navigation>
      );
    } else {
      return (
        <React.Fragment>
          <Route
            exact
            path="/splash"
            render={props => (
              <LandingPage {...props} setAuthorized={this.notARobot} />
            )}
          />
        </React.Fragment>
      );
    }
  };
  render() {
    return <Switch>{this.getRoutes()}</Switch>;
  }
}

export default withRouter(App);
