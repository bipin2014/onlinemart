import React from 'react';
import { Link } from 'react-router-dom';

const AddToCart = () => {
    return (
        <Link to='/cart'>
            <i className="fa fa-shopping-cart">(0)</i>
        </Link>

    )
}

export default AddToCart;