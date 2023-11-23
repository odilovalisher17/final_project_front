import React from "react";
import "./ItemPageTags.css";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ItemPageTags = ({ newItem, setNewItem, editMode }) => {
  return (
    <div className="item-page-tags">
      <Row>
        {newItem.tags.map((el, index) => (
          <Col xs={6} s={6} md={4} lg={3} xl={3} key={index}>
            {editMode ? (
              <div className="item-page-tags-tag">
                <span style={{ fontSize: "20px" }}>#</span>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  value={newItem.tags[index]}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      tags: [
                        ...newItem.tags.map((t, ind) => {
                          if (ind === index) {
                            return e.target.value;
                          } else {
                            return t;
                          }
                        }),
                      ],
                    })
                  }
                />
                <button
                  onClick={() =>
                    setNewItem({
                      ...newItem,
                      tags: [
                        ...newItem.tags.filter(
                          (delItem, delInd) => delInd !== index
                        ),
                      ],
                    })
                  }>
                  <FontAwesomeIcon icon={faTrash} color="red"></FontAwesomeIcon>
                </button>
              </div>
            ) : (
              `#${el}`
            )}
          </Col>
        ))}

        {editMode && (
          <Col xs={6} s={6} md={4} lg={3} xl={3}>
            <button
              onClick={() =>
                setNewItem({
                  ...newItem,
                  tags: [...newItem.tags, ""],
                })
              }>
              Add Tag
            </button>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ItemPageTags;
