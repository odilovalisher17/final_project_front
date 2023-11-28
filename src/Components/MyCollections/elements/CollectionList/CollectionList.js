import React, { useState, useEffect } from "react";
import "./CollectionList.css";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import imgNotFound from "../../../Homepage/img/img-not-found2.jpg";

const CollectionList = () => {
  const { id } = useParams();
  const [allCollections, setAllCollections] = useState();
  const [refresher, setRefresher] = useState(false);
  const loggedUser = useSelector((state) => state.loggedUser);

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `https://final-project-yb3m.onrender.com/api/v1/collections/getAllCollections?user_id=${id}`
      );

      setAllCollections(data.data.collections);
    };
    getData();
  }, [id, refresher]);

  const handleDeleteCol = async (e, idOfCol) => {
    e.preventDefault();
    e.target.disabled = true;
    try {
      await axios.delete(
        `https://final-project-yb3m.onrender.com/api/v1/collections/collection/${idOfCol}`
      );
    } catch (error) {
      console.log(error);
    } finally {
      e.target.disabled = false;
      setRefresher((r) => !r);
    }
  };

  if (allCollections) {
    return (
      <div className="collection-list">
        {allCollections.length === 0 && "No collection created yet."}
        {allCollections.map((col, ind) => (
          <div className="collection-list-one-item" key={ind}>
            <Row>
              <Col xs={4} s={4} md={4} lg={4} xl={4}>
                <div className="collection-list-collection-image">
                  <img
                    src={col.image_url ? col.image_url : imgNotFound}
                    alt=""
                  />
                </div>
              </Col>

              <Col xs={8} s={8} md={6} lg={6} xl={6}>
                <div className="collection-list-collection-content">
                  <div>Name : {col.name}</div>
                  <div>Topic : {col.topic}</div>
                  <div>Description : {col.description}</div>
                </div>
              </Col>

              {((loggedUser && loggedUser._id === id) ||
                loggedUser.role === "admin") && (
                <Col xs={12} s={12} md={2} lg={2} xl={2}>
                  <div className="collection-list-btns">
                    <NavLink to={`/collection/${col._id}`}>
                      <button>Add item</button>
                    </NavLink>

                    <NavLink to={`/collection/${col._id}`}>
                      <button>Edit </button>
                    </NavLink>

                    <button
                      style={{ background: "rgb(255, 139, 139)" }}
                      onClick={(e) => handleDeleteCol(e, col._id)}>
                      Delete
                    </button>
                  </div>
                </Col>
              )}
            </Row>
          </div>
        ))}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default CollectionList;
