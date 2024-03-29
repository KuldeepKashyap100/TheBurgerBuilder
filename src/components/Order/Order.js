import React from "react";
import classes from "./Order.module.css";
const Order = props => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  const ingredientOutput = ingredients.map(ig => (
    <span
      key={ig.name}
      style={{
        textTransform: "capitalize",
        display: "inlne-block",
        border: "1px solid #ccc",
        margin: "0 8px",
        padding: "5px"
      }}
    >
      {ig.name} ({ig.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredients:{ingredientOutput}</p>
      <p>
        Price: <strong>{Number.parseFloat(props.totalPrice).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
