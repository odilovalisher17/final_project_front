import React, { useEffect } from "react";
import "./Collections.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateCollections } from "../../../../Store/Reducers/CollectionReducer";
import Loading from "../../../Loading/Loading";

const Collections = () => {
  const mode = useSelector((state) => state.modeChanger);
  const collections = useSelector((state) => state.collections);
  const dispatch = useDispatch();

  /* eslint-disable */
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(
          "https://final-project-yb3m.onrender.com/api/v1/collections/getAllCollections"
        );

        dispatch(updateCollections(data.data.collections));
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);
  /* eslint-enable */

  if (collections.length > 0) {
    return (
      <div
        className={
          mode === "dark"
            ? "collections bg-dark-card"
            : "collections bg-light-card"
        }>
        <div className="collections-header">
          <h5>Most Popular Collections</h5>
        </div>

        <div className="collections-table-of-collections">
          {collections.map((el, index) => (
            <NavLink
              to={`/collection/${el._id}`}
              key={index}
              className={
                mode === "dark"
                  ? "collections-one-collection-dark"
                  : "collections-one-collection-light"
              }>
              {el.name}
            </NavLink>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Loading nums={10} height={"50px"} />
      </div>
    );
  }
};

export default Collections;
