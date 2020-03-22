import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
const BuildControls=props=>{
    const controls=[
        {label:'Bacon', type:'bacon'},
        {label:'Meat', type:'meat'},
        {label:'Cheese', type:'cheese'},
        {label:'Salad', type:'salad'}
    ];
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: {props.totalPrice.toFixed(2)}</p>
            {controls.map(control=><BuildControl 
                                        removed={()=>props.ingredientRemoved(control.type)} 
                                        added={()=>{props.ingredientAdded(control.type)}} 
                                        key={control.label} 
                                        label={control.label}
                                        disableInfo={props.disableInfo[control.type]}/>
            )}
            <button className={classes.OrderButton} 
                    onClick={props.orderButtonHandler} 
                    disabled={!props.purchasable}>{props.isAuthenticated? 'ORDER NOW!!!': 'Sign Up to Order'}</button>
        </div>
        
    );
}
export default BuildControls;