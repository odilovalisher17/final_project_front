import React from "react";
import "./ItemPageHeader.css";

const ItemPageHeader = ({ editMode, setItem, item }) => {
  const changeDateFormat = (date) => {
    // Format time
    const timeString = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Format date without the year
    const dateString = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    // Concatenate time and date strings
    const formattedDateTime = `${timeString} ${dateString}`;

    return formattedDateTime;
  };

  return (
    <div className="item-page-header">
      <div style={{ maxWidth: "70%", display: "flex" }}>
        {editMode ? (
          <input
            type="text"
            value={item.name}
            onChange={(e) => {
              setItem({ ...item, name: e.target.value });
            }}
          />
        ) : (
          <h3>{item.name}</h3>
        )}
      </div>

      <div className="item-page-header-time">
        {changeDateFormat(new Date(item.created_time))}
      </div>
    </div>
  );
};

export default ItemPageHeader;
