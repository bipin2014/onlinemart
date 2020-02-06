import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {removeAllCart} from '../../redux/actions/cartAction'

class Checkout extends Component {
    state = {
        fullname: "",
        country: "",
        city: "",
        state: "",
        street: "",
        phone: "",
        payment:"",
        error:"",
        paymentRes:{}
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        const handleSubmit = (event) => {
            event.preventDefault();
            let userDetail = {
                "email": this.state.email,
                "password": this.state.password,
            }
            console.log(userDetail);
            this.props.loginUser(userDetail, this.props.history);
        }

        const onPlaceOrder=()=>{
            console.log("Place Order");
            console.log(this.state.payment);

            if(this.state.payment===""){
                this.setState({
                    error:"Please Select Payment Method"
                })
            }else if(this.state.payment==="online"){
                let payData={
                    "amount":this.props.cart.total,
                    "paymentType":"online",
                    "paymentStatus":"Sucess"
                }
                axios.post('/payment/makePayment',payData).then(res=>{
                    this.setState({
                        paymentRes:res.data
                    })
                    makeOrder();
                }).catch(err=>{
                    console.log(err);
                })

            }else if(this.state.payment==="offline"){
                let payData={
                    "amount":this.props.cart.total,
                    "paymentType":"offline",
                    "paymentStatus":"waiting"
                }
                axios.post('/payment/makePayment',payData).then(res=>{
                    this.setState({
                        paymentRes:res.data
                    })
                    makeOrder();  
                }).catch(err=>{
                    console.log(err);
                });
            }
        }


        const makeOrder=()=>{
            let result = this.props.cart.cart.map(a => a._id);
            let orderData={
                    "product":result,
                    "paymentId":this.state.paymentRes._id
                }
                axios.post('/order/makeOrder',orderData).then(res=>{
                    console.log(res.data);
                    this.props.removeAllCart();
                    this.props.history.push('/thankyou');
                }).catch(err=>{
                    console.log(err.code);
                });
        }

        return (
            <div className="content">
                <div className="heading"> Checkout</div>

                <div className="checkout-container">
                    <div className="billing-details">
                        <h1>Billing Details</h1>
                        <form>
                            <label>FULL NAME *</label>
                            <input type="text" />
                            <label>Country</label>
                            <input type="text" required />
                            <label>TOWN / CITY *</label>
                            <input type="text" required />
                            <label>STATE / ZONE *</label>
                            <input type="text" required />
                            <label>STREET ADDRESS </label>
                            <input type="text" />
                            <label>PHONE *</label>
                            <input type="text" required />

                            <button>Save</button>
                        </form>
                    </div>

                    <div className="cart-details">

                        <table>
                            <tr className="border">
                                <th className="product-name">Product Name</th>
                                <th className="price">Price</th>
                            </tr>
                            {this.props.cart.cart.map(res => (
                                <tr className="border">
                                    <td className="product-name">{res.product.name} X {res.quantity}</td>
                                    <td className="price">${res.product.price}</td>
                                </tr>
                            ))}
                            <tr>
                                <td><div>Total</div></td>
                                <td><div className="amt">${this.props.cart.total}</div></td>
                            </tr>
                        </table>


                        
                        <label >Payment Type</label>
                        <div className="payment-type">
                                
                                <input type="radio" value="online" name="payment"  onChange={this.handleChange}/> Online
                                <input type="radio" value="offline" name="payment" onChange={this.handleChange}/> Offline 
                        </div>
                        <button className="checkout" onClick={onPlaceOrder}>Place Order</button>
                    </div>

                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
    }
};

const mapActionToProps={
    removeAllCart
}

export default connect(mapStateToProps,mapActionToProps)(Checkout);
