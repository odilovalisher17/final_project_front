import React from "react";
import "./Comments.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Comments = ({ comment, setComment, id, item }) => {
  const loggedUser = useSelector((state) => state.loggedUser);

  const handleAddComment = async () => {
    if (loggedUser && comment.trim().length > 0) {
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
    <div className="item-page-comments">
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
            onClick={() => {
              handleAddComment();
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
