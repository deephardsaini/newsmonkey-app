import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import spinner from "../spinner.gif";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country, pageSize, category, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchNews = async () => {
    setLoading(true);
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    const response = await fetch(url);

    if (response.status === 401 || response.status === 429) {
      alert("Rate limit exceeded. Please try again later.");
      setLoading(false);
      setHasMore(false);
      return;
    }

    const parseData = await response.json();
    setArticles(parseData.articles || []);
    setTotalResults(parseData.totalResults || 0);
    setLoading(false);
    setHasMore((parseData.articles?.length || 0) >= pageSize);
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;

    if (setProgress) setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
    const response = await fetch(url);

    if (response.status === 401 || response.status === 429) {
      alert("Rate limit exceeded. Please try again later.");
      setHasMore(false);
      if (setProgress) setProgress(100);
      return;
    }

    if (setProgress) setProgress(30);

    const parseData = await response.json();

    if (setProgress) setProgress(70);

    setArticles((prevArticles) =>
      prevArticles.concat(parseData.articles || [])
    );
    setPage(nextPage);
    setTotalResults(parseData.totalResults || 0);

    setHasMore(
      articles.length + (parseData.articles?.length || 0) <
        (parseData.totalResults || 0)
    );

    if (setProgress) setProgress(100);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center">
        NewsMonkey - Top {capitalizeFirstLetter(category)} Headlines
      </h1>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<img src={spinner} alt="Loading more..." style={{ display: "block", margin: "auto", width: "40px" }} />}
      >
        <div className="row mt-4 gx-0">
          {articles.map((element, index) => (
            <div className="col-md-4" key={index}>
              <Newsitem
                title={element.title}
                description={element.description}
                imageUrl={element.urlToImage}
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
};

News.defaultProps = {
  country: "us",
  pageSize: 15,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func,
};

export default News;
