import React from "react";
import "./AddCollectionProperties.css";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const AddCollectionPropeties = ({ newCol, setNewCol }) => {
  const mode = useSelector((state) => state.modeChanger);

  const handleTable = (el, ind, val) => {
    return (
      <td key={ind}>
        {el !== undefined ? (
          <input
            type="text"
            value={newCol[`custom_${val}${ind + 1}`]}
            onChange={(e) =>
              setNewCol({
                ...newCol,
                [`custom_${val}${ind + 1}`]: e.target.value,
              })
            }
          />
        ) : (
          ""
        )}
      </td>
    );
  };

  const handleAddButton = (value) => {
    if (newCol[`custom_${value}1`] === undefined) {
      setNewCol({
        ...newCol,
        [`custom_${value}1`]: "",
      });
    } else if (newCol[`custom_${value}2`] === undefined) {
      setNewCol({
        ...newCol,
        [`custom_${value}2`]: "",
      });
    } else if (newCol[`custom_${value}3`] === undefined) {
      setNewCol({
        ...newCol,
        [`custom_${value}3`]: "",
      });
    }
  };

  return (
    <div className="add-collection-properties">
      <div className="add-collection-prop-header">Properties of Items</div>

      <div className="add-collection-prop-table">
        <Table
          striped
          bordered
          hover
          variant={mode === "dark" ? "dark" : "light"}>
          <thead>
            <tr>
              <th>#</th>
              <th>First</th>
              <th>Second</th>
              <th>Third</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Names of Strings</td>
              {[
                newCol[`custom_string1`],
                newCol[`custom_string2`],
                newCol[`custom_string3`],
              ].map((el, ind) => handleTable(el, ind, "string"))}

              <td>
                <button onClick={() => handleAddButton("string")}>
                  Add String
                </button>
              </td>
            </tr>

            <tr>
              <td>Names of Numbers</td>
              {[
                newCol[`custom_int1`],
                newCol[`custom_int2`],
                newCol[`custom_int3`],
              ].map((el, ind) => handleTable(el, ind, "int"))}

              <td>
                <button onClick={() => handleAddButton("int")}>
                  Add Number
                </button>
              </td>
            </tr>

            <tr>
              <td>Names of Checkboxes</td>
              {[
                newCol[`custom_bool1`],
                newCol[`custom_bool2`],
                newCol[`custom_bool3`],
              ].map((el, ind) => handleTable(el, ind, "bool"))}

              <td>
                <button onClick={() => handleAddButton("bool")}>
                  Add Checkbox
                </button>
              </td>
            </tr>

            <tr>
              <td>Names of Dates</td>
              {[
                newCol[`custom_date1`],
                newCol[`custom_date2`],
                newCol[`custom_date3`],
              ].map((el, ind) => handleTable(el, ind, "date"))}

              <td>
                <button onClick={() => handleAddButton("date")}>
                  Add Date
                </button>
              </td>
            </tr>

            <tr>
              <td>Names of Texts</td>
              {[
                newCol[`custom_text1`],
                newCol[`custom_text2`],
                newCol[`custom_text3`],
              ].map((el, ind) => handleTable(el, ind, "text"))}

              <td>
                <button onClick={() => handleAddButton("text")}>
                  Add Text
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AddCollectionPropeties;
