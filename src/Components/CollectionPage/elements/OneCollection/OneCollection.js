import React from "react";
import "./OneCollection.css";
import { Row, Col } from "react-bootstrap";
import ImgNotFound from "../../../Homepage/img/img-not-found2.jpg";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const OneCollection = ({ item, collection, editMode }) => {
  const loggedUser = useSelector((state) => state.loggedUser);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://final-project-yb3m.onrender.com/api/v1/items/item/${item._id}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="collection-page-one-collection">
      <Row>
        <Col xs={3} s={3} md={3} lg={3} xl={3}>
          <div className="one-collection-left">
            <img src={ImgNotFound} alt="" />
          </div>
        </Col>

        <Col xs={7} s={7} md={7} lg={7} xl={7}>
          <div>Name : {item.name}</div>

          {Object.entries(item.properties).map(([key, val]) => (
            <div key={key}>
              {key} : {typeof val === "boolean" ? (val ? "Yes" : "No") : val}
            </div>
          ))}

          <div>
            Tags :
            <div>
              {item.tags.map((e, ind) => (
                <span key={ind} style={{ marginRight: "10px", color: "green" }}>
                  #{e}
                </span>
              ))}
            </div>
          </div>
        </Col>

        <Col xs={2} s={2} md={2} lg={2} xl={2}>
          {(loggedUser._id === collection.author.id ||
            loggedUser.role === "admin") &&
            !editMode && (
              <div className="one-collection-item-update">
                <NavLink to={`/item/${item._id}`}>
                  <button>Edit Item</button>
                </NavLink>
                <button
                  className="one-collection-delete-item-btn"
                  onClick={() => {
                    const userConfirmed = window.confirm(
                      "Are you sure you want to delete this item?"
                    );

                    if (userConfirmed) {
                      handleDelete();
                    }
                  }}>
                  Delete Item
                </button>
              </div>
            )}
        </Col>
      </Row>
    </div>
  );
};

export default OneCollection;
