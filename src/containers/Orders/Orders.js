import React from "react";
import Order from "../../components/Order/Order";
import axiosInstance from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as orderReducer from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends React.Component {
  // state = {
  //   orders: [],
  //   loading: true
  // };
  componentDidMount() {
    // axiosInstance
    //   .get("./orders.json")
    //   .then(response => {
    //     const fetchedOrders = [];
    //     for (let key in response.data) {
    //       fetchedOrders.push({ id: key, ...response.data[key] });
    //     }
    //     this.setState({ orders: fetchedOrders, loading: false });
    //   })
    //   .catch(err => this.setState({ loading: false }));
    this.props.fetchOrdersInit(this.props.authToken,this.props.userId);
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          totalPrice={order.totalPrice}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToPorps = state => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    authToken: state.authReducer.token,
    userId: state.authReducer.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchOrdersInit: (token,userId) => dispatch(orderReducer.fetchOrdersInit(token,userId))
  };
};
export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(withErrorHandler(Orders, axiosInstance));
