import React, { useState, Fragment } from "react";
import { GetInput } from "./components";
import { flexRowClasses } from "./presets";
const Interpolator = require("string-interpolation");

const options = {
  delimiter: ["{", "}"],
};

const interpolator = new Interpolator(options);

const baseData = {
  username: "Dan",
  user: { name: "some dan" },
};

const interpolate = (template, obj = {}) => {
  const assignData = Object.assign({}, baseData, obj);
  console.log("interpolate, template: ", { template, baseData, assignData });
  return interpolator.parse(template, assignData);
};

const defaultItem = {
  template: "{user.name}: Welcome back, {username}!",
  title: "long",
};

const arrTemplates = [
  defaultItem,
  { template: "{username}: hi {firstName}", title: "mini" },
];

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

arrAliases.forEach((alias) => interpolator.addAlias(alias.key, alias.ref));

function test2() {
  // This isn't needed, unless you need to change your interpolation brackets to something else

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
  const [dataAliases, setDataAliases] = useState(arrAliases);

  /* data Templates */
  const dataTemplatesSection = (
    <Fragment>
      <div className={flexRowClasses}>
        {dataTemplates.map((item) => (
          <div class="card mb-4 rounded-3 text-white bg-secondary">
            <div class="card-header py-3">
              <h4 class="my-0">{item.title}</h4>
            </div>
            <div class="card-body">{interpolate(item.template)}</div>
          </div>
        ))}
      </div>
    </Fragment>
  );

  /* data Aliases */
  const dataAliasesSection = (
    <Fragment>
      <div className={flexRowClasses}>
        {dataAliases.map((item) => {
          // input section
          const inputKey = GetInput({ text: item.key });
          const inputRef = GetInput({ text: item.ref });

          return (
            <div class="card mb-4 rounded-3 text-white bg-secondary">
              <div class="card-header py-3">
                <h4 class="my-0">{inputKey.html}</h4>
              </div>
              <div class="card-body">{inputRef.html}</div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );

  return (
    <React.Fragment>
      {dataAliasesSection}
      <hr />
      {dataTemplatesSection}
    </React.Fragment>
  );
};
