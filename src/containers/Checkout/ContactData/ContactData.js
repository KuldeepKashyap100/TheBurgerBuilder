import React from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axiosInstance from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from '../../../store/actions/index';

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        valid: false,
        validation: {
          required: true
        },
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Email"
        },
        value: "",
        valid: false,
        validation: {
          required: true
        },
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        valid: false,
        validation: {
          required: true
        },
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        valid: false,
        validation: {
          required: true
        },
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        valid: false,
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ],
          type: "text",
          placeholder: "Delivery Method"
        },
        value: "fastest",
        valid: true,
        validation: {}
      }
    },
    formIsValid: false,
    // loading: false
  };
  onSubmitHandler = event => {
    // event.preventDefault();
    // this.setState({ loading: true });
    // const orderForm = {};
    // for (let key in this.state.orderForm) {
    //   orderForm[key] = this.state.orderForm[key].value;
    // }
    // const postData = {
    //   ingredients: this.props.ingredients,
    //   totalPrice: this.props.totalPrice,
    //   customer: orderForm
    // };

    // axiosInstance
    //   .post(
    //     "/orders.json",
    //     postData
    //   )
    //   .then(response => {
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //   })
    //   .catch(error => console.log(error));
    const orderForm = {};
    for (let key in this.state.orderForm) {
      orderForm[key] = this.state.orderForm[key].value;
    }
    const postData = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: orderForm
    };
    this.props.orderBurger(postData);
  };
  onChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedOrderElement = { ...updatedOrderForm[inputIdentifier] };
    updatedOrderElement.value = event.target.value;
    updatedOrderElement.valid = this.checkValidation(
      updatedOrderElement.value,
      updatedOrderElement.validation
    );
    updatedOrderElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedOrderElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };
  checkValidation = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }
    return isValid;
  };
  render() {
    const formArray = [];
    for (let key in this.state.orderForm) {
      formArray.push(
        <Input
          key={key}
          elementname={key}
          changed={event => this.onChangeHandler(event, key)}
          isvalid={this.state.orderForm[key].valid}
          elementtype={this.state.orderForm[key].elementType}
          shouldvalidate={this.state.orderForm[key].validation}
          touched={this.state.orderForm[key].touched}
          {...this.state.orderForm[key].elementConfig}
        />
      );
    }

    let form = (
      <form onSubmit={this.onSubmitHandler}>
        <h4>Enter your contact data</h4>
        {formArray}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilderReducer.ingredients,
    totalPrice: state.burgerBuilderReducer.totalPrice,
    loading: state.orderReducer.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    orderBurger: (orderData) => dispatch(orderActions.purchaseBurger(orderData))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axiosInstance));