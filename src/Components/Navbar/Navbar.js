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

const Navbar = () => {
  const dispatch = useDispatch();
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
                <ul>
                  <li>
                    <NavLink to={"/my-collections"}>My Collections</NavLink>
                  </li>
                  <li
                    onClick={() => {
                      document.cookie = `authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                      dispatch(removeLoggedUser());
                    }}>
                    Log Out
                  </li>
                </ul>
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
