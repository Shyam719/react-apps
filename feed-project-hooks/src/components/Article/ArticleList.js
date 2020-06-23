import React from "react";

const ArticleList = (props) => {
  const liStyles = {
    listStyle: "none",
    textAlign: "left",
    borderBottom: "1px solid #ccc",
    margin: 0,
    padding: "5px",
  };
  const ulStyles = {
    padding: 0,
  };
  const pStyles = {
    padding: "20px",
    textAlign: "left",
  };
  return (
    <ul style={ulStyles}>
      {props.articles && props.articles.length > 0 ? (
        props.articles.map((article) => {
          return (
            <li key={article.title} style={liStyles}>
              <h6>{article.title}</h6>
              <div>{article.description}</div>
            </li>
          );
        })
      ) : (
        <p style={pStyles}>No Articles Yet...!!</p>
      )}
    </ul>
  );
};

export default ArticleList;
