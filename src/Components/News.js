import React, { Component } from "react";
import Newsitem from "./Newsitem";
import spinner from "../spinner.gif";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 15,
    category: "general",  
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      hasMore: true,
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }

 fetchNews = async () => {
  this.setState({ loading: true });
  const { page } = this.state;
  const { pageSize, country, category } = this.props;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

 const url = `/api/news?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}`;

  const response = await fetch(url);

  // ⛔ Check for 429 error
  if (response.status === 401) {
    alert("Rate limit exceeded. Please try again later.");
    this.setState({ loading: false, hasMore: false });
    return;
  }

  const parseData = await response.json();

  this.setState({
    articles: parseData.articles || [],
    totalResults: parseData.totalResults || 0,
    loading: false,
    hasMore: (parseData.articles?.length || 0) >= pageSize,
  });
};


 fetchMoreData = async () => {
  const nextPage = this.state.page + 1;
  const { pageSize, country, category } = this.props;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  this.props.setProgress?.(10);

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
  const response = await fetch(url);

  // ⛔ Check for 429 error
  if (response.status === 401) {
    alert("Rate limit exceeded. Please try again later.");
    this.setState({ hasMore: false });
    this.props.setProgress?.(100);
    return;
  }

  this.props.setProgress?.(30);
  const parseData = await response.json();
  this.props.setProgress?.(70);

  this.setState((prevState) => ({
    page: nextPage,
    articles: prevState.articles.concat(parseData.articles || []),
    totalResults: parseData.totalResults || 0,
    hasMore:
      prevState.articles.length + (parseData.articles?.length || 0) <
      (parseData.totalResults || 0),
  }));

  this.props.setProgress?.(100);
};



  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">
          News Monkey - <span>Top</span>{" "}
          <span style={{ marginLeft: "5px" }}>
            {this.capitalizeFirstLetter(this.props.category)}
          </span>{" "}
          Headlines
        </h1>

        {/* Show spinner before initial load */}
        {this.state.loading && this.state.articles.length === 0 && (
          <div className="text-center my-3">
            <img src={spinner} alt="loading" style={{ width: "40px" }} />
          </div>
        )}

        <InfiniteScroll      
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={
            this.state.hasMore && (
              <div className="text-center my-3">
                <img src={spinner} alt="loading" style={{ width: "40px" }} />
              </div>
            )
          }
          endMessage={
            <p className="text-center mt-4">
              <b>Yay! You have seen all the news.</b>
            </p>
          }
        >
          <div className="row mt-4 gx-0">
            {this.state.articles.map((element, index) => (
              <div className="col-md-4" key={index}>
                <Newsitem
                  title={
                    element.title ? element.title.slice(0, 45) : "No Title"
                  }
                  description={
                    element.description
                      ? element.description.slice(0, 88)
                      : "No Description Available"
                  }
                  imageurl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://www.dianomi.com/img/a/sav2/349880/4/300x160.jpg"
                  }
                  url={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
