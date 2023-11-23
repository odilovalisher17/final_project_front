import React from "react";
import "./ItemPageHeader.css";

const ItemPageHeader = ({
  editMode,
  setEditMode,
  newItem,
  setNewItem,
  item,
}) => {
  return (
    <div className="item-page-header">
      <div style={{ maxWidth: "70%", display: "flex" }}>
        {editMode ? (
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => {
              setNewItem({ ...newItem, name: e.target.value });
            }}
          />
        ) : (
          <h3>{item.name}</h3>
        )}
      </div>

      <div className="item-page-header-time">{item.created_time}</div>
    </div>
  );
};

export default ItemPageHeader;
