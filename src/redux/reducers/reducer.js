import * as actionTypes from '../action';

const initialState = {
    cart: [],
    loading:false,
    no_of_item:0,
    error: {},
}

const reducer = (state = initialState, action) => {
    let cart = state.cart;

    switch (action.type) {

        case actionTypes.ADD_TO_CART:
            console.log("Hello");
            
            return {
                ...state,
                no_of_item:state.no_of_item+1
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

        case 'REMOVE_FROM_CART':
            return {
                // ...state,
                // cart: cart.filter(item => item.product.id != action.payload.productId)
            };
        default:
            return state;
    }
    

}

export default reducer;
