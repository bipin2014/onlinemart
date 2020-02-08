import {
    SET_POINTS,
    LOADING_DATA,
    SET_TOTAL,
} from '../types';
import axios from 'axios';

export const getUserCart = (pointData) => (dispatch) => {
    dispatch({ type: LOADING_DATA });

    axios.get('/user/add/rewardPoints',pointData).then(res => {
        // dispatch({
        //     type: SET_POINTS,
        //     payload: res.data
        // });
        console.log(res.data);
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

