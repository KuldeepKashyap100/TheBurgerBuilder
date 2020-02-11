import React from "react";
import classes from './Backdrop.module.css';
const Backdrop = props => {
  return (
    props.backDropVisibility?<div className={classes.Backdrop} onClick={props.closePopup}></div>:null
  );
};
export default Backdrop;
