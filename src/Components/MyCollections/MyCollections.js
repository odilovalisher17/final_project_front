import React, { useState, useEffect } from "react";
import "./MyCollections.css";
import { Container } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import CollectionList from "./elements/CollectionList/CollectionList";
import Loading from "../Loading/Loading";

const MyCollections = () => {
  const { id } = useParams();
  const loggedUser = useSelector((state) => state.loggedUser);
  const mode = useSelector((state) => state.modeChanger);
  const [userOfCollection, setUserOfCollection] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await axios.get(
          `https://final-project-yb3m.onrender.com/api/v1/users/user?_id=${id}`
        );

        setUserOfCollection(data.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [id]);

  if (userOfCollection) {
    return (
      <div
        className={
          mode === "dark"
            ? "my-collections bg-dark-mode"
            : "my-collections bg-light-mode"
        }>
        <Container>
          <div
            className={
              mode === "dark"
                ? "my-collections-card bg-dark-card"
                : "my-collections-card bg-light-card"
            }>
            <div className="my-collections-header">
              {loggedUser._id === userOfCollection._id
                ? "My collections"
                : userOfCollection.firstName +
                  " " +
                  userOfCollection.lastName +
                  "'s collections"}
            </div>

            {((loggedUser && loggedUser._id === id) ||
              loggedUser.role === "admin") && (
              <div className="my-collections-add-col">
                <NavLink to={`/add-collection/user/${id}`}>
                  <button>Add a collection</button>
                </NavLink>
              </div>
            )}

            <div className="my-collections-collection-list">
              <CollectionList />
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div
        className={
          mode === "dark"
            ? "my-collections bg-dark-mode"
            : "my-collections bg-light-mode"
        }>
        <Container>
          <div
            className={
              mode === "dark"
                ? "my-collections-card bg-dark-card"
                : "my-collections-card bg-light-card"
            }>
            <Loading nums={1} height={"50px"} />

            <Loading nums={3} height={"150px"} />
          </div>
        </Container>
      </div>
    );
  }
};

export default MyCollections;
