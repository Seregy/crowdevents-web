import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./css/index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import uk from 'react-intl/locale-data/uk';

import messages_uk from "./messages/uk.json";
import messages_en from "./messages/en.json";

const messages = {
  "uk": messages_uk,
  "en": messages_en
}
const locale = "uk";

addLocaleData([...en, ...uk]);

ReactDOM.render(
  <IntlProvider locale={locale} messages={messages[locale]}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </IntlProvider>,
  document.getElementById("root")
);
registerServiceWorker();
