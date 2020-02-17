import React from "react";
import Burger from "../../components/Burger/Burger";
import Button from "../../components/UI/Button/Button";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
class Checkout extends React.Component {
  state = {
    ingredients: {},
    totalPrice:null
  };

  cancelCheckout = () => {
    this.props.history.goBack();
  };
  continueCheckout = () => {
    // this.props.history.push(this.props.match.url + "/contact-data");
    this.props.history.push("/checkout/contact-data");
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const fetchedIngredients = {};
    for (let param of query.entries()) {
      if(param[0]=='price')
        this.setState({totalPrice:param[1]});
      else
        fetchedIngredients[param[0]] = +param[1];
    }
    this.setState({ ingredients: fetchedIngredients });
  }
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          continueCheckout={this.continueCheckout}
          cancelCheckout={this.cancelCheckout}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={() => <ContactData ingredients={this.state.ingredients} />}
        />
      </div>
    );
  }
}
export default Checkout;