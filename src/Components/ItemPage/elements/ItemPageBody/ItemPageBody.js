import React, { useState, useEffect } from "react";
import "./ItemPageBody.css";
import { Row, Col } from "react-bootstrap";
import imgNotFound from "../../../Homepage/img/img-not-found2.jpg";
import axios from "axios";

const ItemPageBody = ({ item, editMode, setItem }) => {
  const [properties, setProperties] = useState();

  /*eslint-disable*/
  useEffect(() => {
    const getDate = async () => {
      try {
        const data = await axios.get(
          `https://final-project-yb3m.onrender.com/api/v1/collections/collection/${item.collection.id}`
        );

        let propArr = [];
        Object.entries(data.data.collectionn).map(([key, value]) => {
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
            propArr.push([key.substr(7, key.length - 8), value]);
          }
          return 0;
        });

        setProperties(propArr);
      } catch (error) {
        console.log(error);
      }
    };

    getDate();
  }, []);
  /*eslint-enable*/

  const convertDateFormat = (inputDateString) => {
    const inputDate = new Date(inputDateString);
    const year = inputDate.getFullYear();
    const month = ("0" + (inputDate.getMonth() + 1)).slice(-2);
    const day = ("0" + inputDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  if (properties) {
    return (
      <div className="item-page-body">
        <Row>
          <Col xs={12} s={12} md={5} lg={5} xl={5}>
            <div className="item-page-body-img">
              <img
                src={item.image_url.length > 0 ? item.image_url : imgNotFound}
                alt=""
              />
            </div>
          </Col>

          <Col xs={12} s={12} md={7} lg={7} xl={7}>
            <div className="item-page-body-content">
              <div className="item-page-body-author">
                <Row>
                  <Col xs={12} s={6} md={6} lg={6} xl={6}>
                    Author :{" "}
                  </Col>
                  <Col xs={12} s={6} md={6} lg={6} xl={6}>
                    {item.author.firstName + " " + item.author.lastName}
                  </Col>
                </Row>
              </div>

              <div className="item-page-body-collection">
                <Row>
                  <Col xs={12} s={6} md={6} lg={6} xl={6}>
                    Collection :{" "}
                  </Col>

                  <Col xs={12} s={6} md={6} lg={6} xl={6}>
                    {item.collection.name}
                  </Col>
                </Row>
              </div>

              <div className="item-page-body-properties">
                {Object.entries(item.properties).map(([key, value]) => (
                  <Row key={key} className="item-page-body-one-prop">
                    <Col xs={12} s={6} md={6} lg={6} xl={6}>
                      <div>{key} :</div>
                    </Col>

                    <Col xs={12} s={6} md={6} lg={6} xl={6}>
                      {properties[0] &&
                        (editMode ? (
                          properties.filter((p) => p[1] === key)[0][0] ===
                          "string" ? (
                            <input
                              type="text"
                              value={item.properties[`${key}`]}
                              onChange={(e) =>
                                setItem({
                                  ...item,
                                  properties: {
                                    ...item.properties,
                                    [key]: e.target.value,
                                  },
                                })
                              }
                            />
                          ) : properties.filter((p) => p[1] === key)[0][0] ===
                            "int" ? (
                            <input
                              type="number"
                              value={item.properties[`${key}`]}
                              onChange={(e) =>
                                setItem({
                                  ...item,
                                  properties: {
                                    ...item.properties,
                                    [key]: e.target.value,
                                  },
                                })
                              }
                            />
                          ) : properties.filter((p) => p[1] === key)[0][0] ===
                            "date" ? (
                            <input
                              type="date"
                              value={convertDateFormat(
                                item.properties[`${key}`]
                              )}
                              onChange={(e) =>
                                setItem({
                                  ...item,
                                  properties: {
                                    ...item.properties,
                                    [key]: e.target.value,
                                  },
                                })
                              }
                            />
                          ) : properties.filter((p) => p[1] === key)[0][0] ===
                            "bool" ? (
                            <input
                              style={{ width: "22px", height: "22px" }}
                              type="checkbox"
                              checked={item.properties[`${key}`]}
                              onChange={(e) =>
                                setItem({
                                  ...item,
                                  properties: {
                                    ...item.properties,
                                    [key]: e.target.checked,
                                  },
                                })
                              }
                            />
                          ) : properties.filter((p) => p[1] === key)[0][0] ===
                            "text" ? (
                            <textarea
                              value={item.properties[`${key}`]}
                              onChange={(e) =>
                                setItem({
                                  ...item,
                                  properties: {
                                    ...item.properties,
                                    [key]: e.target.value,
                                  },
                                })
                              }
                            />
                          ) : (
                            ""
                          )
                        ) : typeof value === "boolean" ? (
                          value ? (
                            "Yes"
                          ) : (
                            "No"
                          )
                        ) : properties.filter((p) => p[1] === key)[0][0] ===
                          "date" ? (
                          convertDateFormat(value)
                        ) : (
                          value
                        ))}
                    </Col>
                  </Row>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ItemPageBody;
