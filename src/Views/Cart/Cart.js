import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import img from "../../logo.svg";

export const Cart = (props) => {

    const token = localStorage.getItem("AUTH-TOKEN");
    if (token) {
        axios.defaults.headers.common['AUTH-TOKEN'] = token;
    }

    const [cartProducts, setCartProducts] = useState([
        {
            _id: 1,
            product: {
                name: "Iphone",
                price: 100,
            },
            quantity: 10,
        },
        {
            _id: 2,
            product: {
                name: "Iphone",
                price: 100,
            },
            quantity: 1,
        }
    ]);
    const [cartTotal,setCartTotal]=useState(100);

    // const CheckoutClicked = () => {
    //     console.log("Checkout")
    // }

    const handleRemove = (p) => {
        console.log(p)
        axios.delete(`/cart/remove/${p}`).then(data=>{
            console.log(data);
            cartProducts.forEach(data=>{
                setCartTotal(cartTotal+data.total)
            });
            props.history.push('/cart');
        }).catch(err=>{
            console.log(err);
        })
    }



    useEffect(() => {
        axios.get('/cart').then(data => {
            console.log(data.data);
            setCartProducts(data.data.cart);
        }).catch(err => console.error(err));
    }, []);


    return (
        <div className="content">
            <div className="heading"> Lets Complete the Order, Shall we?</div>

            <div className="cart-container">
                <div className="cart-products">
                    {cartProducts.map(cart => (
                        <div className="cart-product">
                            <img src={cart.product.image ? `http://localhost:5000/${cart.product.image}` : img}
                                 alt="" className="cart-image"/>
                            <div className="product-name">{cart.product.name}</div>
                            <div className="product-price">${cart.product.price}</div>
                            <div className="product-quantity">
                                <i className="fa fa-plus"/>
                                <input type="text" value={cart.quantity}/>
                                <i className="fa fa-minus"/>
                            </div>
                            <div className={"remove-button"} onClick={handleRemove.bind(this,cart._id)}>X</div>
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
                                <div className="amt">${cartTotal}</div>
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
                                <div className="amt">${cartTotal}</div>
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
