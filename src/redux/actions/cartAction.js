import {
    SET_CART,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    LOADING_DATA,
    SET_TOTAL,
} from '../types';
import axios from 'axios';

export const getUserCart = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });

    axios.get('/cart').then(res => {
        dispatch({
            type: SET_CART,
            payload: res.data
        });

        // dispatch(findTotal())
        let total = 0;
        console.log("Cart",res.data.cart);
        res.data.cart.forEach(item => (
            total += item.product.price * item.quantity));
        console.log(total);

        dispatch({
            type: SET_TOTAL,
            total: total
        });
    }).catch(err => console.error(err));
};

export const addToCart = (cartData) => (dispatch) => {
    dispatch({ type: LOADING_DATA });

    axios.post('/cart/add', cartData).then(data => {
        dispatch(getUserCart())
    }).catch(err => {
        console.log(err.code);
    });
};

export const removeFromCart = (productId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });

    axios.delete(`/cart/remove/${productId}`).then(data => {
        dispatch(getUserCart())
    }).catch(err => {
        console.log(err.code);
    });
};

export const removeAllCart = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });

    axios.delete('/cart/removeall').then(data => {
        dispatch(getUserCart())
    }).catch(err => {
        console.log(err.code);
    });
};

