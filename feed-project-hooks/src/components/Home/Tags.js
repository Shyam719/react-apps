import agent from "../../utils/agent";
import React, { useState, useEffect, useContext } from "react";
import "./Home.scss";
import Context from "../../utils/context";
import { TAG_FILTER } from "../../store/actions/actionTypes";

let count = 0;

const Tags = () => {
  const { dispatch } = useContext(Context);
  const initialState = {
    tags: [],
  };
  const [data, setData] = useState(initialState);

  useEffect(() => {
    console.log("use effect tags");
    const fetchTags = async () => {
      const res = await agent.Tags.all();
      if (res.status === 200) {
        setData({
          ...data,
          tags: res.data.tags,
        });
      }
    };
    fetchTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickTag = (tag) => {
    dispatch({ type: TAG_FILTER, tag: tag });
  };

  console.log(count++);
  if (data.tags.length > 0) {
    return (
      <div className="tags-container">
        {data.tags.map((tag) => {
          const handleClick = (ev) => {
            ev.preventDefault();
            onClickTag(tag);
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
