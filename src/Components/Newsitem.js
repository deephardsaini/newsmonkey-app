import React from "react";

const Newsitem = (props) => {
  const { title, description, imageUrl, url, author, date, source } = props;

  const fallbackImage =
    "https://via.placeholder.com/400x200.png?text=No+Image+Available";

  return (
    <div className="card mt-3 mx-2">
      <img
        src={imageUrl || fallbackImage}
        className="card-img-top"
        alt="News"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body position-relative">
        <span
          className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
          style={{ left: "80%", zIndex: 1 }}
        >
          {source}
        </span>
        <h5 className="card-title">{title || "No Title"}</h5>
        <p className="card-text">
          {description ? `${description}...` : "No Description"}
        </p>
        <p className="card-text">
          <small className="text-muted">
            By {author || "Unknown"} on {new Date(date).toGMTString()}
          </small>
        </p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-dark"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default Newsitem;
