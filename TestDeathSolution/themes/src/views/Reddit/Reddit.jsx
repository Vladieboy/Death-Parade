import React from "react";
import * as scraperService from "../../services/scraperService";
import RedditCard from "../Reddit/RedditCard";

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
    console.log(this.state.reddit);
    return (
      <div>
        {this.state.reddit.map(this.redditList)}
        {/* <RedditCard redditData={this.state.reddit} /> */}
        <h1>Reddit Scraper</h1>
        <br />
        <br />
      </div>
    );
  }
}

export default Reddit;
