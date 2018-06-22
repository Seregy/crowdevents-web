import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { getOauthToken, removeOauthToken } from "../utils/Oauth";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {}
    }
  }

  componentDidMount() {
    const token = getOauthToken();

    axios.get("http://127.0.0.1:8080/v0/persons/current", {
      headers: {
        "Authorization": "Bearer " + token.access_token
      }
    }).then(
      response => {
        this.setState({
          person: response.data,
        })
      }
    ).catch(error => {
      if (!error.response) {
        removeOauthToken();
      }
    })
  }

  render() {
    const person = this.state.person;

    return (
      <div>
        <h2>{person.name} {person.surname}</h2>
        <h3>{person.email}</h3>
      </div>
    );
  }
}

export default UserProfile;