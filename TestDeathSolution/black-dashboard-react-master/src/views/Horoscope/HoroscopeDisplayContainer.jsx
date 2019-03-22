import React from "react";
import * as scraperService from "../../Services/scraperService";
import HoroscopeCard from "./HoroscopeCard";
import { Card, CardHeader } from "reactstrap";

export default class Horoscopes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      horoscope: []
    };
  }

  componentDidMount() {
    this.horoscopeScraper();
  }

  horoscopeScraper = () => {
    scraperService.horoscopeScraper().then(this.onGetHoroscopeSuccess);
  };

  onGetHoroscopeSuccess = resp => {
    debugger;
    this.setState({
      horoscope: resp.data
    });
  };

  horoscopeList = (horoscopes, i) => {
    return <HoroscopeCard key={i} horoscope={horoscopes} />;
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader color="warning">
            <h4>Horoscope Scraper</h4>
          </CardHeader>
        </Card>
        {this.state.horoscope.map(this.horoscopeList)}
      </div>
    );
  }
}
