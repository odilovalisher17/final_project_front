import React from "react";
import "./ItemPageBody.css";
import { Row, Col } from "react-bootstrap";
import imgNotFound from "../../../Homepage/img/img-not-found2.jpg";

const ItemPageBody = ({ item, editMode, newItem, setNewItem }) => {
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
              Author : {item.author.firstName + " " + item.author.lastName}
            </div>

            <div className="item-page-body-collection">
              Collection : {item.collection.name}
            </div>

            <div className="item-page-body-properties">
              {Object.entries(item.properties).map(([key, value]) => (
                <div key={key}>
                  {key} :{" "}
                  {editMode ? (
                    <input
                      type="text"
                      value={newItem.properties[`${key}`]}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          properties: {
                            ...newItem.properties,
                            [key]: e.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    value
                  )}
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ItemPageBody;
