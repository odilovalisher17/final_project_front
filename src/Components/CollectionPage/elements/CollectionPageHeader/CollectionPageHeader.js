import React from "react";
import "./CollectionPageHeader.css";

const CollectionPageHeader = ({
  editMode,
  setEditMode,
  collection,
  setCollection,
}) => {
  return (
    <div className="collection-page-header">
      <h3>
        {editMode ? (
          <input
            type="text"
            value={collection.name}
            onChange={(e) =>
              setCollection({ ...collection, name: e.target.value })
            }
          />
        ) : (
          collection.name
        )}
      </h3>
    </div>
  );
};

export default CollectionPageHeader;
