import React, { useState, useEffect } from "react";
import "./AddItemPage.css";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import AddItemPageBody from "./elements/AddItemPageBody/AddItemPageBody";
import ImgNotFound from "../Homepage/img/img-not-found2.jpg";
import AddItemPageProperties from "./elements/AddItemPageProperties/AddItemPageProperties";
import AddItemPageTags from "./elements/AddItemPageTags/AddItemPageTags";

const AddItemPage = () => {
  const { id } = useParams();
  const loggedUser = useSelector((state) => state.loggedUser);
  const mode = useSelector((state) => state.modeChanger);
  const [collectionOfItem, setCollectionOfITem] = useState();
  const [properties, setProperties] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    properties: {},
    tags: [],
  });

  useEffect(() => {
    const getProp = async () => {
      try {
        const data = await axios.get(
          `https://final-project-yb3m.onrender.com/api/v1/collections/collection/${id}`
        );
        setCollectionOfITem(data.data.collectionn);

        let newProperties = [];
        const propObj = {};
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

            if (key.substring(7, key.length - 1) === "bool") {
              propObj[data.data.collectionn[key]] = false;
            } else if (key.substring(7, key.length - 1) === "int") {
              propObj[data.data.collectionn[key]] = "";
            } else {
              propObj[data.data.collectionn[key]] = undefined;
            }
          }
        }

        setProperties(newProperties);
        setNewItem((c) => {
          return {
            ...c,
            properties: propObj,
          };
        });
      } catch (error) {
        console.log(error);
      }
    };

    getProp();
  }, [id]);

  const handleSubmitBtn = (e) => {
    const allProps = {};

    for (let key in newItem.properties) {
      if (typeof newItem.properties[key] === "string") {
        allProps[key] = newItem.properties[key].trim();
      } else {
        allProps[key] = newItem.properties[key];
      }
    }

    const readyItem = {
      author: {
        id: loggedUser._id,
      },
      collection: {
        id: id,
      },
      created_time: Date.now(),
      likes: [],
      comments: [],
      image_url: "",
      name: newItem.name.trim(),
      tags: [...newItem.tags.filter((t) => t.length > 0)],
      properties: {
        ...allProps,
      },
    };

    if (
      readyItem.name.trim().length === 0 ||
      !Object.entries(readyItem.properties).reduce((total, cval) => {
        if (typeof cval[1] !== "boolean") {
          return total * Boolean(cval[1]);
        } else {
          return total * true;
        }
      }, true)
    ) {
      alert("Please fill all the required fields");
    } else if (readyItem.tags.length === 0) {
      alert("Please add at least one tag");
    } else {
      sendItem(readyItem, e);
    }
  };

  const sendItem = async (item, e) => {
    e.target.disabled = true;
    try {
      await axios.post(
        "https://final-project-yb3m.onrender.com/api/v1/items/addItem",
        item
      );
    } catch (error) {
      console.log(error);
    } finally {
      e.target.disabled = false;
      window.location.reload();
    }
  };

  return (
    <div
      className={
        mode === "dark"
          ? "add-item-page bg-dark-mode"
          : "add-item-page bg-light-mode"
      }>
      <Container>
        <form
          className={
            mode === "dark"
              ? "add-item-page-form bg-dark-card"
              : "add-item-page-form bg-light-card"
          }>
          <div className="add-item-page-header">Add Item Form</div>

          <Row>
            <Col xs={12} s={12} md={4} lg={4} xl={4}>
              <div className="add-item-page-add-img">
                <img src={ImgNotFound} alt="" />
              </div>
            </Col>

            <Col xs={12} s={12} md={8} lg={8} xl={8}>
              <AddItemPageBody
                newItem={newItem}
                setNewItem={setNewItem}
                collectionOfItem={collectionOfItem}
                properties={properties}
              />

              <AddItemPageProperties
                collectionOfItem={collectionOfItem}
                newItem={newItem}
                setNewItem={setNewItem}
                properties={properties}
              />
            </Col>

            <Col xs={12} s={12} md={12} lg={12} xl={12}>
              <AddItemPageTags newItem={newItem} setNewItem={setNewItem} />
            </Col>
          </Row>

          <div className="add-item-page-submit-btn">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmitBtn(e);
              }}>
              Submit
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default AddItemPage;
