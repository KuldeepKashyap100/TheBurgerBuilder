import React from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import
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
            <BurgerBuilder />
            <Checkout />
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
