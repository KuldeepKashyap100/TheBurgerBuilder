import React from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
class App extends React.Component {
  // state={
  //   flag:true
  // }
  // componentDidMount(){
  //   //setTimeout(()=>this.setState({flag:false}),3000);
  // }
  render() {
    return (
      <div className="App">
        <Layout>
          {/* {this.state.flag?<BurgerBuilder />:null} */}
          {/* <Switch> */}
            <Route path="/checkOut" component={Checkout} />
            <Route path="/orders" component={Orders}/>
            <Route path="/Auth" component={Auth}/>
            <Route path="/" exact component={BurgerBuilder} />
            {/* <Redirect path="/" to="/burgerBuilder" /> */}
            {/* <Route render={() => <h1>404 Not found</h1>} /> */}
          {/* </Switch> */}
        </Layout>
      </div>
    );
  }
}
export default App;
