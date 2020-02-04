import {
    SET_CART,
    GET_CART,
    LOADING_DATA,
    SET_TOTAL,
} from '../types';

const initialState = {
    cart: [{
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
    }],
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
