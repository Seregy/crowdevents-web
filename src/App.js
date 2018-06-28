import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider, addLocaleData } from 'react-intl';

import Navigation from "./components/Navigation";
import Main from "./components/Main";
import Footer from "./components/Footer";

import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import en from 'react-intl/locale-data/en';
import uk from 'react-intl/locale-data/uk';
import messages_uk from "./messages/uk.json";
import messages_en from "./messages/en.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.allMessages = {
      "uk": messages_uk,
      "en": messages_en
    }
    addLocaleData([...en, ...uk]);

    const locale = this.getLocale();
    this.state = {
      locale: locale,
      messages: this.allMessages[locale]
    }
    this.changeLocale = this.changeLocale.bind(this);
  }

  render() {
    const locale = this.state.locale;
    const messages = this.state.messages;

    return (
      <IntlProvider locale={locale} messages={messages}>
        <BrowserRouter>
          <div className="app container">
            <Navigation />
            <Main />
            <Footer key={locale} locale={locale} changeLocale={this.changeLocale} />
          </div>
        </BrowserRouter>
      </IntlProvider>
    );
  }

  changeLocale(newLocale) {
    if (newLocale in this.allMessages) {
      sessionStorage.setItem("locale", newLocale);
      this.setState({
        locale: newLocale,
        messages: this.allMessages[newLocale]
      });
    } else {
      console.error("Couldn't find locale" + newLocale);
    }
  }

  getLocale() {
    let locale = sessionStorage.getItem("locale") || navigator.language || navigator.browserLanguage || "en";
    return locale.substring(0, 2);
  }
}

export default App;
