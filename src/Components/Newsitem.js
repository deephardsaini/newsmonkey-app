import React from "react";

const Newsitem = (props) => {
  const {
    title,
    description,
    imageUrl,
    url,
    author,
    date,
    source,
  } = props;

  const fallbackImage =
    "https://via.placeholder.com/400x200.png?text=No+Image+Available";

  return (
    <div>
      <div className="card mt-3 mx-2">
        <img
          src={imageUrl || fallbackImage}
          className="card-img-top"
          alt={title || "News image"}
        />
        <div className="card-body">
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{ left: "80%", zIndex: 1 }}
          >
            {source || "Unknown Source"}
          </span>
          <h5 className="card-title">{title || "No title available"}</h5>
          <p className="card-text">
            {description ? `${description}...` : "No description available"}
          </p>
          <p className="card-text">
            <small>
              By {author || "Unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark btn-sm"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsitem;
