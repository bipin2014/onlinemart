import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'

import React, { Component } from 'react'

class AddToCart extends Component {
    state={
        noofproduct:0
    }

    componentDidMount(){
        axios.get('/cart').then(data => {
            this.setState({
                noofproduct:data.data.cart.length
            })
            console.log(data.data.cart)

        }).catch(err => {
            console.log(err.code);

        })
    }
    render() {
        return (
            <Link to='/cart'>
                <i className="fa fa-shopping-cart">({this.props.noofitem})</i>
            </Link>
        )
    }
}

const mapStateToProps = state => ({
    noofitem:state.cart.cart.length
});

export default connect(mapStateToProps)(AddToCart);