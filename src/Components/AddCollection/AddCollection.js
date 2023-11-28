import React, { useState } from "react";
import "./AddCollection.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import imgNotFound from "../Homepage/img/img-not-found2.jpg";
import AddCollectionBody from "./elements/AddCollectionBody/AddCollectionBody";
import AddCollectionPropeties from "./elements/AddCollectionProperties/AddCollectionPropeties";
import axios from "axios";
import Loading from "../Loading/Loading";

const AddCollection = () => {
  const { id } = useParams();
  const loggedUser = useSelector((state) => state.loggedUser);
  const mode = useSelector((state) => state.modeChanger);
  const [newCol, setNewCol] = useState({
    name: "",
    topic: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      newCol.name.length === 0 ||
      newCol.topic.length === 0 ||
      newCol.description.length === 0
    ) {
      alert("Please fill all the fields");
    } else {
      e.target.disabled = true;
      const readyProps = {};
      Object.entries(newCol).forEach(([key, val], ind) => {
        if (val.length > 0) {
          if (
            !newCol[
              `${key.substr(0, key.length - 1)}${
                key.substr(key.length - 1) - 1
              }`
            ] &&
            key.substr(key.length - 1) * 1 > 1
          ) {
            if (
              !newCol[
                `${key.substr(0, key.length - 1)}${
                  key.substr(key.length - 1) - 2
                }`
              ] &&
              key.substr(key.length - 1) - 2 > 0
            ) {
              readyProps[
                `${key.substr(0, key.length - 1)}${
                  key.substr(key.length - 1) - 2
                }`
              ] = val;
            } else {
              readyProps[
                `${key.substr(0, key.length - 1)}${
                  key.substr(key.length - 1) - 1
                }`
              ] = val;
            }
          } else {
            readyProps[key] = val;
          }
        }
      });

      try {
        await axios.post(
          `https://final-project-yb3m.onrender.com/api/v1/collections/addCollection`,
          {
            ...readyProps,
            author: {
              id: id,
            },
            image_url: "",
          }
        );
      } catch (error) {
        console.log(error);
      } finally {
        e.target.disabled = false;
        window.location.reload();
      }
    }
  };

  if (id === loggedUser._id || loggedUser.role === "admin") {
    return (
      <div
        className={
          mode === "dark"
            ? "add-collection bg-dark-mode"
            : "add-collection bg-light-mode"
        }>
        <Container>
          <div
            className={
              mode === "dark"
                ? "add-collection-card bg-dark-card"
                : "add-collection-card bg-light-card"
            }>
            <div className="add-collection-header">Add Collection Form</div>

            <div className="add-collection-body">
              <Row>
                <Col xs={12} s={4} md={4} lg={4} xl={4}>
                  <div className="add-collection-body-img">
                    <img src={imgNotFound} alt="" />
                  </div>
                </Col>

                <Col xs={12} s={8} md={8} lg={8} xl={8}>
                  <AddCollectionBody newCol={newCol} setNewCol={setNewCol} />
                </Col>
              </Row>
            </div>

            <AddCollectionPropeties newCol={newCol} setNewCol={setNewCol} />

            <div className="add-collection-submit-btn">
              <button onClick={(e) => handleSubmit(e)}>Submit</button>
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div
        className={
          mode === "dark"
            ? "add-collection bg-dark-mode"
            : "add-collection bg-light-mode"
        }>
        <Container>
          <div
            className={
              mode === "dark"
                ? "add-collection-card bg-dark-card"
                : "add-collection-card bg-light-card"
            }>
            <div className="add-collection-header">
              <Loading nums={1} height="50px" />
            </div>

            <div className="add-collection-body">
              <Loading nums={3} height="120px" />
            </div>
          </div>
        </Container>
      </div>
    );
  }
};

export default AddCollection;
