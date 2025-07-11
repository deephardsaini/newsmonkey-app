import React from "react";

const Newsitem = (props) => {
  const { title, description, imageUrl, url, author, date, source } = props;


  return (
    <div>
      <div className="card mt-3 mx-2">
        <img src={imageUrl} className="card-img-top" alt="News" />
        <div className="card-body"> 
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{ left: "80%", zIndex: 1 }}
          >
            {source}     
          </span>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}... </p>
          <p className="card-text">
            <small>
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>

          <a href={url} target="_blank" className="btn btn-dark btn-sm">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsitem;
