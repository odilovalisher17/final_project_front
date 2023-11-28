import React from "react";
import "./AddItemPageBody.css";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Loading from "../../../Loading/Loading";

const AddItemPageBody = ({
  newItem,
  setNewItem,
  collectionOfItem,
  properties,
}) => {
  const loggedUser = useSelector((state) => state.loggedUser);

  if (collectionOfItem) {
    return (
      <div className="add-item-page-body">
        <Row className="add-item-page-body-name">
          <Col xs={12} s={12} md={6} lg={6} xl={6}>
            <span>Name of item : </span>
          </Col>

          <Col xs={12} s={12} md={6} lg={6} xl={6}>
            <input
              type="text"
              placeholder="Enter a name of item"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </Col>
        </Row>

        <Row className="add-item-page-body-author">
          <Col xs={12} s={12} md={6} lg={6} xl={6}>
            {" "}
            <span>Author : </span>
          </Col>
          <Col xs={12} s={12} md={6} lg={6} xl={6}>
            {" "}
            <span>{loggedUser.firstName + " " + loggedUser.lastName}</span>
          </Col>
        </Row>

        <Row className="add-item-page-body-collection">
          <Col xs={12} s={12} md={6} lg={6} xl={6}>
            <span>Collection : </span>
          </Col>
          <Col xs={12} s={12} md={6} lg={6} xl={6}>
            <span>{collectionOfItem.name}</span>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <Loading nums={5} height="50px" />;
  }
};

export default AddItemPageBody;
