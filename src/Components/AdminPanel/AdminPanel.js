import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import { useSelector, useDispatch } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { addLoggedUser } from "../../Store/Reducers/LoggedUserReducer";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  const mode = useSelector((state) => state.modeChanger);
  const [users, setUsers] = useState();
  const [pageInfo, setPageInfo] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(0);

  /*eslint-disable*/
  useEffect(() => {
    handleSearch("1");
  }, [searchTerm]);
  /*eslint-enable*/

  const handleAdmin = async (e, user, role) => {
    e.preventDefault();
    e.target.disabled = true;

    try {
      const newUser = await axios.put(
        `https://final-project-yb3m.onrender.com/api/v1/users/user/${user._id}`,
        {
          role: role,
        }
      );
      handleSearch(pageInfo.currentPage);

      if (user._id === loggedUser._id && role === "user") {
        dispatch(addLoggedUser(newUser.data.user));
      }
    } catch (error) {
      console.log(error);
    } finally {
      e.target.disabled = false;
    }
  };

  const handleStatus = async (e, user, status) => {
    e.preventDefault();
    e.target.disabled = true;

    try {
      const newUser = await axios.put(
        `https://final-project-yb3m.onrender.com/api/v1/users/user/${user._id}`,
        {
          status: status,
        }
      );
      handleSearch(pageInfo.currentPage);

      if (user._id === loggedUser._id && status === "blocked") {
        dispatch(addLoggedUser(newUser.data.user));
      }
    } catch (error) {
      console.log(error);
    } finally {
      e.target.disabled = false;
    }
  };

  const handleDelete = async (e, user) => {
    e.preventDefault();
    e.target.disabled = true;

    try {
      await axios.delete(`http://localhost:8080/api/v1/users/user/${user._id}`);
      handleSearch("1");

      if (user._id === loggedUser._id) {
        dispatch(addLoggedUser(""));
      }
    } catch (error) {
      console.log(error);
    } finally {
      e.target.disabled = false;
    }
  };

  const handleSearch = (page) => {
    // Clear previous timeout
    clearTimeout(typingTimeout);

    // Set a new timeout
    const timeoutId = setTimeout(async () => {
      try {
        const data = await axios.get(
          `https://final-project-yb3m.onrender.com/api/v1/users/searchUser?text=${searchTerm}&page=${page}`
        );

        setUsers(data.data.user);
        setPageInfo(data.data.pageInfo);
      } catch (error) {
        console.log(error);
        setUsers([]);
      }
    }, 500);

    // Save the timeout ID
    setTypingTimeout(timeoutId);
  };

  if (loggedUser.role === "admin" && loggedUser.status !== "blocked" && users) {
    return (
      <div
        className={
          mode === "dark"
            ? "admin-panel bg-dark-mode"
            : "admin-panel bg-light-mode"
        }>
        <Container>
          <div
            className={
              mode === "dark"
                ? "admin-panel-card bg-dark-card"
                : "admin-panel-card bg-light-card"
            }>
            <div className="admin-panel-header">All Users</div>

            <div className="admin-panel-search">
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={() => handleSearch()}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>

            <div className="admin-panel-table">
              {users.length === 0 && <div>Could not find users.</div>}
              {users.map((el, ind) => (
                <div className="admin-panel-one-user" key={ind}>
                  <Row>
                    <Col xs={12} s={8} md={8} lg={8} xl={8}>
                      <div className="one-user-name">
                        <div>Name : </div>
                        <div>{el.firstName + " " + el.lastName}</div>
                      </div>

                      <div className="one-user-email">
                        <div>Email : </div>
                        <div>{el.email}</div>
                      </div>

                      <div className="one-user-status">
                        <div>Status : </div>
                        <div>{el.status}</div>
                      </div>

                      <div className="one-user-role">
                        <div>Role : </div>
                        <div>{el.role}</div>
                      </div>
                    </Col>

                    <Col xs={12} s={4} md={4} lg={4} xl={4}>
                      <div className="admin-panel-one-user-btns">
                        <NavLink to={`/user/${el._id}`}>
                          <button>Edit User</button>
                        </NavLink>

                        <button
                          onClick={(e) =>
                            handleAdmin(
                              e,
                              el,
                              el.role === "user" ? "admin" : "user"
                            )
                          }>
                          {el.role === "user" ? "Make Admin" : "Disable Admin"}
                        </button>

                        <button
                          onClick={(e) =>
                            handleStatus(
                              e,
                              el,
                              el.status === "active" ? "blocked" : "active"
                            )
                          }>
                          {el.status === "active"
                            ? "Block User"
                            : "Unblock User"}
                        </button>

                        <button
                          style={{ background: "rgb(255, 139, 139)" }}
                          onClick={(e) => handleDelete(e, el)}>
                          Delete User
                        </button>
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>

            <div className="admin-panel-pagination">
              <div
                className={
                  pageInfo.currentPage === 1
                    ? "admin-panel-one-page admin-panel-current-page"
                    : "admin-panel-one-page"
                }
                onClick={() => {
                  if (pageInfo.currentPage > 1) {
                    handleSearch(pageInfo.currentPage - 1);
                  } else {
                    handleSearch(1);
                  }
                }}>
                {pageInfo.currentPage > 2 ? "..." : "1"}
              </div>

              {pageInfo.currentPage <= pageInfo.totalPages &&
                pageInfo.totalPages > 1 && (
                  <div
                    className={
                      pageInfo.currentPage >= 2
                        ? "admin-panel-one-page admin-panel-current-page"
                        : "admin-panel-one-page"
                    }
                    onClick={() => {
                      if (pageInfo.currentPage < 2) {
                        handleSearch(2);
                      }
                    }}>
                    {pageInfo.currentPage > 2 ? pageInfo.currentPage : "2"}
                  </div>
                )}

              {pageInfo.currentPage < pageInfo.totalPages && (
                <div
                  className="admin-panel-one-page"
                  onClick={() => handleSearch(pageInfo.currentPage + 1)}>
                  ...
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    return <div>404 Not Found</div>;
  }
};

export default AdminPanel;
