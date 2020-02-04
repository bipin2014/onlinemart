export const NO_OF_ITEM_CART="NO_OF_ITEM_CART";
export const ADD_TO_CART="ADD_TO_CART";
export const REMOVE_FROM_CART= "REMOVE_FROM_CART";

export const updateCartQuantity = (productId, quantity) => {
 
    return {
        type: 'UPDATE_CART_QUANTITY',
        payload: {
            productId,
            quantity: quantity
        }
    }
  };