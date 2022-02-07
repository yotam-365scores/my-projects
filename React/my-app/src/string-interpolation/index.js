import React, { useState, Fragment } from "react";
import { GetInput, GetTextarea, GetButton } from "../components";
import { flexRowClasses, JSONPrettyCircular } from "../presets";
import { arrTemplates, baseDataArr } from "./data";
import _ from "lodash";
import JSONPretty from "react-json-pretty";

const Interpolator = require("string-interpolation");

// This isn't needed, unless you need to change your interpolation brackets to something else
const options = {
  delimiter: ["{", "}"],
};

const interpolator = new Interpolator(options);

const Interpolate = (template, obj = {}) => {
  const baseData = baseDataArr.reduce((previousValue, currentValue) => {
    return _.set(previousValue, currentValue.name, currentValue.value);
  }, {});

  const assignData = Object.assign({}, baseData, obj);
  console.log("interpolate, template: ", { template, baseData, assignData });
  return interpolator.parse(template, assignData);
};

const arrAliases = [
  {
    key: "firstName",
    ref: "user.name",
  },
  /* {
    key: 'lastName',
    ref: 'name.last'
},
{
    key: 'city',
    ref: 'locations[0]'
},
{
    key: 'state',
    ref: 'locations[1]'
} */
];
//arrAliases.forEach((alias) => interpolator.addAlias(alias.key, alias.ref));

function simple() {
  const replaceThis = `{user.name}: Welcome back, {username}!`;
  const data = {
    username: "Dan",
    user: { name: "some dan" },
  };
  const result = interpolator.parse(replaceThis, data);
  console.log("interpolator", interpolator);
  // Welcome back, Dan!
  return result;
}

/*** Main Component ***/
export const defaultProps = {
  //initData: {}
};

export const StringInterpolation = (_props = defaultProps) => {
  const pageTitle = StringInterpolation.name;
  //const props = Object.assign(defaultProps, _props);
  const [dataTemplates, setDataTemplates] = useState(arrTemplates);
  const [dataProps, setDataProps] = useState(baseDataArr);
  const [dataAliases, setDataAliases] = useState(arrAliases);

    /* data Templates */
    const DataTemplatesMap = (item, key) => {
    const textareaTemplate = GetTextarea({
      initialState: item.template,
      onChange: (val) => {
        item.template = val;
      },
    });

    const btnIsEdit = GetButton({
      initialState: false,
      text: "show/hide",
      onClick: (val) => {},
    });

    return (
      <Fragment key={key}>
        <div className="card rounded-3 text-white bg-secondary flex-grow-1">
          <div className="card-header py-3">
            <h4 className="my-0">{item.title}</h4>
          </div>
          <div className="card-body">
            <div>
              {/* todo: change to component */}
              <textarea disabled={true} value={Interpolate(item.template)} cols="50" ></textarea>
              <div className="ms-auto">{btnIsEdit.html}</div>
            </div>
            {btnIsEdit.value ? (
              <div className="row">{textareaTemplate.html}</div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Fragment>
    );
  }
  /* data Templates */
  const dataTemplatesSection = (
    <Fragment>
      <div className={flexRowClasses + " mb-4"}>
        {dataTemplates.map(DataTemplatesMap)}

        <Fragment key={dataProps.length}>
          <div
            onClick={() => {
              setDataTemplates([
                ...dataTemplates,
                { title: "new title", template: "" },
              ]);
            }}
            className="card rounded-3 text-white bg-secondary my-auto p-2 mx-2"
          >
            +
          </div>
        </Fragment>
      </div>
    </Fragment>
  );

  /* data Props */
  const dataPropsSection = (
    <Fragment>
      <div className={flexRowClasses + " mb-4"}>
        {dataProps.map((item, key) => {
          // input section
          const inputName = GetInput({
            initialState: item.name,
            onChange: (val) => {
              item.name = val;
            },
          });
          const inputValue = GetInput({
            initialState: item.value,
            onChange: (val) => {
              item.value = val;
            },
          });

          return (
            <Fragment key={key}>
              <div className="card rounded-3 text-white bg-secondary">
                <div className="card-header py-3">
                  <h4 className="my-0">{inputName.html}</h4>
                </div>
                <div className="card-body">{inputValue.html}</div>
              </div>
            </Fragment>
          );
        })}

        <Fragment key={dataProps.length}>
          <div
            onClick={() => {
              setDataProps([...dataProps, { name: "", value: "" }]);
            }}
            className="card rounded-3 text-white bg-secondary my-auto p-2 mx-2"
          >
            +
          </div>
        </Fragment>
      </div>
    </Fragment>
  );

  /* data Print */
  const btnIsShowTemplates = GetButton({
    initialState: false,
    text: "show/hide Templates",
  });

  const JSONPrettyTemplates = (
    <JSONPretty {...JSONPrettyCircular(dataTemplates)}></JSONPretty>
  );

  const btnIsShowData = GetButton({
    initialState: false,
    text: "show/hide Data",
  });

  const JSONPrettyData = (
    <JSONPretty {...JSONPrettyCircular(dataProps)}></JSONPretty>
  );

  const dataPrintSection = (
    <Fragment>
      <div className={flexRowClasses + " mb-4"}>
        {btnIsShowTemplates.html}
        {btnIsShowData.html}
      </div>
      <div className={flexRowClasses + " mb-4"}>
        {btnIsShowTemplates.value ? <div class="mx-2">Templates: {JSONPrettyTemplates}</div> : ""}
        {btnIsShowData.value ? <div class="mx-2">Properties: {JSONPrettyData}</div> : ""}
      </div>
    </Fragment>
  );

  /* todo?: data Aliases */
  const dataAliasesSection = (
    <Fragment>
      <div className={flexRowClasses}>
        {dataAliases.map((item, key) => {
          // input section
          const inputKey = GetInput({ initialState: item.key });
          const inputRef = GetInput({ initialState: item.ref });

          return (
            <Fragment key={key}>
              <div className="card mb-4 rounded-3 text-white bg-secondary">
                <div className="card-header py-3">
                  <h4 className="my-0">{inputKey.html}</h4>
                </div>
                <div className="card-body">{inputRef.html}</div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );

  return (
    <React.Fragment>
      <h4>Properties Section</h4>
      {dataPropsSection}
      <hr />
      <h4>Templates Section</h4>
      {dataTemplatesSection}
      <hr />
      <h4>Print Section</h4>
      {dataPrintSection}
    </React.Fragment>
  );
};
