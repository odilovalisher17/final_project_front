import React, { useState, useEffect } from "react";
import "./AddCollectionBody.css";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../../Loading/Loading";

const AddCollectionBody = ({ newCol, setNewCol }) => {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(
          `https://final-project-yb3m.onrender.com/api/v1/users/user?_id=${id}`
        );

        setUser(data.data.user);
      } catch (error) {}
    };

    getData();
  }, [id]);

  return (
    <div className="add-collection-body">
      <div className="add-collection-body-name">
        <Row>
          <Col xs={6} s={6} md={6} lg={6} xl={6}>
            <div>Name : </div>
          </Col>

          <Col xs={6} s={6} md={6} lg={6} xl={6}>
            <div>
              <input
                type="text"
                placeholder="Enter collection's name"
                value={newCol.name}
                onChange={(e) => setNewCol({ ...newCol, name: e.target.value })}
              />
            </div>
          </Col>
        </Row>
      </div>

      <div className="add-collection-body-author">
        <Row>
          <Col xs={6} s={6} md={6} lg={6} xl={6}>
            <div>Author : </div>
          </Col>

          <Col xs={6} s={6} md={6} lg={6} xl={6}>
            {user ? (
              <div>{user.firstName + " " + user.lastName}</div>
            ) : (
              <Loading nums={1} height="50px" />
            )}
          </Col>
        </Row>
      </div>

      <div className="add-collection-body-topic">
        <Row>
          <Col xs={6} s={6} md={6} lg={6} xl={6}>
            <div>Topic : </div>
          </Col>

          <Col xs={6} s={6} md={6} lg={6} xl={6}>
            <div>
              <input
                type="text"
                placeholder="Enter topic"
                value={newCol.topic}
                onChange={(e) =>
                  setNewCol({ ...newCol, topic: e.target.value })
                }
              />
            </div>
          </Col>
        </Row>
      </div>

      <div className="add-collection-body-description">
        <Row>
          <Col xs={6} s={6} md={6} lg={6} xl={6}>
            <div>Description : </div>
          </Col>

          <Col xs={6} s={6} md={6} lg={6} xl={6}>
            <div>
              <textarea
                placeholder="Enter your text"
                value={newCol.description}
                onChange={(e) =>
                  setNewCol({ ...newCol, description: e.target.value })
                }></textarea>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddCollectionBody;
