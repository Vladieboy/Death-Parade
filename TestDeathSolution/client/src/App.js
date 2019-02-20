import React, { Component } from "react";

import "./App.css";
import { familiar_select } from "./server";

class App extends Component {
  state = {
    familiars: []
  };

  async componentDidMount() {
    const familiars = await familiar_select();
    this.setState({ familiars });
  }

  render() {
    const { familiars } = this.state;

    return (
      <div>
        <h1>Create a react app</h1>
        <div>{this.demonMapper(familiars)}</div>
      </div>
    );
  }

  demonMapper(familiars) {
    return (
      <div>
        {familiars.map((familiar, i) => (
          <div key={i}>
            <div>{familiar.Name}</div>
            <div>{familiar.DemonType}</div>
            <div>{familiar.Age}</div>
          </div>
        ))}
      </div>
    );
  }
}
export default App;
