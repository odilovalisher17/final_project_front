import React from "react";
import "./AddItemPage.css";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AddItemPageBody from "./elements/AddItemPageBody/AddItemPageBody";

const AddItemPage = () => {
  const { id } = useParams();

  return (
    <div className="add-item-page">
      <Container>
        <form className="add-item-page-form">
          <div className="add-item-page-header">Add Item Form</div>

          <AddItemPageBody id={id} />
        </form>
      </Container>
    </div>
  );
};

export default AddItemPage;
