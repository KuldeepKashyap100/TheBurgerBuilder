import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'
 const NavigationItems=props=>(
     <ul className={classes.NavigationItems}>
         <NavigationItem link="/" active={true}>Burger Builder</NavigationItem>
         <NavigationItem link="/checkout">Checkout</NavigationItem>
     </ul>
 );

 export default NavigationItems;