import React from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
class App extends React.Component {
  // state={
  //   flag:true
  // }
  // componentDidMount(){
  //   //setTimeout(()=>this.setState({flag:false}),3000);
  // }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
            {/* {this.state.flag?<BurgerBuilder />:null} */}
            <Switch>
              <Route path="/burgerBuilder" component={BurgerBuilder} />
              <Route path="/checkOut" component={Checkout} />
              <Redirect path="/" to="/burgerBuilder" />
              <Route render={()=><h1>404 Not found</h1>}/>
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;