

import {CartStateModel} from '../../types/redux-models';

import {CartAction} from './cart-actions';

const initialState: CartStateModel = {
  cartItems: [],
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const cartReducer = (state: CartStateModel = initialState, action:any) => {
  switch (action.type) {
    case CartAction.SetCartItems:
      return Object.assign({}, state, {
        cartItems: action.payload,
      });
  }
  return state;
};

