import React, { useState } from "react";

export default function (valueKey = "value", multiple = true) {
  const [selected, setSelected] = useState([]);

  const addOrRemove = (option) => {
    setSelected((currentlySelected) => {
      if (!multiple) {
        return [option];
      } else {
        if (
          !currentlySelected.some(
            (current) => current[valueKey] === option[valueKey]
          )
        ) {
          return [option].concat(currentlySelected);
        } else {
          let selectionAfterRemoval = currentlySelected;
          selectionAfterRemoval = selectionAfterRemoval.filter(
            (current) => current[valueKey] !== option[valueKey]
          );
          return [...selectionAfterRemoval];
        }
      }
    });
  };

  return {
    selected,
    setSelected,
    addOrRemove,
  };
}
