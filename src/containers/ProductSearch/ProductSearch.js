import React, { Component } from 'react';
import axios from 'axios';
import img from '../../logo.svg'
import {addToCart} from '../../redux/actions/cartAction';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ProductSearch extends Component {
    state={
        keyword:"",
        products:[]
    }

    componentDidMount(){
            this.setState({
                keyword:this.props.match.params.keyword
            })
            axios.get('/products/search/'+this.props.match.params.keyword).then(data => {
                console.log("Search",data.data);
                this.setState({
                    products:data.data.body
                })
                
            }).catch(err => console.error(err));

    }
    componentDidUpdate(prevProps) {
        if (this.props.location!==prevProps.location)
            this.productHandler()
    }

    productHandler =()=>{
        this.setState({
            keyword:this.props.match.params.keyword
        })
        axios.get('/products/search/'+this.props.match.params.keyword).then(data => {
            console.log("Search",data.data);
            this.setState({
                products:data.data.body
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
    
        }
        return (
            <div className="content">
                <div className="section-heading">Search Keyword: {this.state.keyword}</div>
                <div className="products">
                    {this.state.products.map(product => (
                        <Link to={`/product/${product._id}`} className="link">
                            <div key={product._id} className="product">
                                <img className="image" src={product.image ? `http://localhost:5000/${product.image}` : img} alt="img" />
                                <h3 className="products_name">{product.name}</h3>
                                <div className="products_price">${product.price}</div>
                                <div className="add-to-cart-container">
                                    <i className="fa fa-cart-plus" onClick={handleCartAdd.bind(this, product)} aria-hidden="true"></i>
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        )
    }
}

const mapActionsToProps = {
    addToCart
};

export default connect(null,mapActionsToProps)(ProductSearch)
