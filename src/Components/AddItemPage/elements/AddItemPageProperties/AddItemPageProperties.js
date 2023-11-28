import React from "react";
import "./AddItemPageProperties.css";
import { Row, Col } from "react-bootstrap";

const AddItemPageProperties = ({
  collectionOfItem,
  newItem,
  setNewItem,
  properties,
}) => {
  return (
    <div className="add-item-page-body-properties">
      {properties.map((el, ind) => (
        <Row key={ind}>
          <Col xs={12} s={12} md={6} lg={6} xl={6}>
            <span>
              {collectionOfItem[el].charAt(0).toUpperCase() +
                collectionOfItem[el].substr(1)}{" "}
              :
            </span>
          </Col>

          <Col xs={12} s={12} md={6} lg={6} xl={6}>
            {el.substr(7, el.length - 8) === "string" ? (
              <input
                type="text"
                placeholder="Enter your text here"
                value={newItem.properties[collectionOfItem[el]]}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    properties: {
                      ...newItem.properties,
                      [collectionOfItem[el]]: e.target.value,
                    },
                  })
                }
              />
            ) : el.substr(7, el.length - 8) === "bool" ? (
              <input
                type="checkbox"
                style={{ width: "22px", height: "22px" }}
                checked={Boolean(newItem.properties[collectionOfItem[el]])}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    properties: {
                      ...newItem.properties,
                      [collectionOfItem[el]]: e.target.checked,
                    },
                  })
                }
              />
            ) : el.substr(7, el.length - 8) === "date" ? (
              <input
                type="date"
                value={
                  newItem.properties[collectionOfItem[el]]
                    ? newItem.properties[collectionOfItem[el]]
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    properties: {
                      ...newItem.properties,
                      [collectionOfItem[el]]: new Date(e.target.value),
                    },
                  })
                }
              />
            ) : el.substr(7, el.length - 8) === "int" ? (
              <input
                type="number"
                placeholder="Enter a number"
                value={newItem.properties[collectionOfItem[el]]}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    properties: {
                      ...newItem.properties,
                      [collectionOfItem[el]]: Number(e.target.value),
                    },
                  })
                }
              />
            ) : (
              <textarea
                placeholder="Enter your text here"
                value={newItem.properties[collectionOfItem[el]]}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    properties: {
                      ...newItem.properties,
                      [collectionOfItem[el]]: e.target.value,
                    },
                  })
                }></textarea>
            )}
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default AddItemPageProperties;
