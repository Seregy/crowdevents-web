import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { removeOauthToken } from "../utils/Oauth";

class Logout extends Component {
  componentWillMount() {
    removeOauthToken();
    this.props.history.push("/")
  }

  render() {
    return null;
  }
}

export default withRouter(Logout);