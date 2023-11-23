import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Items from "./elements/Items/Items";
import Collections from "./elements/Collections/Collections";
import TagsCloud from "./elements/TagsCloud/TagsCloud";

const Homepage = () => {
  const mode = useSelector((state) => state.modeChanger);
  const [screenWidth, setScreenWidth] = useState();

  const getScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    getScreenWidth();
    window.addEventListener("resize", getScreenWidth);

    return () => {
      window.removeEventListener("resize", getScreenWidth);
    };
  }, []);

  return (
    <div
      className={
        mode === "dark" ? "homepage bg-dark-mode" : "homepage bg-light-mode"
      }>
      {" "}
      <Container>
        <Row>
          {screenWidth > 768 ? (
            <Col xs={6} sm={6} md={3} lg={3}>
              <Collections />
            </Col>
          ) : (
            ""
          )}

          <Col xs={12} sm={12} md={7} lg={7}>
            <Items />
          </Col>

          {screenWidth > 768 ? (
            <Col xs={3} sm={3} md={2} lg={2}>
              <TagsCloud />
            </Col>
          ) : (
            ""
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Homepage;
