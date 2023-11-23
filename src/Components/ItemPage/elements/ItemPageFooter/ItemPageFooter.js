import React from "react";
import "./ItemPageFooter.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEye, faComment } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";

const ItemPageFooter = ({ isLike, setIsLike, item, id }) => {
  const loggedUser = useSelector((state) => state.loggedUser);

  const handleLikes = async () => {
    if (loggedUser) {
      try {
        let newLikes = [...item.likes];
        if (isLike) {
          newLikes = newLikes.filter((e) => e !== loggedUser._id);
        } else {
          newLikes.push(loggedUser._id);
        }

        await axios.put(`http://localhost:8080/api/v1/items/item/${id}`, {
          likes: newLikes,
        });
        setIsLike((e) => !e);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("You should login to like.");
    }
  };

  return (
    <div className="item-page-footer">
      <div className="one-item-footer-likes">
        <div className="likes-hover-effect" onClick={() => handleLikes()}>
          <FontAwesomeIcon
            icon={isLike ? faSolidHeart : faHeart}
            color={isLike ? "rgb(249, 24, 128)" : "#000"}
            fontSize="25px"
            fill="white"
          />
        </div>

        <span>{item.likes.length}</span>
      </div>

      <div className="one-item-footer-views">
        <div className="views-hover-effect">
          <FontAwesomeIcon
            icon={faEye}
            color="#000"
            fontSize="25px"
            fill="white"
          />
        </div>

        <span>789</span>
      </div>

      <div className="one-item-footer-comments">
        <div className="comments-hover-effect">
          <FontAwesomeIcon
            icon={faComment}
            color="#000"
            fontSize="25px"
            fill="white"
          />
        </div>

        <span>{item.comments.length}</span>
      </div>
    </div>
  );
};

export default ItemPageFooter;
