import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { getNewAccessToken } from "../utils/Auth";
import { injectIntl, FormattedMessage } from 'react-intl';

import "../css/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.intl = props.intl;
    this.handleLogin = this.handleLogin.bind(this);
  }

  render() {
    return (
      <div className="login-block border">
        <LoginForm submitHandler={this.handleLogin} intl={this.intl} />
        <hr />
        <div className="signup">
          <FormattedMessage
            id="app.signup.newToSite"
            defaultMessage="New to MeetIn?"
          />
          {" "}
          <Link to="/register">
            <FormattedMessage
              id="app.signup.signupWithExclamation"
              defaultMessage="Sign up!"
            />
          </Link>
        </div>
      </div>
    );
  }

  handleLogin(event) {
    event.preventDefault();
    getNewAccessToken(event.target.email.value, event.target.password.value)
      .then(() => this.props.history.push("/me"));
  }


}

function LoginForm(props) {
  const submitHandler = props.submitHandler;
  const intl = props.intl;
  const emailPlaceholder = intl.formatMessage({ id: "app.signin.placeholder.email", defaultMessage: "Email" })
  const passwordPlaceholder = intl.formatMessage({ id: "app.signin.placeholder.password", defaultMessage: "Password" })

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <input type="text" className="form-control" placeholder={emailPlaceholder} name="email" />
      </div>
      <div className="form-group">
        <input type="password" className="form-control" placeholder={passwordPlaceholder} name="password" />
        <small>
          <Link to="/password/restore">
            <FormattedMessage
              id="app.signin.restorePassword"
              defaultMessage="Forgot your password?"
            />
          </Link>
        </small>
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="rememberCheck" />
        <label className="form-check-label" htmlFor="rememberCheck">
          <FormattedMessage
            id="app.signin.remember"
            defaultMessage="Remember me"
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        <FormattedMessage
          id="app.signin.signin"
          defaultMessage="Login"
        />
      </button>
    </form>
  );
}

export default injectIntl(withRouter(Login));