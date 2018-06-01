import React, { Component } from "react";
import { Link } from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";

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
  const title = `Внесіть ${reward.minimal_contribution.amount + getSymbolFromCurrency(reward.minimal_contribution.currency)} або більше`;

  const left = reward.limit != null ? (`Залишилось ${reward.limit - reward.contributions.length}`) : "Необмежена кількість";

  let shipping;
  if (reward.shipping_location) {
    shipping = (
      <div>
        <h6 className="card-subtitle mb-2 text-muted">Доставка: {reward.shipping_location}</h6>
      </div>
    );
  }

  let delivery;
  if (reward.delivery_date) {
    delivery = (
      <div>
        <h6 className="card-subtitle mb-2 text-muted">Дата доставки: {reward.delivery_date}</h6>
      </div>
    );
  }

  return (
    <div className="reward card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{left}</h6>
        <p className="card-text">{reward.description}</p>
        {shipping}
        {delivery}
        <Link to="#" className="btn btn-primary w-100">Зробити внесок</Link>
      </div>
    </div>
  );
}

export default ProjectRewards;