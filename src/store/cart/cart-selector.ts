import {StateModel} from '../../types/redux-models';
import {createSelector} from 'reselect';

export const INITIAL_COUNT = 0;

export const getCartItems = (state: StateModel) => state.cart.cartItems;
export const getCartItemsCount =  createSelector([getCartItems], (cartItems) => cartItems.reduce((count, cartItem) => cartItem.count + count, INITIAL_COUNT));

export const getCartItemsTotalAmount = createSelector([getCartItems], (cartItems) => cartItems.reduce((count, cartItem) => count + cartItem.guitar.price * cartItem.count, INITIAL_COUNT) );

export const getCartDiscount = (state: StateModel) => state.cart.discount;

export const getCartItemsDiscountAmount = createSelector([getCartItemsTotalAmount, getCartDiscount], (totalAmount, discount) =>  totalAmount * discount / 100);

export const getCartErrorMessage = (state: StateModel) => state.cart.errorMessage;

export const getCartIsResponseReceived = (state: StateModel) => state.cart.isResponseReceived;
