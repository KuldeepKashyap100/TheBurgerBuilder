import React from 'react';
import classes from '../../UI/Button/Button.module.css';
const Button=props=>{
    return (
        <button className={[classes.Button,classes[props.btnType]].join(' ')} {...props} onClick={props.click}>
            {props.children}
        </button>
    );
}
export default Button;