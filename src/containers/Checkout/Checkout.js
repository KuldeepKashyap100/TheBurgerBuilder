import React from "react";
// import Burger from "../../components/Burger/Burger";
// import Button from "../../components/UI/Button/Button";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as checkOutActions from '../../store/actions/index';
import orderReducer from "../../store/reducers/order";
class Checkout extends React.Component {
  // state = {
  //   ingredients: {},
  //   totalPrice:null
  // };

  cancelCheckout = () => {
    this.props.history.goBack();
  };
  continueCheckout = () => {
    // this.props.history.push(this.props.match.url + "/contact-data");
    // this.props.history.push("/checkout/contact-data");
    this.props.history.replace("/checkout/contact-data");
  };
  // componentDidMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const fetchedIngredients = {};
  //   for (let param of query.entries()) {
  //     if(param[0]=='price')
  //       this.setState({totalPrice:param[1]});
  //     else
  //       fetchedIngredients[param[0]] = +param[1];
  //   }
  //   this.setState({ ingredients: fetchedIngredients });
  // }
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const redirectToHomeAfterPurchasing = this.props.purchased? <Redirect to="/" />: null
      summary = (
        <div>
          {redirectToHomeAfterPurchasing}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            continueCheckout={this.continueCheckout}
            cancelCheckout={this.cancelCheckout}
          />
          {/* <Route
          path={this.props.match.url + "/contact-data"}
          render={(props) => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>}
        /> */}
          <Route
            path={this.props.match.url + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilderReducer.ingredients,
    purchased: state.orderReducer.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
