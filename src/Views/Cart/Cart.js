import axios from 'axios';
import { Link } from 'react-router-dom';
import img from "../../logo.svg";
import { connect } from 'react-redux';

import React, { Component } from 'react'
import * as actionTypes from '../../redux/action';
import { getUserCart, removeFromCart } from '../../redux/actions/cartAction';

class Cart extends Component {
    render() {
        const token = localStorage.getItem("AUTH-TOKEN");
        if (token) {
            axios.defaults.headers.common['AUTH-TOKEN'] = token;
        }

        const handleRemove = (p) => {
            this.props.removeFromCart(p);
        }
        return (
            <div className="content">
                <div className="heading"> Lets Complete the Order, Shall we?</div>

                <div className="cart-container">
                    {this.props.cart.cart.length > 0 ?
                        (<div className="cart-products">
                            {this.props.cart.cart.map(cart => (
                                <div className="cart-product">
                                    <img src={cart.product.image ? `http://localhost:5000/${cart.product.image}` : img}
                                        alt="" className="cart-image" />
                                    <div className="product-name">{cart.product.name}</div>
                                    <div className="product-price">${cart.product.price}</div>
                                    <div className="product-quantity">
                                        <i className="fa fa-plus" />
                                        <input type="text" value={cart.quantity} />
                                        <i className="fa fa-minus" />
                                    </div>
                                    <div className={"remove-button"} onClick={handleRemove.bind(this, cart._id)}>X</div>
                                </div>
                            ))}
                        </div>) :

                        (<div className="cart-products">
                            No Products in Cart
                            <Link to="/home"><button >Start Shopping</button></Link>
                        </div>
                        )}
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
                        <Link to="/checkout">
                            <button className="checkout" src="">Proceed to Checkout</button>
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

const mapActionToProps = {
    getUserCart,
    removeFromCart
}
export default connect(mapStateToProps, mapActionToProps)(Cart);
