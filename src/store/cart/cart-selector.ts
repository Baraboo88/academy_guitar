import {StateModel} from '../../types/redux-models';
import {createSelector} from 'reselect';

export const INITIAL_COUNT = 0;

export const getCartItems = (state: StateModel) => state.cart.cartItems;
export const getCartItemsCount =  createSelector([getCartItems], (cartItems) => cartItems.reduce((count, cartItem) => cartItem.count + count, INITIAL_COUNT)) ;
