import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";
const Burger = props => {
  var layers = Object.keys(props.ingredients)
    .map(igkey => {
      return [...Array(props.ingredients[igkey])].map((_, index) => {
        return <BurgerIngredient key={igkey + index} type={igkey} />;
      });
    })
    .reduce((accumulator, element) => {
      return accumulator.concat(element);
    }, []);

  if (layers.length === 0) {
    layers = <p>Please start adding ingredients!!!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="breadTop" />
      {layers}
      <BurgerIngredient type="breadBottom" />
    </div>
  );
};
export default Burger;
