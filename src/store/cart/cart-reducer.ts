
import {CartReducerActionModel, CartStateModel} from '../../types/redux-models';

import {CartAction} from './cart-actions';
import { INITIAL_CART_ITEM_COUNT, MAX_CART_ITEM_COUNT} from '../../utils/utils';
import {CartItemModel} from '../../types/guitar-model';


const initialState: CartStateModel = {
  cartItems: [],
  discount: 0,
  errorMessage: '',
  isResponseReceived: false,
};


export const cartReducer = (state: CartStateModel = initialState, action: CartReducerActionModel ) => {
  switch (action.type) {
    case CartAction.AddOneToCartItems:
      if (state.cartItems.length > 0) {
        let newCartItems = [...state.cartItems];
        const guitar = action.payload;
        const isExists = newCartItems.find((cartItem) => cartItem.guitar.id === guitar.id);
        if (isExists) {
          newCartItems = newCartItems.map((cartItem) => {
            const newItem = {...cartItem};
            if (cartItem.guitar.id === guitar.id && newItem.count < MAX_CART_ITEM_COUNT) {
              newItem.count++;
            }
            return newItem;
          });
        } else {
          newCartItems.push({guitar, count: INITIAL_CART_ITEM_COUNT});
        }
        return Object.assign({}, state, {
          cartItems: newCartItems,
        });

      }
      return Object.assign({}, state, {
        cartItems: [{guitar: action.payload, count: 1}],
      });

    case CartAction.AddCustomToCartItems:
      if (state.cartItems.find((cartItem) => cartItem.guitar.id === action.payload.guitar.id)) {
        const guitarWithCount = action.payload as CartItemModel;
        let newCartItems = [...state.cartItems];
        newCartItems = newCartItems.map((cartItem) => {
          const newItem = {...cartItem};
          if (cartItem.guitar.id === guitarWithCount.guitar.id) {
            newItem.count = guitarWithCount.count > 99 ? 99 : guitarWithCount.count;
          }
          return newItem;
        });
        return Object.assign({}, state, {
          cartItems: newCartItems,
        });
      }

      return Object.assign({}, state, {
        cartItems: [...state.cartItems],
      });

    case CartAction.DeleteOneFromCartItems:
      if(state.cartItems.find((cartItem) => cartItem.guitar.id === action.payload.id)){
        let newCartItems = [...state.cartItems];
        newCartItems = newCartItems.map((cartItem) =>{
          const newItem = {...cartItem};
          if(cartItem.guitar.id === action.payload.id){
            newItem.count--;
          }
          return newItem;
        });
        return Object.assign({}, state, {
          cartItems: newCartItems,
        });
      }
      return Object.assign({}, state, {
        cartItems: [...state.cartItems],
      });

    case CartAction.DeleteFromCartItems:
      return Object.assign({}, state, {
        cartItems: [...state.cartItems].filter((cartItem) => cartItem.guitar.id !== action.payload.id),
      });
    case CartAction.SetDiscountPercent:
      return Object.assign({}, state, {
        discount: action.payload,
        isResponseReceived: true,
      });
    case CartAction.SetErrorMessage:
      return Object.assign({}, state, {
        errorMessage: action.payload,
      });
    case CartAction.SetIsResponseReceived:
      return Object.assign({}, state, {
        isResponseReceived: action.payload,
      });

  }
  return state;
};

