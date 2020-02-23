import React from "react";
import classes from "./Input.module.css";
const Input = props => {
  let inputElement = null;
  let inputError=null;
  let inputClasses=[classes.InputElement];
  if(!props.isvalid && props.shouldvalidate && props.touched){
    inputClasses.push(classes.InValid);
    inputError=<div className={classes.ValidationError}>Please enter a valid value of {props.elementname}</div>
  }
  switch (props.elementtype) {
    case "input":
      inputElement = (
        <input onChange={props.changed} className={inputClasses.join(' ')} {...props} />
      );
      break;
    case "textarea":
       inputElement = <textarea onChange={props.changed} {...props} {...props} />;
      break;
    case "select":
      inputElement = (
        <select onChange={props.changed} className={inputClasses.join(' ')}>
          {props.options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input onChange={props.changed} className={inputClasses.join(' ')} {...props} />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {inputError}
    </div>
  );
};
export default Input;