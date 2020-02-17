import React from "react";
import Burger from "../../Burger/Burger";
import classes from './CheckoutSummary.module.css';
import Button from "../../UI/Button/Button";
class CheckoutSummary extends React.Component {
  render() {
    return (
      <div className={classes.CheckoutSummary}>
        <h1>We hope it tastes well!</h1>
        <div style={{ width: "100%", margin: "auto"}}>
          <Burger ingredients={this.props.ingredients}></Burger>
          <Button btnType="Danger" click={this.props.cancelCheckout}>Cancel</Button>
          <Button btnType="Success" click={this.props.continueCheckout}>Continue</Button>
        </div>
      </div>
    );
  }
}
export default CheckoutSummary;
