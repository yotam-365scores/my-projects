// {name}, {func}, {data}, {fromState}
import React from "react";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";


import { Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";

//import { {func} } from "../../store/{name}/actions";

//import { initialState } from "../../store/{name}/model";
const initialState =  {
  //{fromState}
};

const actionsObj = { 
  //{func} 
};


const defaultProps = {
  //{data}
};

const CapitalizeFunc = (_props = defaultProps) => {
  const pageTitle = CapitalizeFunc.name;
  const props = Object.assign(defaultProps, actionsObj, initialState, _props);
  //const props = Object.assign(defaultProps, actionsObj, _props);

  //const { {func}, {data}, {fromState} } = props;

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={pageTitle} />
          <div className="d-lg-flex mb-4 align-items-stretch">
            
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

CapitalizeFunc.propTypes = {
  //{data}: PropTypes.object
  //{func}: PropTypes.func
};

const mapStateToProps = (state) => ({
  //{fromState}: state.{fromState},
});

export default withRouter(connect(mapStateToProps, actionsObj)(CapitalizeFunc));
