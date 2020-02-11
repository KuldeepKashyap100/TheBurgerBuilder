import React from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showSideDrawer:false
    }
  }
  toggleSideDrawerHandler=()=>{
    this.setState((prevState)=>{
      return {showSideDrawer:!prevState.showSideDrawer};
    });
  }
  render() {
    return (
      <Auxiliary>
        <SideDrawer showSideDrawer={this.state.showSideDrawer} toggleSideDrawerHandler={this.toggleSideDrawerHandler}/>
        <Toolbar toggleSideDrawerHandler={this.toggleSideDrawerHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}
export default Layout;