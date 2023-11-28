import React from "react";
import "./Comments.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Comments = ({ comment, setComment, id, item }) => {
  const loggedUser = useSelector((state) => state.loggedUser);
  const mode = useSelector((state) => state.modeChanger);

  const handleAddComment = async (e) => {
    if (loggedUser && comment.trim().length > 0) {
      e.target.disabled = true;
      try {
        await axios.put(
          `https://final-project-yb3m.onrender.com/api/v1/items/item/${id}`,
          {
            comments: [
              ...item.comments,
              {
                text: comment.trim(),
                published_time: Date.now(),
                user: {
                  firstName: loggedUser.firstName,
                  lastName: loggedUser.lastName,
                  id: loggedUser._id,
                },
              },
            ],
          }
        );
      } catch (error) {
        console.log(error);
      }
      e.target.disabled = false;
    } else {
      alert("You should login to comment");
    }
  };

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
    <div
      className={
        mode === "dark"
          ? "item-page-comments bg-dark-card"
          : "item-page-comments bg-light-card"
      }>
      <div className="itam-page-comments-header">Comments:</div>

      <div className="item-page-comments-add-comment">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment"
        />

        <div>
          <button
            onClick={(e) => {
              handleAddComment(e);
              setComment("");
            }}>
            Send comment
          </button>
        </div>
      </div>

      <div className="item-page-comments-field">
        {item.comments.map((c, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <div className="item-page-comments-author">
              <span>{c.user.firstName + " " + c.user.lastName + " "}</span>
              <small>{changeDateFormat(new Date(c.published_time))}</small>
            </div>

            <div className="item-page-comments-text">{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
