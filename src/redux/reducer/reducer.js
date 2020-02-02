import * as actionTypes from '../action';

const initialState = {
    cart: [],
    loading:false,
}

const reducer = (state = initialState, action) => {
    let cart = state.cart;

    switch (action.type) {

        case actionTypes.ADD_TO_CART:
            console.log("Hello");
            cart.push(action.payload);
            
            return {
                ...state,
                cart: cart
            };
        // case 'UPDATE_CART_QUANTITY':

        //     let item = cart.find(item => item.product.id == action.payload.productId);

        //     let newCart = cart.filter(item => item.product.id != action.payload.productId);

        //     item.quantity = action.payload.quantity;

        //     newCart.push(item);

        //     return {
        //         ...state,
        //         cart: newCart
        //     };

        // case 'REMOVE_FROM_CART':
        //     return {
        //         ...state,
        //         cart: cart.filter(item => item.product.id != action.payload.productId)
        //     };
        default:
            return state;
    }

}

export default reducer;
