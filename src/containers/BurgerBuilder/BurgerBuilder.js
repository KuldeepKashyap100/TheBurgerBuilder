import React from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandling from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionCreator from "../../store/actions/index";

// const INGREDIENT_PRICES = {
//   cheese: 0.5,
//   meat: 1.3,
//   salad: 0.6,
//   bacon: 1
// };
class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // ingredients: null,
      // totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      // apiFailed: false
    };
  }
  updatePurchasable(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igkey => ingredients[igkey])
      .reduce((acc, value) => acc + value, 0);
    // this.setState({ purchasable: sum > 0 });
    return sum > 0;
  }
  // addIngredientHandler = type => {
  //   const currentItemCount = this.state.ingredients[type];
  //   const incrementedItemCount = currentItemCount + 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = incrementedItemCount;
  //   const updatedCost = this.state.totalPrice + INGREDIENT_PRICES[type];
  //   this.setState({ totalPrice: updatedCost, ingredients: updatedIngredients });
  //   this.updatePurchasable(updatedIngredients);
  // };
  // removeIngredientHandler = type => {
  //   const currentItemCount = this.state.ingredients[type];
  //   if (currentItemCount <= 0) return;
  //   const updatedCount = currentItemCount - 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;
  //   const updatedCost = this.state.totalPrice - INGREDIENT_PRICES[type];
  //   this.setState({ totalPrice: updatedCost, ingredients: updatedIngredients });
  //   this.updatePurchasable(updatedIngredients);
  // };
  purchashingHandler = () => {
    if(this.props.isAuthenticated){
      this.setState({ purchasing: true });
    }
    else{
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
    
  };
  cancelPurchasingHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    // const queryParams=[];
    // for(let i in this.state.ingredients){
    //   queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push("price="+this.state.totalPrice);
    // const queryString=queryParams.join('&');
    this.props.purchaseInit();
    this.props.history.push({
      pathname: "/checkout"
      //search:'?'+queryString
    });
  };
  componentDidMount() {
    // console.log(this.props);
    // axiosInstance
    //   .get("/ingredients.json")
    //   .then(response => {
    //     var burgerIngredientsCount=0;
    //     if(response.data){
    //       for(let ingredientCount in response.data){
    //         burgerIngredientsCount+=response.data[ingredientCount];
    //       }
    //     }
    //     this.setState({ ingredients: response.data,purchasable:burgerIngredientsCount?true:false });
    //   })
    //   .catch(error => {
    //     this.setState({ apiFailed: true });
    //   });
    this.props.initIngredients();
  }
  render() {
    const disableInfo = {
      ...this.props.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    var orderSummary = null;

    var burger = this.props.apiFailed ? (
      <p>Something went Wrong</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ingredients}></Burger>
          <BuildControls
            ingredientAdded={this.props.addIngredientHandler}
            ingredientRemoved={this.props.removeIngredientHandler}
            disableInfo={disableInfo}
            totalPrice={this.props.totalPrice}
            purchasable={this.updatePurchasable(this.props.ingredients)}
            orderButtonHandler={this.purchashingHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          totalPrice={this.props.totalPrice}
          closePopup={this.cancelPurchasingHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
        />
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }
    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          closePopup={this.cancelPurchasingHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilderReducer.ingredients,
    totalPrice: state.burgerBuilderReducer.totalPrice,
    apiFailed: state.burgerBuilderReducer.apiFailed,
    purchased: state.orderReducer.purchased,
    isAuthenticated: state.authReducer.token!==null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initIngredients: () => dispatch(actionCreator.initIngredients()),
    addIngredientHandler: ingredientType =>
      dispatch(actionCreator.addIngredient(ingredientType)),
    removeIngredientHandler: ingredientType =>
      dispatch(actionCreator.removeIngredient(ingredientType)),
    purchaseInit: ()=> dispatch(actionCreator.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actionCreator.setAuthRedirectPath(path))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(BurgerBuilder, axiosInstance));