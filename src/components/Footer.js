import React, { Component } from "react";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.changeLocale = props.changeLocale;
    this.intl = props.intl;
    this.enText = "English"
    this.ukText = "Українська"
    this.locale = props.locale;
  }

  render() {
    const locale = this.locale;
    const enText = this.enText;
    const ukText = this.ukText;

    return (
      <div className="footer d-flex nav navbar-expand-lg">
        <div className="language">
          <LanguageButton locale="en" text={enText} currentLocale={locale} handler={this.changeLocale} />
          <LanguageButton locale="uk" text={ukText} currentLocale={locale} handler={this.changeLocale} />
        </div>
      </div>
    );
  }
}

function LanguageButton(props) {
  const locale = props.locale;
  const text = props.text;
  const currentLocale = props.currentLocale;
  const handler = () => {
    props.handler(locale)
  };

  let buttonClass = "btn btn-link";

  if (currentLocale === locale) {
    buttonClass += " disabled";
  }

  return (
    <button onClick={handler} type="button" className={buttonClass}>{text}</button>
  );
}

export default Footer;
