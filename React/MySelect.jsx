import React, { useState } from "react";
import { Label } from "reactstrap";

import Select from "react-select";

const defaultOptionsGroup = [
  { label: "Mustard", value: "Mustard" },
  { label: "Ketchup", value: "Ketchup" },
  { label: "Relish", value: "Relish" },
];

const defaultOptionsGroups = [
  {
    label: "Picnic",
    options: Object.assign({}, defaultOptionsGroup),
  },
];

const defaultProps = {
  displayName: "waiting for data from server",
  propName: "data",
  optionsGroups: defaultOptionsGroups,
  defaultSelectedOptions: Object.assign({}, defaultOptionsGroup),
  onChange: (propName = "", selected = [], change = []) => {},
};

export const MySelect = (_props = defaultProps) => {
  const props = Object.assign(defaultProps, _props);

  const { optionsGroups } = props;

  const [selectedItems, setSelectedItems] = useState([]);

  const isLoading =
    !optionsGroups ||
    !optionsGroups[0] ||
    !optionsGroups[0].options ||
    !optionsGroups[0].options[0] ||
    optionsGroups[0].options[0].value === -1;

  return (
      <div className="mb-3 mt-3 mt-lg-0">
        <Label>{props.displayName}</Label>
        <Select
          isLoading={isLoading}
          placeholder={"Enter " + props.displayName}
          value={selectedItems}
          isMulti={true}
          onChange={(selected, change) => {
            if (selected && selected.length && selected.length > 0) {
              setSelectedItems(selected);
              props.onChange(props.propName, selected, change);
            } else {
              setSelectedItems(undefined);
              props.onChange(props.propName, undefined, change);
            }
            console.log("selectedMulti-" + props.displayName, {
              selected,
              change,
            });
          }}
          options={optionsGroups}
          classNamePrefix="select2-search-disable p-2"
        />
      </div>
  );
};

// todo: static map Func
//MySelect.mapFunc = undefined;
