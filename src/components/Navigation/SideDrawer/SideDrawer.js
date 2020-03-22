import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
const SideDrawer = props => {
  var sideDrawerClasses = [classes.SideDrawer, classes.Close];
  if (props.showSideDrawer) {
    sideDrawerClasses = [classes.SideDrawer, classes.Open]
  }
  return (
    <Auxiliary>
      <Backdrop
        backDropVisibility={props.showSideDrawer}
        closePopup={props.toggleSideDrawerHandler}
      />
      <div className={sideDrawerClasses.join(' ')} onClick={props.toggleSideDrawerHandler}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Auxiliary>
  );
};
export default SideDrawer;