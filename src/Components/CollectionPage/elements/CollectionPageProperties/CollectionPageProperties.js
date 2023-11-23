import React from "react";
import "./CollectionPageProperties.css";
import Properties from "../Properties/Properties";
import { Table } from "react-bootstrap";

const CollectionPageProperties = ({ collection, setCollection, editMode }) => {
  return (
    <div className="collection-page-properties">
      <div className="collection-page-properties-header">
        Properties of Items
      </div>

      <div className="collection-page-properties-table">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>First </th>
              <th>Second </th>
              <th>Third</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {[
              { name: "Strings", shortName: "string" },
              { name: "Numbers", shortName: "int" },
              { name: "Checkboxes", shortName: "bool" },
              { name: "Dates", shortName: "date" },
              { name: "Texts", shortName: "text" },
            ].map((p, ind) => (
              <Properties
                key={ind}
                collection={collection}
                setCollection={setCollection}
                editMode={editMode}
                parametres={p}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CollectionPageProperties;
