import React, { useState, useEffect } from "react";
import "./AddItemPageBody.css";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import ImgNotFound from "../../../Homepage/img/img-not-found2.jpg";

const AddItemPageBody = ({ id }) => {
  const loggedUser = useSelector((state) => state.loggedUser);
  const [collectionOfItem, setCollectionOfITem] = useState();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getProp = async () => {
      try {
        const data = await axios.get(
          `https://final-project-yb3m.onrender.com/api/v1/collections/collection/${id}`
        );
        setCollectionOfITem(data.data.collectionn);

        let newProperties = [];
        for (let key in data.data.collectionn) {
          if (
            [
              "custom_string1",
              "custom_string2",
              "custom_string3",
              "custom_int1",
              "custom_int2",
              "custom_int3",
              "custom_bool1",
              "custom_bool2",
              "custom_bool3",
              "custom_date1",
              "custom_date2",
              "custom_date3",
              "custom_text1",
              "custom_text2",
              "custom_text3",
            ].includes(key)
          ) {
            newProperties.push(key);
          }
        }
        setProperties(newProperties);
      } catch (error) {
        console.log(error);
      }
    };

    getProp();
  }, [id]);

  if (collectionOfItem) {
    return (
      <Row>
        <Col xs={12} s={12} md={4} lg={4} xl={4}>
          <div className="add-item-page-add-img">
            <img src={ImgNotFound} alt="" />
          </div>
        </Col>

        <Col xs={12} s={12} md={8} lg={8} xl={8}>
          <div className="add-item-page-body">
            <div className="add-item-page-body-name">
              <span>Name: </span>
              <input type="text" />
            </div>

            <div className="add-item-page-body-author">
              <span>Author: </span>
              <span>{loggedUser.firstName + " " + loggedUser.lastName}</span>
            </div>

            <div className="add-item-page-body-collection">
              <span>Collection: </span>
              <span>{collectionOfItem.name}</span>
            </div>

            <div className="add-item-page-body-properties">
              {properties.map((el, ind) => (
                <div key={ind}>{el}</div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default AddItemPageBody;
