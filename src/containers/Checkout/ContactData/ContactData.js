import React from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axiosInstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends React.Component{
    state={
        name:"",
        email:"",
        address:{
            street:"",
            postalCode:""
        },
        loading:false
    }
    placeOrderHandler=(event)=>{
      event.preventDefault();
      this.setState({ loading: true });
      const postData = {
        ingredients: this.props.ingredients,
        totalPrice: this.props.totalPrice,
        customer: {
          name: "pranav",
          address: {
            society: "Global e homes",
            country: "India",
            zipcode: "410047"
          },
          email: "pranavrao@gmail.com"
        }
      };
      axiosInstance
        .post("/orders.json/?auth=TGS3sr5gbBmZ2FzcBzqZnEOqdVXtYkUqRl1Kc04a", postData)
        .then(response => {
          this.setState({ loading: false});
          this.props.history.push('/');
        })
        .catch(error => console.log(error));
    }
    render(){
      var form=(
        <form>
          <h4>Enter your contact data</h4>
          <input className={classes.Input} type='email' name="email" placeholder='Email'/>
          <input className={classes.Input} type='text' name="street" placeholder='Street'/>
          <input className={classes.Input} type='text' name="postal" placeholder='Postal'/>
          <input className={classes.Input} type='text' name="name" placeholder='Name'/>
          <Button btnType="Success" click={this.placeOrderHandler}>Order</Button>
        </form>
      );
      if(this.state.loading){
        form = <Spinner/>
      }
      return (
          <div className={classes.ContactData}>
            {form}
          </div>
      );
    }
}
export default ContactData;