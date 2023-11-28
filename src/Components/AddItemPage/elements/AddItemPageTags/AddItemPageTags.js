import React from "react";
import "./AddItemPageTags.css";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const AddItemPageTags = ({ newItem, setNewItem }) => {
  const handleAddTag = (e) => {
    e.preventDefault();
    if (newItem.tags.length === 10) {
      alert("It is maximum number of tags");
    } else {
      setNewItem({ ...newItem, tags: [...newItem.tags, ""] });
    }
  };

  const handleWriteTag = (e, index) => {
    e.preventDefault();

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
    });
  };

  const handleDeleteTag = (e, ind) => {
    e.preventDefault();

    setNewItem({
      ...newItem,
      tags: [...newItem.tags.filter((t, i) => i !== ind)],
    });
  };

  return (
    <div className="add-item-page-tags">
      <div className="add-item-page-tags-header">Tags</div>

      <Row>
        {newItem.tags.map((t, ind) => (
          <Col xs={4} s={4} md={3} lg={3} xl={3} key={ind}>
            <div className="add-item-page-tags-tag-container">
              <input
                type="text"
                value={newItem.tags[ind]}
                onChange={(e) => handleWriteTag(e, ind)}
              />

              <button onClick={(e) => handleDeleteTag(e, ind)}>
                <FontAwesomeIcon icon={faTrash} color="red" />
              </button>
            </div>
          </Col>
        ))}

        <Col xs={4} s={4} md={3} lg={3} xl={3}>
          <button
            className="add-item-page-add-tag-btn"
            onClick={(e) => {
              handleAddTag(e);
            }}>
            Add Tag
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default AddItemPageTags;
