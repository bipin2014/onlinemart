export const NO_OF_ITEM_CART="NO_OF_ITEM_CART";
export const ADD_TO_CART=(product) => {
 
    return {
        type: 'ADD_TO_CART',
        payload: {
            product,
            quantity: 1
        }
    }
};
export const REMOVE_FROM_CART= (productId) => {
 
    return {
        type: 'REMOVE_FROM_CART',
        payload: {
            productId: productId
        }
    }
};

export const updateCartQuantity = (productId, quantity) => {
 
    return {
        type: 'UPDATE_CART_QUANTITY',
        payload: {
            productId,
            quantity: quantity
        }
    }
  };