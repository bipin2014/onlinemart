import {
    SET_POINTS,
    LOADING_DATA,
} from '../types';

const initialState = {
    user: [],
    total: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_POINTS:
            return {
                ...state,
                ...action.payload
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
