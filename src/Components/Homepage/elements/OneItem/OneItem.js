import React from "react";
import "./OneItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faPenNib,
  faTags,
  faComment,
  faHeart as faSolidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import imageNotFound from "../../img/img-not-found2.jpg";
import { Button, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const OneItem = ({ item, getData }) => {
  const loggedUser = useSelector((state) => state.loggedUser);
  const mode = useSelector((state) => state.modeChanger);

  const handleLikes = async () => {
    if (loggedUser) {
      try {
        let newLikes = [...item.likes];
        if (item.likes.includes(loggedUser._id)) {
          newLikes = newLikes.filter((e) => e !== loggedUser._id);
        } else {
          newLikes.push(loggedUser._id);
        }

        await axios.put(
          `https://final-project-yb3m.onrender.com/api/v1/items/item/${item.id}`,
          {
            likes: newLikes,
          }
        );

        getData();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("You have to login to like");
    }
  };

  const changeDateFormat = (inputDateString) => {
    var inputDate = new Date(inputDateString);

    var hours = ("0" + inputDate.getHours()).slice(-2);
    var minutes = ("0" + inputDate.getMinutes()).slice(-2);
    var month = inputDate.toLocaleString("en-US", { month: "short" });
    var day = inputDate.getDate();

    var outputDateString = `${hours}:${minutes} ${month} ${day}`;

    return outputDateString;
  };

  return (
    <div
      className={
        mode === "dark" ? "one-item bg-dark-card" : "one-item bg-light-card"
      }>
      <Row className="one-item-top">
        <Col sm={5} md={3} lg={3} className="one-item-image">
          {item.image ? (
            <img className="one-item-img" src={item.image} alt="" />
          ) : (
            <img
              className="one-item-not-found-img"
              src={imageNotFound}
              alt=""
            />
          )}
        </Col>

        <Col sm={7} md={9} lg={9} className="one-item-right">
          <div className="one-item-name">
            <h4>
              <i>{item.name}</i>
            </h4>

            <div className="one-item-published-time">
              <small>{changeDateFormat(item.time)}</small>
            </div>
          </div>

          <div className="one-item-author">
            <h5>
              <FontAwesomeIcon icon={faPenNib} /> Author :{" "}
              {item.author.firstName + " " + item.author.lastName}
            </h5>
          </div>

          <div className="one-item-collection">
            <h5>
              <FontAwesomeIcon icon={faBox} /> Collection : {item.collection}
            </h5>
          </div>

          <div className="one-item-tags">
            <h5>
              <FontAwesomeIcon icon={faTags} /> Tags :{" "}
            </h5>
            {item.tags.map((el, index) => (
              <span key={index}>#{el}</span>
            ))}
          </div>

          <NavLink to={`/item/${item.id}`}>
            <Button variant="danger">See Full Page of Item</Button>
          </NavLink>
        </Col>
      </Row>

      <div className="one-item-footer">
        <div className="one-item-footer-likes">
          <div className="likes-hover-effect" onClick={() => handleLikes()}>
            <FontAwesomeIcon
              icon={
                item.likes.includes(loggedUser._id) ? faSolidHeart : faHeart
              }
              color={
                item.likes.includes(loggedUser._id)
                  ? "rgb(249, 24, 128)"
                  : "#000"
              }
              fontSize="25px"
              fill="white"
            />
          </div>

          <span>{item.likes.length}</span>
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
    </div>
  );
};

export default OneItem;
