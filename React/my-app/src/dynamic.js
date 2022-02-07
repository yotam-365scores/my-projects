import React, { useState } from "react";

import { 
  Container, Row, Col, 
  Label, 
  Form, FormGroup, Input, Button, 
} from "reactstrap";

import Select from "react-select";
import AsyncSelect from "react-select/async";


import {get} from "./apiHelper";

/*** Data Options, Component helpers ***/
export const filterFunc = (inputValue, arrOptions) => {
	return arrOptions.filter((option) =>
	  option.label.toLowerCase().includes(inputValue.toLowerCase())
	);
  };
  
  export const complexFilterFunc = (inputValue, arrMain) => {
	// complex type
	if (arrMain && arrMain[0] && arrMain[0].options) {
	  return arrMain.map((group) => {
		return { ...group, options: filterFunc(inputValue, group.options) };
	  });
	} 
	// simple type
	else {
	  return filterFunc(inputValue, arrMain);
	}
  };

  /*** Data Example ***/
// Simple Data
const optionsGroup = [
	{ label: "Tent", value: "Tent" },
	{ label: "Flashlight", value: "Flashlight" },
	{ label: "Toilet Paper", value: "Toilet Paper" },
	{ label: "Not available", value: "Not available", isDisabled: true },
  ];
  
  // Complex Data
  export const optionsGroups = [
	{
	  label: "Picnic",
	  options: [
		{ label: "Mustard", value: "Mustard" },
		{ label: "Ketchup", value: "Ketchup" },
		{ label: "Relish", value: "Relish" },
	  ],
	},
	{
	  label: "Camping",
	  options: optionsGroup,
	},
  ];
  
  
export const specificTypes = {
  hr: "hr",
  autocomplete: "autocomplete",
  multiselect: "multiselect",
  text: "text",
};

// single item MetaData example
export const itemMetaData_default = {
	name: "some n",
	label: "label",
	placeholder: "Type Something",
	type: "text",
	//validate: Object.assign({}, {...defaultValidate}),
	//validate: Object.assign({}, defaultValidate),
	//validate: {...defaultValidate},
	validate: {
	  required: { value: true, errorMessage: "required" },
	  email: { value: true },
	},
	// working better internally, inside validate object
	errorMessage: "Only Digits",
	defaultValue: undefined,
  
	// static data && api fallback, not to be empty.
	optionsGroups: [],
  
	// if not exist, go to optionsGroups
	getOptionsGroups: (inputValue, optionsGroups, resolve) => {},
  
	// if not exist, go to getOptionsGroups
	api: "/api/",
};
	
/*** Select ***/
const selectSection = (itemMetaData, state, setState) => (
	<>
		<Select
			classNamePrefix="select2-search-disable p-2"
			/* isLoading={isLoading} */
			name={itemMetaData.name}
			placeholder={itemMetaData.placeholder}
			value={state[itemMetaData.name]}
			isMulti={itemMetaData.type === specificTypes.multiselect ? true : false}
			onChange={(selected, changes) => {
				var newState = { ...state };
				newState[itemMetaData.name] = selected;
				setState(newState);
			}}
			options={itemMetaData.optionsGroups}
			/* errorMessage={itemMetaData.errorMessage}
						  validate={itemMetaData.validate} */
			{...{}}
		/>
	</>
);

// Empty Data
export const getOptionsArray = [
  {
    label: "Start Type to get options",
    value: -1,
    isDisabled: true,
  },
];

/*** Async Select ***/
/*** API helpers ***/
export const getAPIOptionsGroups = async (
	url = "api/test",
	inputValue,
	optionsGroups
  ) => {
	// todo: restruct(send params & map then) accourding to server api
	console.log(`get(${url}) (inputValue, optionsGroups)`, {
	  inputValue,
	  optionsGroups,
	});
	
	const response = await get(url).then((arrFromApi) => {
	  console.log(`get(${url}), then`, arrFromApi);
	  return complexFilterFunc(inputValue, arrFromApi.data);
	});
	return response;
  };
  
// wraper for AsyncSelect
const promiseOptions = (
	inputValue,
	itemMetaData = itemMetaData_default,
	selected = []
) => {
	console.log("promiseOptions", { inputValue, itemMetaData });

	/* const p = new Promise((resolve) => {
	  setTimeout(() => {
		console.log("promiseOptions setTimeout resolve");
		resolve(filterColors(inputValue));
	  }, 500);
	});
  
	return p; */

	const _promise = new Promise(async (resolve) => {
		if (itemMetaData.api) {
			console.log("itemMetaData.optionsGroups", itemMetaData.optionsGroups);
			resolve(getAPIOptionsGroups(itemMetaData.api, inputValue, itemMetaData.optionsGroups));
		} 

		// no func =>  return fallback
		else if (!itemMetaData.getOptionsGroups) {
			console.log("itemMetaData.optionsGroups", itemMetaData.optionsGroups);
			resolve(itemMetaData.optionsGroups || getOptionsArray);
		} 
		
		else {
			// resolve inside or return value to resolve
			console.log("itemMetaData.getOptionsGroups resolve");
			const returnValue = await itemMetaData.getOptionsGroups(
				inputValue,
				itemMetaData.optionsGroups,
				resolve
			);
			if (!!returnValue) {
				console.log("itemMetaData.getOptionsGroups returnValue", returnValue);
				resolve(returnValue);
			}
		}
	});

	return _promise;
};

const asyncSection = (itemMetaData, state, setState) => (
	<>
		<AsyncSelect
			// basic
			name={itemMetaData.name}
			placeholder={itemMetaData.placeholder}
			value={state[itemMetaData.name]}
			isMulti={itemMetaData.type === specificTypes.multiselect ? true : false}
			onChange={(selected, changes) => {
				var newState = { ...state };
				newState[itemMetaData.name] = selected;
				setState(newState);
			}}
			// Async
			cacheOptions
			defaultOptions={
				itemMetaData.optionsGroups
					? itemMetaData.optionsGroups
					: getOptionsArray
			}
			loadOptions={(inputValue) => {
				/* // todo: wrap with
				const callback_promiseOptions = useCallback(async () => {
					console.log("promiseOptions, useCallback ");
					props.getFormMetadata(baseURL);
				}, [props]); */

				return promiseOptions(
					inputValue,
					itemMetaData,
					state[itemMetaData.name]
				);
			}}
		/>
	</>
);


/*** Map To Html ***/

// map js item to corresponding html form item
const MapToHtml = (itemMetaData = itemMetaData_default, [state, setState], i) => {
	//console.log("toAvField", { itemMetaData, state, setState });

	/*** handle specific *Non HTML input* Types ***/
	if (itemMetaData.type === specificTypes.hr) {
		return <hr key={i} />;}

	/*** handle autocomplete && multiselect ***/
	else if ([specificTypes.autocomplete, specificTypes.multiselect]
		.includes(itemMetaData.type)) {

		const col = itemMetaData.col || { xs: 6 };

		return (
			<Col key={i} {...col} className="mb-3">
				<FormGroup>
					<Label htmlFor={itemMetaData.name} className="w-100">
						{itemMetaData.label}
						{itemMetaData.api || itemMetaData.getOptionsGroups
							? asyncSection(itemMetaData, state, setState)
							: selectSection(itemMetaData, state, setState)}
						{/* {selectSection} */}
						{/* {asyncSection} */}
					</Label>
				</FormGroup>
			</Col>
		);
	}
  
	/*** handle HTML input Types ***/
	else {
		const col = itemMetaData.col || { xs: 6 };
		return (
			<Col key={i} {...col} className="mb-3">
				<FormGroup>
					<Input
						value={state[itemMetaData.name]}
						onChange={(e) => {
							var newState = { ...state };
							newState[itemMetaData.name] = e.target.value;
							setState(newState);
						}}
						name={itemMetaData.name}
						label={itemMetaData.label}
						placeholder={itemMetaData.placeholder || itemMetaData.label}
						type={itemMetaData.type || "text"}
						/* errorMessage={itemMetaData.errorMessage}
						validate={itemMetaData.validate} */
					/>
				</FormGroup>

				<FormGroup floating>
      <Input
        id="exampleEmail"
        name="email"
        placeholder="Email"
        type="email"
      />
      <Label for="exampleEmail">
        Email
      </Label>
    </FormGroup>

			</Col>
		);
	}
};


const submitSection = (
	<Col className="d-flex flex-wrap gap-2">
		<Button type="submit" color="primary" className="">
			Submit
		</Button>{" "}
		<Button type="reset" color="secondary" className="">
			Cancel
		</Button>
	</Col>
);



/*** Main Component ***/
export const defaultProps = {
  initData: {}
}

const itemsMetaDataArray = [itemMetaData_default];

export const StringBuilder = (_props = defaultProps) => {
	const pageTitle = StringBuilder.name;
	const props = Object.assign(defaultProps, _props);  
	const {initData} = props;  
  const [formState, setFormState] = useState(initData || {});

  /* const avFieldList = (
    <AvForm
      onValidSubmit={(event, values) => {
        console.log("AvForm in onValidSubmit", {
          event,
          values,
          state: formState,
        });
        //onValidSubmit(event, values, formState);
      }}
    >
      <FormGroup>
        <Row>
          {itemsMetaDataArray.map((itemMetaData, index) =>
            MapToHtml(itemMetaData, [formState, setFormState], index)
          )}
        </Row>
        {submitSection}
      </FormGroup>
    </AvForm>
  ); */
  

  
  const reactstrapForm = (
	<Form inline>
		<Row>
          {itemsMetaDataArray.map((itemMetaData, index) =>
            MapToHtml(itemMetaData, [formState, setFormState], index)
          )}
        </Row>
        {submitSection}

    {/* <FormGroup floating>
      <Input
        id="exampleEmail"
        name="email"
        placeholder="Email"
        type="email"
      />
      <Label for="exampleEmail">
        Email
      </Label>
    </FormGroup>
    {' '}
    <FormGroup floating>
      <Input
        id="examplePassword"
        name="password"
        placeholder="Password"
        type="password"
      />
      <Label for="examplePassword">
        Password
      </Label>
    </FormGroup>
    {' '}
    <Button>
      Submit
    </Button> */}
  </Form>
  )

	return (
		<React.Fragment>
			<div className="page-content pt-3">
				<Container fluid>
					{/* <Breadcrumbs title={pageTitle} /> */}
					{reactstrapForm}
				</Container>
			</div>
		</React.Fragment>
	);
}


