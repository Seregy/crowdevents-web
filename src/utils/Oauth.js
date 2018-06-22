import axios from "axios";

export function getOauthToken() {
  return JSON.parse(localStorage.getItem("oauth_token"));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("current_user"));
}

export function removeOauthToken() {
  localStorage.removeItem("oauth_token");
  localStorage.removeItem("current_user");
}

export function isOauthTokenExpired() {
  const token = getOauthToken();

  if (!token) {
    return true;
  }

  const expireDate = token.updatedAt + (token.expires_in * 1000);
  return expireDate <= Date.now();
}

export function isTokenValid(token) {
  let data = new URLSearchParams();
  data.append("token", token);

  const config = {
    auth: {
      username: "web",
      password: "web",
    },
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    }
  };

  return new Promise((resolve, reject) => {
    axios.post("http://127.0.0.1:8080/oauth/check_token", data, config).then(
      response => {
        if (response.status === 200) {
          resolve(response.data.active);
        } else {
          resolve(false);
        }
      }
    );
  });
}

export function getNewAccessToken(username, password) {
  let data = new URLSearchParams();
  data.append("grant_type", "password");
  data.append("username", username);
  data.append("password", password);

  const config = {
    auth: {
      username: "web",
      password: "web",
    },
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    }
  };

  return new Promise((resolve, reject) => {
    axios.post("http://127.0.0.1:8080/oauth/token", data, config).then(
      response => {
        if (response.status === 200) {
          const data = response.data;
          data.updatedAt = Date.now();
          localStorage.setItem("oauth_token", JSON.stringify(data));
          resolve(data);
        } else {
          reject(response);
        }
      }
    ).then(() => {
      const accessToken = getOauthToken().access_token;

      axios.get("http://127.0.0.1:8080/v0/persons/current", {
        headers: {
          "Authorization": "Bearer " + accessToken
        }
      }).then(
        response => {
          localStorage.setItem("current_user", JSON.stringify(response.data));
        }
      )
    });
  });
}
