import React from "react";
import "./Home.css";

const Tags = (props) => {
  const tags = props.tags;
  if (tags) {
    return (
      <div className="tags-container">
        {tags.map((tag) => {
          const handleClick = (ev) => {
            ev.preventDefault();
            props.onClickTag(tag);
          };
          const href = "#";
          return (
            <a
              className="tag-default tag-pill"
              key={tag}
              onClick={handleClick}
              href={href}
            >
              {tag}
            </a>
          );
        })}
      </div>
    );
  } else {
    return <div>Loading tags ..... !!!</div>;
  }
};

export default Tags;
