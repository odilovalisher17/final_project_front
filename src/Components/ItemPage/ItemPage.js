import React, { useState, useEffect } from "react";
import "./ItemPage.css";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import Comments from "./elements/Comments/Comments";
import ItemPageBody from "./elements/ItemPageBody/ItemPageBody";
import ItemPageTags from "./elements/ItemPageTags/ItemPageTags";
import ItemPageFooter from "./elements/ItemPageFooter/ItemPageFooter";
import ItemPageHeader from "./elements/ItemPageHeader/ItemPageHeader";

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [isLike, setIsLike] = useState();
  const [comment, setComment] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [newItem, setNewItem] = useState({});
  const loggedUser = useSelector((state) => state.loggedUser);
  const darkMode = useSelector((state) => state.modeChanger);

  /* eslint-disable */
  useEffect(() => {
    const getItem = async () => {
      try {
        const data = await axios.get(
          `https://final-project-yb3m.onrender.com/api/v1/items/item/${id}`
        );
        //console.log(data);
        setItem(data.data.Item);
        setIsLike(data.data.Item.likes.includes(loggedUser._id));
        setNewItem({
          name: data.data.Item.name,
          properties: data.data.Item.properties,
          tags: data.data.Item.tags,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getItem();

    if (!editMode) {
      const intervalId = setInterval(getItem, 4000);
      return () => clearInterval(intervalId);
    }
  }, [isLike, editMode]);
  /* eslint-enable */

  const handleSubmitEdit = async () => {
    try {
      setEditMode(false);
      await axios.put(
        `https://final-project-yb3m.onrender.com/api/v1/items/item/${id}`,
        {
          name: newItem.name.trim(),
          tags: [
            ...newItem.tags.map((e) => e.trim()).filter((el) => el.length > 0),
          ],
          properties: JSON.parse(
            JSON.stringify(newItem.properties, (key, value) =>
              typeof value === "string" ? value.trim() : value
            )
          ),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://final-project-yb3m.onrender.com/api/v1/items/item/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (item) {
    return (
      <div className={darkMode === "dark" ? "bg-dark-mode" : "bg-light-mode"}>
        <Container>
          <div className="item-page">
            <div className="item-page-card">
              <ItemPageHeader
                editMode={editMode}
                setEditMode={setEditMode}
                newItem={newItem}
                setNewItem={setNewItem}
                item={item}
              />

              <ItemPageBody
                item={item}
                editMode={editMode}
                newItem={newItem}
                setNewItem={setNewItem}
              />

              <ItemPageTags
                newItem={newItem}
                setNewItem={setNewItem}
                editMode={editMode}
              />

              {!editMode && (
                <ItemPageFooter
                  isLike={isLike}
                  setIsLike={setIsLike}
                  item={item}
                  id={id}
                />
              )}

              {(loggedUser._id === item.author.id ||
                loggedUser.role === "admin") &&
                !editMode && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <button
                      onClick={() => setEditMode(true)}
                      style={{
                        width: "49%",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 0",
                        background: "rgb(143, 255, 143)",
                      }}>
                      Edit Item
                    </button>
                    <button
                      style={{
                        width: "49%",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 0",
                        background: "rgb(255, 139, 139)",
                      }}
                      onClick={() => {
                        const userConfirmed = window.confirm(
                          "Are you sure you want to delete this item?"
                        );

                        if (userConfirmed) {
                          handleDelete();
                        }
                      }}>
                      Delete Item
                    </button>
                  </div>
                )}

              {editMode && (
                <Row className="item-page-edit-mode-btns">
                  <Col xs={12} s={6} md={6} lg={6} xl={6}>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                  </Col>
                  <Col xs={12} s={6} md={6} lg={6} xl={6}>
                    <button onClick={() => handleSubmitEdit()}>Submit</button>
                  </Col>
                </Row>
              )}
            </div>

            {!editMode && (
              <Comments
                comment={comment}
                setComment={setComment}
                id={id}
                item={item}
              />
            )}
          </div>
        </Container>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ItemPage;
