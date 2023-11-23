import React from "react";
import "./CollectionPageBody.css";
import { Row, Col } from "react-bootstrap";
import ImgNotFound from "../../../Homepage/img/img-not-found2.jpg";

const CollectionPageBody = ({ collection, setCollection, editMode, total }) => {
  return (
    <div className="collection-page-body">
      <Row>
        <Col xs={12} s={4} m={4} lg={4} xl={4}>
          <div className="collection-page-body-img">
            <img
              src={collection.image_url ? collection.image_url : ImgNotFound}
              alt=""
            />
          </div>
        </Col>

        <Col xs={12} s={8} m={8} lg={8} xl={8}>
          <div>
            <div className="collection-page-body-author">
              Author :{" "}
              {collection.author.firstName + " " + collection.author.lastName}
            </div>
            <div className="collection-page-body-topic">
              Topic :{" "}
              {editMode ? (
                <input
                  type="text"
                  value={collection.topic}
                  onChange={(e) =>
                    setCollection({
                      ...collection,
                      topic: e.target.value,
                    })
                  }
                />
              ) : (
                collection.topic
              )}
            </div>
            <div className="collection-page-body-description">
              Description :{" "}
              {editMode ? (
                <textarea
                  style={{ width: "100%" }}
                  type="text"
                  value={collection.description}
                  onChange={(e) =>
                    setCollection({
                      ...collection,
                      description: e.target.value,
                    })
                  }
                />
              ) : (
                collection.description
              )}
            </div>

            <div className="collection-page-body-total">
              Total Number of Items : {total}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CollectionPageBody;
