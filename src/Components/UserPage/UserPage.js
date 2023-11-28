import React, { useState, useEffect } from "react";
import "./UserPage.css";
import { Col, Row } from "react-bootstrap";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addLoggedUser } from "../../Store/Reducers/LoggedUserReducer";
import axios from "axios";
import imgNotFount from "../Homepage/img/img-not-found2.jpg";
import Loading from "../Loading/Loading";

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.modeChanger);
  const loggedUser = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [totalCol, setTotalCol] = useState();
  const [editMode, setEditMode] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  /*eslint-disable*/
  useEffect(() => {
    getUser();
  }, []);
  /*eslint-enable*/

  const getUser = async () => {
    try {
      const data = await axios.get(
        `https://final-project-yb3m.onrender.com/api/v1/users/user?_id=${id}`
      );

      const dataTotalCol = await axios.get(
        `https://final-project-yb3m.onrender.com/api/v1/collections/getAllCollections?user_id=${id}`
      );

      setUser(data.data.user);
      setTotalCol(dataTotalCol.data.collections);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.disabled = true;

    try {
      await axios.put(
        `https://final-project-yb3m.onrender.com/api/v1/users/user/${id}`,
        user
      );

      getUser();
      setEditMode(false);
    } catch (error) {
      console.log(error);
    } finally {
      e.target.disabled = false;
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    e.target.disabled = true;

    try {
      const checkPass = await axios.get(
        `https://final-project-yb3m.onrender.com/api/v1/users/user?_id=${id}&password=${oldPass}`
      );

      if (checkPass) {
        await axios.put(
          `https://final-project-yb3m.onrender.com/api/v1/users/user/${id}`,
          { ...user, password: newPass }
        );

        window.location.reload();
      }
    } catch (error) {
      alert("Old password is wrong!");
      console.log(error);
    } finally {
      e.target.disabled = false;
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.target.disabled = true;

    try {
      await axios.delete(`http://localhost:8080/api/v1/users/user/${id}`);

      dispatch(addLoggedUser(""));
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      e.target.disabled = false;
    }
  };

  if (user) {
    return (
      <div
        className={
          mode === "dark" ? "user-page bg-dark-mode" : "user-page bg-light-mode"
        }>
        <div className="user-page-container">
          <div
            className={
              mode === "dark"
                ? "user-page-card bg-dark-card"
                : "user-page-card bg-light-card"
            }>
            <div className="user-page-header">
              {user.firstName + " " + user.lastName}
            </div>

            <div className="user-page-body">
              <div className="user-page-body-firstname">
                <Row>
                  <Col xs={12} s={4} md={4} lg={4} xl={4}>
                    <div>First Name : </div>
                  </Col>

                  <Col xs={12} s={8} md={8} lg={8} xl={8}>
                    <div>
                      {editMode ? (
                        <input
                          type="text"
                          placeholder="Enter firstname"
                          value={user.firstName}
                          onChange={(e) =>
                            setUser({ ...user, firstName: e.target.value })
                          }
                        />
                      ) : (
                        user.firstName
                      )}
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="user-page-body-lastname">
                <Row>
                  <Col xs={12} s={4} md={4} lg={4} xl={4}>
                    <div>Last Name : </div>
                  </Col>

                  <Col xs={12} s={8} md={8} lg={8} xl={8}>
                    <div>
                      {editMode ? (
                        <input
                          type="text"
                          placeholder="Enter lastname"
                          value={user.lastName}
                          onChange={(e) =>
                            setUser({ ...user, lastName: e.target.value })
                          }
                        />
                      ) : (
                        user.lastName
                      )}
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="user-page-body-email">
                <Row>
                  <Col xs={12} s={4} md={4} lg={4} xl={4}>
                    <div>Email : </div>
                  </Col>

                  <Col xs={12} s={8} md={8} lg={8} xl={8}>
                    <div>
                      {editMode ? (
                        <input
                          type="email"
                          placeholder="Enter email"
                          value={user.email}
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                        />
                      ) : (
                        user.email
                      )}
                    </div>
                  </Col>
                </Row>
              </div>

              {id === loggedUser._id && !editMode && (
                <div className="user-page-pass-change">
                  <div className="user-page-pass-change-header">
                    Change Your Password
                  </div>

                  <form>
                    <div className="user-page-old-pass">
                      <Row>
                        <Col xs={12} s={12} md={6} lg={6} xl={6}>
                          <div>Enter your password : </div>
                        </Col>

                        <Col xs={12} s={12} md={6} lg={6} xl={6}>
                          <div>
                            <input
                              type="password"
                              required
                              placeholder="old password"
                              value={oldPass}
                              onChange={(e) => setOldPass(e.target.value)}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="user-page-new-pass">
                      <Row>
                        <Col xs={12} s={12} md={6} lg={6} xl={6}>
                          <div>Enter new password : </div>
                        </Col>

                        <Col xs={12} s={12} md={6} lg={6} xl={6}>
                          <div>
                            <input
                              type="password"
                              required
                              placeholder="new password"
                              value={newPass}
                              onChange={(e) => setNewPass(e.target.value)}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <button
                      type="submit"
                      onClick={(e) => handleChangePassword(e)}>
                      Change Password
                    </button>
                  </form>
                </div>
              )}

              {!editMode && totalCol.length > 0 && (
                <div className="user-page-body-collection">
                  <div>Collections : </div>
                  <div className="user-page-body-one-collection">
                    <Row>
                      <Col xs={12} s={12} md={4} lg={4} xl={4}>
                        <img src={imgNotFount} alt="" />
                      </Col>

                      <Col xs={12} s={12} md={8} lg={8} xl={8}>
                        <div>Name : {totalCol[0].name}</div>
                        <div>Topic : {totalCol[0].topic}</div>
                        <div>Topic : {totalCol[0].description}</div>
                      </Col>
                    </Row>
                  </div>

                  <div>
                    <NavLink to={`/my-collections/user/${id}`}>
                      <button>See all collections</button>
                    </NavLink>
                  </div>
                </div>
              )}
            </div>

            {editMode && (
              <div className="user-page-footer">
                <button
                  onClick={() => {
                    setEditMode(false);
                    getUser();
                  }}>
                  Cancel
                </button>
                <button
                  style={{ background: "rgb(143, 255, 143)" }}
                  onClick={(e) => handleSubmit(e)}>
                  Submit
                </button>
              </div>
            )}

            {(user._id === loggedUser._id || loggedUser.role === "admin") &&
              !editMode && (
                <div className="user-page-footer">
                  <button onClick={() => setEditMode(true)}>Edit User</button>
                  <button
                    style={{ background: "rgb(255, 139, 139)" }}
                    onClick={(e) => handleDelete(e)}>
                    Delete User
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={
          mode === "dark" ? "user-page bg-dark-mode" : "user-page bg-light-mode"
        }>
        <div className="user-page-container">
          <div className="user-page-card bg-light-card">
            <div className="user-page-header">
              <Loading nums={1} height={"50px"} />
            </div>

            <div className="user-page-body">
              <Loading nums={1} height={"200px"} />
            </div>

            <div className="user-page-footer">
              <div style={{ width: "48%" }}>
                <Loading nums={1} height={"50px"} />
              </div>
              <div style={{ width: "48%" }}>
                <Loading nums={1} height={"50px"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default UserPage;
