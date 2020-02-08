import React, { Component } from 'react'
import axios from 'axios';
import img from '../../logo.svg'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions/cartAction';
import { NotificationManager } from 'react-notifications';


class ProductDetails extends Component {
    state = {
        product: {
            name: "Nam"
        },
        products: [{ _id: 5, "name": "iphone", "description": "This is iphone", price: 100 },
        { _id: 1, "name": "iphone", "description": "This is iphone", price: 100 },
        { _id: 2, "name": "iphone", "description": "This is iphone", price: 100 },
        { _id: 3, "name": "iphone", "description": "This is iphone", price: 100 },
        { _id: 4, "name": "iphone", "description": "This is iphone", price: 100 }],
    }
    componentDidMount() {
        let pid = this.props.match.params.productId;

        axios.get(`/products/${pid}`)
            .then((res) => {
                console.log("Product details", res.data);
                this.setState({
                    product: res.data.body
                })
            }).catch(err => console.error(err));

            let limit=4;

        axios.get('/products/limit/'+limit).then(data => {
            console.log(data.data);
            this.setState({
                products: data.data
            })
        }).catch(err => console.error(err));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log("This is Next ", nextProps);

        let pid = nextProps.match.params.productId;
        console.log(pid);

        axios.get(`/products/${pid}`)
            .then((res) => {
                console.log("Product details", res.data);
                this.setState({
                    product: res.data.body
                })
            }).catch(err => console.error(err));

        axios.get('/products').then(data => {
            console.log(data.data);
            this.setState({
                products: data.data
            })
        }).catch(err => console.error(err));
    }

    render() {
        const handleCartAdd = (p) => {
            let cartData = {
                productId: p._id,
                quantity: 1,
                price: p.price,
                total: p.price,
            }
            console.log(cartData);
            this.props.addToCart(cartData);
            NotificationManager.success('Product added to Cart Sucessfully!', 'Successful!', 2000);
        }
        return (
            <div className="content">
                <div className="product-container">
                    <div className="image-area">
                        <img className="image" src={this.state.product.image ? `http://localhost:5000/${this.state.product.image}` : img} alt="" />
                    </div>
                    <div className="product-details">
                        <h1 className="product-name">{this.state.product.name}</h1>
                        
                        <div className="product-category">Category: 
                        {this.state.product.category?(
                            <span>{this.state.product.category.map(d=>(
                                d
                            ))}</span>
                        ):""}

                         </div>
                        <h2 className="product-price">${this.state.product.price}</h2>
                        <div className="line"></div>
                        <div className="product-description">{this.state.product.description}</div>
                        <div className="line"></div>
                        <button onClick={handleCartAdd.bind(this, this.state.product)}>ADD TO CART</button>
                    </div>

                </div>

                <div className="section-heading">Other Related Products</div>
                <div className="products">
                    {this.state.products.map(product => (

                        <div key={product._id} className="product">
                            <Link to={`/product/${product._id}`} className="link">
                                <img className="image" src={product.image ? `http://localhost:5000/${product.image}` : img} alt="img" />
                                <h3 className="products_name">{product.name}</h3>
                                <div className="products_price">Price : ${product.price}</div>
                            </Link>
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

export default connect(null, mapActionsToProps)(ProductDetails);

