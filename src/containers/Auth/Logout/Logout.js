import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../store/actions/index";
import { Redirect } from "react-router";
class Logout extends React.Component {
  componentDidMount() {
    this.props.logOut();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(actionCreator.logOut())
  };
};
export default connect(null, mapDispatchToProps)(Logout);
