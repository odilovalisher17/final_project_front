import React from "react";
import "./ItemPageTags.css";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ItemPageTags = ({ item, setItem, editMode }) => {
  return (
    <div className="item-page-tags">
      <Row>
        {item.tags.map((el, index) => (
          <Col xs={6} s={6} md={4} lg={3} xl={3} key={index}>
            {editMode ? (
              <div className="item-page-tags-tag">
                <span style={{ fontSize: "20px" }}>#</span>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  value={item.tags[index]}
                  onChange={(e) =>
                    setItem({
                      ...item,
                      tags: [
                        ...item.tags.map((t, ind) => {
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
                    setItem({
                      ...item,
                      tags: [
                        ...item.tags.filter(
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
                setItem({
                  ...item,
                  tags: [...item.tags, ""],
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
