import React from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";
class OrderSummary extends React.Component {
  componentDidUpdate(){
    console.log('ordersummary Did update');
  }
  render() {
    const selectedIngredientCount = Object.keys(this.props.ingredients).map(
      igKey => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Auxiliary>
        <p>Your Order</p>
        <ul>{selectedIngredientCount}</ul>
        <p>Continue to checkout?</p>
        <p>
          <strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <Button btnType="Danger" click={this.props.closePopup}>
          Cancel
        </Button>
        <Button btnType="Success" click={this.props.purchaseContinueHandler}>Proceed</Button>
      </Auxiliary>
    );
  }
}
export default OrderSummary;
