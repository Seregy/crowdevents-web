import React, { Component } from "react";
import { Link } from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";
import { FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl';

import "../css/ProjectRewards.css";

function ProjectRewards(props) {
  const project = props.project;
  const rewards = project.rewards;

  return (
    <div className="rewards">
      {rewards.map(reward => (
        <RewardCard reward={reward} key={reward.id} />
      ))}
    </div>
  );
}

function RewardCard(props) {
  const reward = props.reward;
  let left;
  if (reward.limit) {
    left = (
      <FormattedMessage
        id="app.project.reward.amount.left"
        defaultMessage="{amount} left"
        values={{
          amount: reward.limit - reward.contributions.length,
        }}
      />
    );
  } else {
    left = (
      <FormattedMessage
        id="app.project.reward.amount.unlimited"
        defaultMessage="Unlimited amount"
      />
    );
  }

  let shipping;
  if (reward.shipping_location) {
    shipping = (
      <div>
        <h6 className="card-subtitle mb-2 text-muted">
          <FormattedMessage
            id="app.project.reward.delivery.location"
            defaultMessage="Delivery location: {location}"
            values={{
              location: reward.shipping_location,
            }}
          />
        </h6>
      </div>
    );
  }

  let delivery;
  if (reward.delivery_date) {
    delivery = (
      <div>
        <h6 className="card-subtitle mb-2 text-muted">
          <FormattedMessage
            id="app.project.reward.delivery.date"
            defaultMessage="Delivery date: {date}"
            values={{
              date: reward.delivery_date,
            }}
          />
        </h6>
      </div>
    );
  }

  return (
    <div className="reward card">
      <div className="card-body">
        <h5 className="card-title">
          <FormattedMessage
            id="app.project.reward.minimalContribution.text"
            defaultMessage="Contribute {amountWithCurrency} or more"
            values={{
              amountWithCurrency: (
                <FormattedMessage
                  id="app.project.reward.minimalContribution.amountWithSymbol"
                  defaultMessage="{currencySymbol}{amount}"
                  values={{
                    amount: reward.minimal_contribution.amount,
                    currencySymbol: getSymbolFromCurrency(reward.minimal_contribution.currency)
                  }}
                />
              )
            }}
          />
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">{left}</h6>
        <p className="card-text">{reward.description}</p>
        {shipping}
        {delivery}
        <Link to="#" className="btn btn-primary w-100">
          <FormattedMessage
            id="app.project.contribute"
            defaultMessage="Contribute"
          />
        </Link>
      </div>
    </div>
  );
}

export default ProjectRewards;