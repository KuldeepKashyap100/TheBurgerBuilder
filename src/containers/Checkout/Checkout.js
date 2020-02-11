import React from "react";
import Burger from "../../components/Burger/Burger";
import Button from "../../components/UI/Button/Button";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
class Checkout extends React.Component {
  state = {
    ingredients: {
      meat: 1,
      cheese: 2,
      bacon: 1,
      salad: 1
    }
  };
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}></CheckoutSummary>
      </div>
    );
  }
}
export default Checkout;
