import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Cart = () => {

    const CheckoutClicked=()=>{

    }


    return (
        <div className="content">
            <div className="heading"> Lets Complete the Order, Shall we?</div>

            <div className="cart-container">
                <div className="cart-products">
                    <div className="cart-product">
                        <img src="http://www.proshopping.org/wp-content/uploads/2018/08/24517-hd-women-shopping.jpg" alt="Image" className="cart-image" />
                        <div className="product-name">Iphone</div>
                        <div className="product-price">$100</div>
                        <div className="product-quantity">
                            <i className="fa fa-plus" />
                            <input type="text" value="1" />
                            <i className="fa fa-minus" />
                        </div>
                    </div>
                    <div className="cart-product">
                        <img width="350" height="435" src="http://www.proshopping.org/wp-content/uploads/2018/08/24517-hd-women-shopping.jpg" alt="Image" className="cart-image" />
                        <div className="product-name">Iphone</div>
                        <div className="product-price">$100</div>
                        <div className="product-quantity">
                            <i className="fa fa-plus" />
                            <input type="text" value="1" />
                            <i className="fa fa-minus" />
                        </div>
                    </div>
                </div>

                <div className="cart-details">
                    <h2>Cart Total</h2>
                    <table>
                    <tr>
                        <td><div>SUBTOTAL</div></td>
                        <td><div className="amt">$250</div></td>
                    </tr>

                    <tr>
                        <td><div>Tax</div></td>
                        <td><div className="amt">$0</div></td>
                    </tr>
                    <tr>
                        <td><div>Total</div></td>
                        <td><div className="amt">$250</div></td>
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
