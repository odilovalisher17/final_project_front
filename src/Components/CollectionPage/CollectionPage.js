import React, { useState, useEffect } from "react";
import "./CollectionPage.css";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import CollectionPageHeader from "./elements/CollectionPageHeader/CollectionPageHeader";
import CollectionPageBody from "./elements/CollectionPageBody/CollectionPageBody";
import CollectionPageProperties from "./elements/CollectionPageProperties/CollectionPageProperties";
import CollectionPageItems from "./elements/CollectionPageItems/CollectionPageItems";
import Loading from "../Loading/Loading";

const CollectionPage = () => {
  const { id } = useParams();
  const loggedUser = useSelector((state) => state.loggedUser);
  const mode = useSelector((state) => state.modeChanger);
  const [collection, setCollection] = useState();
  const [editMode, setEditMode] = useState(false);
  const [allItemsOfCol, setAllItemsOfCol] = useState();

  useEffect(() => {
    const getCollection = async () => {
      try {
        const getData = await axios.get(
          `https://final-project-yb3m.onrender.com/api/v1/collections/collection/${id}`
        );

        setCollection(getData.data.collectionn);
      } catch (error) {
        console.log(error);
      }
    };

    const getItems = async () => {
      try {
        const items = await axios.get(
          `https://final-project-yb3m.onrender.com/api/v1/items/getAllItems?collection_id=${id}`
        );

        setAllItemsOfCol(items.data.items);
      } catch (error) {
        console.log(error);
      }
    };

    getCollection();
    getItems();

    if (!editMode) {
      const itemInterval = setInterval(getItems, 4000);
      const reloadCol = setInterval(getCollection, 4000);
      return () => {
        clearInterval(reloadCol);
        clearInterval(itemInterval);
      };
    }
  }, [editMode, id]);

  const removeEmptyStrings = (obj) => {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (typeof value === "string") {
        const trimmedValue = value.trim();
        if (trimmedValue !== "") {
          newObj[key] = trimmedValue;
        }
      } else {
        newObj[key] = value; // Non-string values are included as is
      }
    });
    return newObj;
  };

  const handleSubmit = async () => {
    try {
      const newCollection = removeEmptyStrings(collection);

      await axios.put(
        `https://final-project-yb3m.onrender.com/api/v1/collections/collection/${id}`,
        newCollection
      );
    } catch (error) {
      console.log(error);
    }
    setEditMode(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://final-project-yb3m.onrender.com/api/v1/collections/collection/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (collection && allItemsOfCol) {
    return (
      <div
        className={
          mode === "dark"
            ? "collection-page bg-dark-mode"
            : "collection-page bg-light-mode"
        }>
        <Container>
          <div
            className={
              mode === "dark"
                ? "collection-page-card bg-dark-card"
                : "collection-page-card bg-light-card"
            }>
            <CollectionPageHeader
              editMode={editMode}
              setEditMode={setEditMode}
              collection={collection}
              setCollection={setCollection}
            />

            <CollectionPageBody
              collection={collection}
              setCollection={setCollection}
              editMode={editMode}
              total={allItemsOfCol.length}
            />

            <CollectionPageProperties
              collection={collection}
              setCollection={setCollection}
              editMode={editMode}
            />

            {editMode && (
              <div className="collection-page-edit-mode-btns">
                <div>
                  <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
                <div>
                  <button onClick={() => handleSubmit()}>Submit</button>
                </div>
              </div>
            )}

            {(loggedUser._id === collection.author.id ||
              loggedUser.role === "admin") &&
              !editMode && (
                <div className="collection-page-update-btns">
                  <button onClick={() => setEditMode(true)}>
                    <FontAwesomeIcon
                      icon={faPencil}
                      fontSize={"20px"}
                      color="green"
                    />
                    <span>Edit Collection</span>
                  </button>

                  <button
                    onClick={() => {
                      const userConfirmed = window.confirm(
                        "Are you sure you want to delete this item?"
                      );

                      if (userConfirmed) {
                        handleDelete();
                      }
                    }}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      fontSize={"20px"}
                      color="red"
                    />
                    <span>Delete Collection</span>
                  </button>
                </div>
              )}
          </div>

          {editMode ? (
            ""
          ) : (
            <CollectionPageItems
              allItemsOfCol={allItemsOfCol}
              id={id}
              editMode={editMode}
              collection={collection}
            />
          )}
        </Container>
      </div>
    );
  } else {
    return (
      <div
        className={
          mode === "dark"
            ? "collection-page bg-dark-mode"
            : "collection-page bg-light-mode"
        }>
        <Container>
          <div
            className={
              mode === "dark"
                ? "collection-page-card bg-dark-card"
                : "collection-page-card bg-light-card"
            }>
            <Loading nums={1} height="50px" />
            <Loading nums={3} height="100px" />
          </div>
        </Container>
      </div>
    );
  }
};

export default CollectionPage;
