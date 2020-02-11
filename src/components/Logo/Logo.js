import React from 'react';
import logoImage from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';
const Logo=props=>{
    return (
        <div className={classes.Logo}>
            <img src={logoImage} alt="MyBurger"/>
        </div>
    );
}
export default Logo;