import {
    SET_CART,
    GET_CART,
    LOADING_DATA,
    SET_TOTAL,
} from '../types';

const initialState = {
    cart: [],
    total: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CART:
            return {
                ...state,
                ...action.payload
            };
        case SET_TOTAL:
            return {
                ...state,
                total:action.total
            };
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
