import React from "react";

const Properties = ({ collection, setCollection, editMode, parametres }) => {
  return (
    <tr>
      <td>Names of {parametres.name} : </td>

      {[
        collection[`custom_${parametres.shortName}1`],
        collection[`custom_${parametres.shortName}2`],
        collection[`custom_${parametres.shortName}3`],
      ].map((el, ind) =>
        el !== undefined ? (
          <td xs={2} s={2} md={2} lg={2} xl={2} key={ind}>
            {editMode ? (
              <textarea
                style={{ width: "100%" }}
                type="text"
                value={collection[`custom_${parametres.shortName}${ind + 1}`]}
                onChange={(e) =>
                  setCollection({
                    ...collection,
                    [`custom_${parametres.shortName}${ind + 1}`]:
                      e.target.value,
                  })
                }
              />
            ) : (
              el
            )}
          </td>
        ) : (
          <td key={ind}></td>
        )
      )}

      {editMode ? (
        <td xs={3} s={3} md={3} lg={3} xl={3}>
          <button
            onClick={() => {
              if (collection[`custom_${parametres.shortName}1`] === undefined) {
                setCollection({
                  ...collection,
                  [`custom_${parametres.shortName}1`]: "",
                });
              } else if (
                collection[`custom_${parametres.shortName}2`] === undefined
              ) {
                setCollection({
                  ...collection,
                  [`custom_${parametres.shortName}2`]: "",
                });
              } else if (
                collection[`custom_${parametres.shortName}3`] === undefined
              ) {
                setCollection({
                  ...collection,
                  [`custom_${parametres.shortName}3`]: "",
                });
              }
            }}>
            Add {parametres.name}
          </button>
        </td>
      ) : (
        <td></td>
      )}
    </tr>
  );
};

export default Properties;
