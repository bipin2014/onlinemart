import axios from 'axios';
import { Link } from 'react-router-dom';
import img from "../../logo.svg";
import { connect } from 'react-redux';

import React, { Component } from 'react'
import * as actionTypes from '../../redux/action';
import {getUserCart,removeFromCart} from '../../redux/actions/cartAction';

class Cart extends Component {
    render() {
        const token = localStorage.getItem("AUTH-TOKEN");
        if (token) {
            axios.defaults.headers.common['AUTH-TOKEN'] = token;
        }

        const handleRemove = (p) => {
            console.log(p)
            this.props.removeFromCart(p);
            // axios.delete(`/cart/remove/${p}`).then(data => {
            //     console.log(data);
            //     this.state.cartProducts.forEach(data => {
            //         console.log(data);
            //     });

                
                // const newCart=this.state.cartProducts.filter(item =>item._id!=p);

                // console.log(newCart);
                
                // let total=0;
                // this.state.cartProducts.forEach(item=> (
                //     total += item.product.price));
                // this.setState({
                //     cartProducts: newCart,
                //     cartTotal:total
                // })
                // this.props.history.push('/cart');
            // }).catch(err => {
            //     console.log(err);
            // })
        }
        return (
            <div className="content">
                <div className="heading"> Lets Complete the Order, Shall we?</div>
                <div className="cart-container">
                    <div className="cart-products">
                        {this.props.cart.cart.map(cart => (
                            <div className="cart-product">
                                <img src={cart.product.image ? `http://localhost:5000/${cart.product.image}` : img}
                                    alt="" className="cart-image" />
                                <div className="product-name">{cart.product.name}</div>
                                <div className="product-price">${cart.product.price}</div>
                                <div className="product-quantity">
                                    <i className="fa fa-plus" />
                                    <input type="text" value={cart.quantity}  />
                                    <i className="fa fa-minus" />
                                </div>
                                <div className={"remove-button"} onClick={handleRemove.bind(this, cart._id)}>X</div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-details">
                        <h2>Cart Total</h2>
                        <table>
                            <tr>
                                <td>
                                    <div>SUBTOTAL</div>
                                </td>
                                <td>
                                    <div className="amt">${this.props.cart.total}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>Tax</div>
                                </td>
                                <td>
                                    <div className="amt">$0</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>Total</div>
                                </td>
                                <td>
                                    <div className="amt">${this.props.cart.total}</div>
                                </td>
                            </tr>
                        </table>
                        <Link to="/order">
                            <button className="checkout" src="/order">Proceed to Checkout</button>
                        </Link>
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
    getUserCart,
    removeFromCart
}
export default connect(mapStateToProps, mapActionToProps)(Cart);
