import React from "react";
import "./CollectionPageProperties.css";
import Properties from "../Properties/Properties";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const CollectionPageProperties = ({ collection, setCollection, editMode }) => {
  const mode = useSelector((state) => state.modeChanger);

  return (
    <div className="collection-page-properties">
      <div className="collection-page-properties-header">
        Properties of Items
      </div>

      <div className="collection-page-properties-table">
        <Table
          striped
          bordered
          hover
          variant={mode === "dark" ? "dark" : "light"}>
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
