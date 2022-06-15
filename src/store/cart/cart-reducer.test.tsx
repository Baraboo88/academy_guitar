
import {mockCartItems, mockGuitars} from '../../utils/test-utils';
import {CartStateModel } from '../../types/redux-models';

import {CartAction} from './cart-actions';
import {cartReducer} from './cart-reducer';
import {INITIAL_CART_ITEM_COUNT} from '../../utils/utils';

const initialState:CartStateModel = {
  cartItems: mockCartItems,
  discount: 0,
  errorMessage: '',
  isResponseReceived: false,
};


it('Reducer AddOneToCartItems success', () => {
  expect(cartReducer(initialState, {type: CartAction.AddOneToCartItems, payload: mockGuitars[3]})).toEqual({
    cartItems: [...mockCartItems, {guitar: mockGuitars[3], count: INITIAL_CART_ITEM_COUNT}],
    discount: 0,
    errorMessage: '',
    isResponseReceived: false,
  });
});

it('Reducer Add existed OneToCartItems success', () => {
  expect(cartReducer(initialState, {type: CartAction.AddOneToCartItems, payload: mockGuitars[0]})).toEqual({
    cartItems: [{...mockCartItems[0], count: mockCartItems[0].count + INITIAL_CART_ITEM_COUNT}, mockCartItems[1]],
    discount: 0,
    errorMessage: '',
    isResponseReceived: false,
  });
});

it('Reducer AddCustomToCartItems success', () => {
  expect(cartReducer(initialState, {type: CartAction.AddCustomToCartItems, payload: {...mockCartItems[1], count: 10}})).toEqual({
    cartItems: [mockCartItems[0], {...mockCartItems[1], count: 10}],
    discount: 0,
    errorMessage: '',
    isResponseReceived: false,
  });
});

it('Reducer DeleteOneFromCartItems success', () => {
  expect(cartReducer(initialState, {type: CartAction.DeleteOneFromCartItems, payload: mockCartItems[0].guitar})).toEqual({
    cartItems: [{...mockCartItems[0], count: mockCartItems[0].count - INITIAL_CART_ITEM_COUNT }, mockCartItems[1]],
    discount: 0,
    errorMessage: '',
    isResponseReceived: false,
  });
});

it('Reducer DeleteFromCartItems success', () => {
  expect(cartReducer(initialState, {type: CartAction.DeleteFromCartItems, payload: mockCartItems[0].guitar})).toEqual({
    cartItems: [mockCartItems[1]],
    discount: 0,
    errorMessage: '',
    isResponseReceived: false,
  });
});


it('Reducer SetDiscount success', () => {
  expect(cartReducer(initialState, {type: CartAction.SetDiscountPercent, payload: 15})).toEqual({
    cartItems: mockCartItems,
    discount: 15,
    errorMessage: '',
    isResponseReceived: true,
  });
});


it('Reducer SetErrorMessage success', () => {
  expect(cartReducer(initialState, {type: CartAction.SetErrorMessage, payload:'Mock error'})).toEqual({
    cartItems: mockCartItems,
    discount: 0,
    errorMessage: 'Mock error',
    isResponseReceived: false,
  });
});

it('Reducer SetIsResponseReceived success', () => {
  expect(cartReducer(initialState, {type: CartAction.SetIsResponseReceived, payload:true})).toEqual({
    cartItems: mockCartItems,
    discount: 0,
    errorMessage: '',
    isResponseReceived: true,
  });
});

