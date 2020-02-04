import axios from 'axios';
import img from '../../logo.svg'
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import { connect } from 'react-redux';
import { ADD_TO_CART } from "../../redux/action";
import React, { Component } from 'react';
import * as actionTypes from '../../redux/action';
import {addToCart} from '../../redux/actions/cartAction'

class Body extends Component {
    state={
        products:[{ _id: 5, "name": "iphone", "description": "This is iphone", price: 100 },
        { _id: 1, "name": "iphone", "description": "This is iphone", price: 100 },
        { _id: 2, "name": "iphone", "description": "This is iphone", price: 100 },
        { _id: 3, "name": "iphone", "description": "This is iphone", price: 100 },
        { _id: 4, "name": "iphone", "description": "This is iphone", price: 100 }],
    }


    componentDidMount(){
        axios.get('/products').then(data => {
            console.log(data.data);
            this.setState({
                products:data.data
            })
        }).catch(err => console.error(err));
    }

    
    render() {
        const token = localStorage.getItem("AUTH-TOKEN");
        if (token) {
            axios.defaults.headers.common['AUTH-TOKEN'] = token;
        }

        const handleCartAdd = (p) => {
            // event.preventDefault();
            let cartData = {
                productId: p._id,
                quantity: 1,
                price: p.price,
                total: p.price,
            }
            console.log(cartData);
    
            // axios.post('/cart/add', cartData).then(data => {
            //     console.log(data.data);
            // }).catch(err => {
            //     console.log(err.code);
            // });
    
            this.props.addToCart(cartData);
    
        }
        return (
            <div className="content">
                <ImageSlider />
                <div className="section-heading">Our Trending Products</div>
                <div className="products">
                    {this.state.products.map(product => (
                        <div key={product._id} className="product">
                            <img className="image" src={product.image ? `http://localhost:5000/${product.image}` : img} alt="img" />
                            <h3 className="products_name">{product.name}</h3>
                            <div className="products_price">Price : ${product.price}</div>
                            <div className="add-to-cart-container">
                                <i className="fa fa-cart-plus" onClick={handleCartAdd.bind(this, product)} aria-hidden="true"></i>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        )
    }
}


const mapActionsToProps = {
    addToCart
};

export default connect(null, mapActionsToProps)(Body);

// <button onClick={handleCartSubmit.bind(this, product)}>Add to Cart</button>

// <i class="fa fa-cart-plus" onClick={handleCartAdd.bind(this, product)} aria-hidden="true"></i>
