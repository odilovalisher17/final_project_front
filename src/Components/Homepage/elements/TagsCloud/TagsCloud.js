import React, { useEffect } from "react";
import "./TagsCloud.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateTags } from "../../../../Store/Reducers/TagsReducer";
import Loading from "../../../Loading/Loading";

const TagsCloud = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags);
  const mode = useSelector((state) => state.modeChanger);

  useEffect(() => {
    const getTags = async () => {
      try {
        const data = await axios.get(
          "https://final-project-yb3m.onrender.com/api/v1/items/getAllTags"
        );

        dispatch(
          updateTags(
            data.data.tags.reduce((total, value) => {
              return (total = [
                ...total,
                ...value.tags.filter((e) => !total.includes(e)),
              ]);
            }, [])
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

    getTags();
  }, [dispatch]);

  if (tags.length > 0) {
    return (
      <div
        className={
          mode === "dark"
            ? "tags-cloud bg-dark-card"
            : "tags-cloud bg-light-card"
        }>
        <div className="tags-cloud-header">
          <h5>All Tags</h5>
        </div>

        <div className="tags-cloud-table">
          {tags.map((el, index) => (
            <button key={index} className="tag-btn">
              #{el}
            </button>
          ))}
        </div>
      </div>
    );
  } else {
    return <Loading nums={10} height={"50px"} />;
  }
};

export default TagsCloud;
