
import { mockCartItems } from '../../utils/test-utils';
import {CartStateModel } from '../../types/redux-models';

import {CartAction} from './cart-actions';
import {cartReducer} from './cart-reducer';

const initialState:CartStateModel = {
  cartItems: [],
};


it('Reducer setCartItems success', () => {
  expect(cartReducer(initialState, {type: CartAction.SetCartItems, payload: mockCartItems})).toEqual({
    cartItems: mockCartItems,
  });
});
