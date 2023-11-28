import React from "react";
import "./Navbar.css";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "../../Store/Reducers/ModeChangerReducer";
import logo from "./img/logo.png";
import { NavLink } from "react-router-dom";
import { removeLoggedUser } from "../../Store/Reducers/LoggedUserReducer";
import { useAuth } from "../../helpers/AuthContext";

const Navbar = () => {
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const mode = useSelector((state) => state.modeChanger);
  const loggedUser = useSelector((state) => state.loggedUser);

  const handleMode = () => {
    let newMode = mode === "dark" ? "light" : "dark";
    dispatch(changeMode(newMode));
  };

  return (
    <div className="navbar">
      <Container>
        <div className="nav-logo">
          <NavLink to={"/"}>
            <img src={logo} alt="" />
            <div>My box</div>
          </NavLink>
        </div>

        <div className="nav-options">
          <div className="mode-changer">
            <button
              className="mode-changer-btn"
              // style={{
              //   animation: animationMode
              //     ? "nightModeAnimation .7s 1 ease-in"
              //     : "lightModeAnimation .7s 1 ease-in",
              // }}
              onClick={() => {
                handleMode();
              }}>
              <FontAwesomeIcon
                icon={mode === "dark" ? faSun : faMoon}
                color={mode === "dark" ? "#fff" : "#000"}
              />
            </button>
          </div>

          {loggedUser ? (
            <div className="nav-logged-user">
              <div>
                <span>{loggedUser.firstName + " " + loggedUser.lastName}</span>
                <FontAwesomeIcon
                  icon={faUser}
                  color={mode === "dark" ? "#fff" : "#000"}
                  fontSize="23px"
                />
              </div>

              <div className="nav-toggle">
                <NavLink to={`/user/${loggedUser._id}`}>
                  <div>My Account</div>
                </NavLink>

                <NavLink to={`/my-collections/user/${loggedUser._id}`}>
                  <div>My Collections</div>
                </NavLink>

                {loggedUser.role === "admin" && (
                  <NavLink to={"/users"}>
                    <div>All Users</div>
                  </NavLink>
                )}

                <div
                  className="nav-toggle-logout"
                  onClick={() => {
                    document.cookie = `authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                    dispatch(removeLoggedUser());
                    logout();
                  }}>
                  Log Out
                </div>
              </div>
            </div>
          ) : (
            <NavLink to={"/login"}>
              <Button className="bg-blue">Login</Button>
            </NavLink>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
