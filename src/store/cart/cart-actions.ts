import {CartItemModel} from '../../types/guitar-model';

export enum CartAction {
  SetCartItems = 'cart/set-cart-items'
}

export const CartActionCreator = {
  setCartItems(cartItems: CartItemModel []) {
    return {type: CartAction.SetCartItems, payload: cartItems};
  },
};
