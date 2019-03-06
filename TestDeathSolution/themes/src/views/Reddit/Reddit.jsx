import React from "react";
import * as scraperService from "../../services/scraperService";
import RedditCard from "../Reddit/RedditCard";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

class Reddit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reddit: []
    };
  }

  componentDidMount() {
    scraperService.redditScraper().then(this.onRedditScrapeSuccess);
  }

  onRedditScrapeSuccess = resp => {
    console.log(resp);
    this.setState({ reddit: resp.data });
  };

  redditList = (reddit, i) => {
    return <RedditCard key={i} reddit={reddit} />;
  };

  render() {
    return (
      <Card>
        <CardHeader color="warning">
          <h4>Reddit Scraper</h4>
        </CardHeader>
        {this.state.reddit.map(this.redditList)}
      </Card>
    );
  }
}

export default Reddit;
