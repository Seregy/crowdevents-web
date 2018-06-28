# Crowdevents Web

Crowdevents Web is React web UI for [crowdevents](https://github.com/Seregy/crowdevents).

## Getting Started

This is a React [SPA](https://en.wikipedia.org/wiki/Single-page_application) that requires [external server]((https://github.com/Seregy/crowdevents)) for serving API.

### Prerequisites

To clone and run this application, you'll need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/) (which comes with [npm](https://www.npmjs.com/)) on your computer.
You also need to have access to the external server's endpoints.

### Launch application

From your command line:

```bash
# Clone the repository
$ git clone https://github.com/Seregy/crowdevents-web

# Go into the repository
$ cd crowdevents-web

# Install dependencies
$ npm install

# Run the application
$ npm start
```

### Using the application

After launching the application it should be running on [localhost:3000](http://127.0.0.1:3000/).

### Additional configuration

By default application assumes that you have resource and authorization server running on [localhost:8080](http://127.0.0.1:8080/) and that server's API version is *0*. If you want to change the url for api or auth server, you'll need to create file *.env*(inside the directory *crowdevents-web*) and add the following variables(replacing values with your own):

```
# API url
REACT_APP_API_URL=http://127.0.0.1:8080/v0/

# Base url for auth server(it must have '/oauth/token' endpoint)
REACT_APP_AUTH_SERVER_URL=http://127.0.0.1:8080/
```

Also if you want to use Google's Geo-location API for [reverse geocoding](https://en.wikipedia.org/wiki/Reverse_geocoding), you'll need to specify your API key in *.env*:

```
# Google API key
REACT_APP_GOOGLE_API_KEY=%Your API key%
```

## Built With

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Programming language
* [React](https://reactjs.org/) - Library for building user interface
* [Node.js](https://nodejs.org/en/) - JavaScript run-time environment
* [Webpack](https://webpack.js.org/) - Module bundler
