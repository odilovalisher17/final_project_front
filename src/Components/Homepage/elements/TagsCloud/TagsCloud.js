import React, { useEffect } from "react";
import "./TagsCloud.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateTags } from "../../../../Store/Reducers/TagsReducer";

const TagsCloud = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags);

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
      <div className="tags-cloud">
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
    return <div>Loading...</div>;
  }
};

export default TagsCloud;
