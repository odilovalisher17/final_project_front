import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Homepage from "./Components/Homepage/Homepage";
import Login from "./Components/Login/Login";
import { useAuth } from "./helpers/AuthContext";
import PrivateRoute from "./helpers/PrivateRoute";
import ItemPage from "./Components/ItemPage/ItemPage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addLoggedUser } from "./Store/Reducers/LoggedUserReducer";
import CollectionPage from "./Components/CollectionPage/CollectionPage";
import MyCollections from "./Components/MyCollections/MyCollections";
import AddItemPage from "./Components/AddItemPage/AddItemPage";
import AddCollection from "./Components/AddCollection/AddCollection";
import Cookies from "js-cookie";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import UserPage from "./Components/UserPage/UserPage";
import RegisterPage from "./Components/RegisterPage/RegisterPage";

const App = () => {
  const dispatch = useDispatch();
  const { login } = useAuth();
  const token = Cookies.get("authToken");

  useEffect(() => {
    if (token) {
      const getLoggedUser = async () => {
        try {
          const data = await axios.get(
            `https://final-project-yb3m.onrender.com/api/v1/users/user?_id=${token}`
          );
          login();
          dispatch(addLoggedUser(data.data.user));
        } catch (error) {
          console.log(error);
        }
      };

      getLoggedUser();
    }
  }, [dispatch, login, token]);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<RegisterPage />} />
        <Route path={`/item/:id`} element={<ItemPage />} />
        <Route path={`/collection/:id`} element={<CollectionPage />} />
        <Route path={`/my-collections/user/:id`} element={<MyCollections />} />
        <Route path={`/user/:id`} element={<UserPage />} />
        {/* Logged only */}
        <Route
          path={`/add-item/collection/:id`}
          element={
            <PrivateRoute>
              <AddItemPage />
            </PrivateRoute>
          }
        />
        {/* Logged only */}
        <Route
          path={`/add-collection/user/:id`}
          element={
            <PrivateRoute>
              <AddCollection />
            </PrivateRoute>
          }
        />
        {/* Logged only */}
        <Route
          path={`/users`}
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
