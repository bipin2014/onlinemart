import React, { Component } from 'react';
import axios from 'axios';
import img from '../../logo.svg'
import { addToCart } from '../../redux/actions/cartAction';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RadioButton from '../../components/RadioButton/RadioButton'

class ProductSearch extends Component {
    state = {
        keyword: "",
        products: [],
        order:""
    }

    componentDidMount() {
        this.setState({
            keyword: this.props.match.params.keyword
        })
        axios.get('/products/search/' + this.props.match.params.keyword).then(data => {
            console.log("Search", data.data);
            this.setState({
                products: data.data.body
            })

        }).catch(err => console.error(err));

    }
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location)
            this.productHandler()
    }

    radioChangeHandler = (event) => {
        this.setState({
            order: event.target.value
        });
        axios.get('/products/search/' + this.state.keyword+'/'+event.target.value).then(data => {
            console.log("Search", data.data);
            this.setState({
                products: data.data.body
            })

        }).catch(err => console.error(err));
    }

    productHandler = () => {
        this.setState({
            keyword: this.props.match.params.keyword
        })
        axios.get('/products/search/' + this.props.match.params.keyword).then(data => {
            console.log("Search", data.data);
            this.setState({
                products: data.data.body
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
                <div className="search-product-container">
                    <div className="side-bar">
                        <div className="side-bar-label">Filter Product</div>
                        <div className="order">
                            <div>Order</div>
                            
                                <RadioButton
                                    changed={this.radioChangeHandler}
                                    id="1"
                                    isSelected={this.state.order === "ascending"}
                                    label="Ascending"
                                    value="ascending"
                                    name="order"
                                />
                            
                            
                                <RadioButton
                                    changed={this.radioChangeHandler}
                                    id="2"
                                    isSelected={this.state.order === "descending"}
                                    label="Descending"
                                    value="descending"
                                    name="order"
                                />
                            
                        </div>
                    </div>
                    <div className="search-product-container">
                        <div className="search-title">Search Keyword: {this.state.keyword}</div>
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
                </div>
            </div>
        )
    }
}

const mapActionsToProps = {
    addToCart
};

export default connect(null, mapActionsToProps)(ProductSearch)
