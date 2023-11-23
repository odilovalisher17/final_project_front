import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Homepage from "./Components/Homepage/Homepage";
import Login from "./Components/Login/Login";
import ItemPage from "./Components/ItemPage/ItemPage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addLoggedUser } from "./Store/Reducers/LoggedUserReducer";
import CollectionPage from "./Components/CollectionPage/CollectionPage";
import MyCollections from "./Components/MyCollections/MyCollections";
import AddItemPage from "./Components/AddItemPage/AddItemPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let authToken = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("authToken="));

    // If the authToken cookie exists, the user is logged in

    if (authToken) {
      authToken = authToken.substring(10);
      const getLoggedUser = async () => {
        try {
          const data = await axios.get(
            `http://localhost:8080/api/v1/users/user?_id=${authToken}`
          );

          dispatch(addLoggedUser(data.data.user));
        } catch (error) {
          console.log(error);
        }
      };

      getLoggedUser();
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path={`/item/:id`} element={<ItemPage />} />
        <Route path={`/collection/:id`} element={<CollectionPage />} />
        <Route path={`/my-collections`} element={<MyCollections />} />
        <Route path={`/add-item/:id`} element={<AddItemPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
