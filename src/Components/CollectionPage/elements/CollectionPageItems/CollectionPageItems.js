import React from "react";
import "./CollectionPageItems.css";
import OneCollection from "../OneCollection/OneCollection";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const CollectionPageItems = ({ allItemsOfCol, id, editMode, collection }) => {
  const loggedUser = useSelector((state) => state.loggedUser);

  if (allItemsOfCol) {
    return (
      <div className="collection-page-items">
        <div className="collection-page-items-header">Items</div>

        <div className="collection-page-items-table">
          {(loggedUser._id === collection.author.id ||
            loggedUser.role === "admin") &&
            !editMode && (
              <div className="collection-page-items-table-add-item">
                <NavLink to={`/add-item/${id}`}>
                  <button>Add an item</button>
                </NavLink>
              </div>
            )}

          <div className="collection-page-items-table-all">
            {[...allItemsOfCol].map((el, ind) => (
              <OneCollection
                key={ind}
                item={el}
                editMode={editMode}
                collection={collection}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default CollectionPageItems;
