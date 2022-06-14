

import {CartStateModel} from '../../types/redux-models';

import {CartAction, CartActionCreator} from './cart-actions';
import {ErrorMsg, INITIAL_CART_ITEM_COUNT, MAX_CART_ITEM_COUNT, ResponseStatus} from '../../utils/utils';
import {CartItemModel, GuitarModel} from '../../types/guitar-model';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../../index';
import {AxiosStatic} from 'axios';
import {AnyAction} from 'redux';
import {CurrentGuitarActionCreator} from '../current-guitar/current-guitar-actions';


const initialState: CartStateModel = {
  cartItems: [],
  discount: 0,
  errorMessage: '',
  isResponseReceived: false,
};

export const CartOperation = {
  getPromoDiscount(promoCode: string): ThunkAction<void, RootState, AxiosStatic, AnyAction> {
    return (dispatch, state, api) => {
      dispatch(CartActionCreator.setIsResponseReceived(false));
      api.post<number>('/coupons/', {coupon: promoCode})
        .then((response) => {
          dispatch(CartActionCreator.setDiscountPercent(response.data));
        })
        .catch((error) => {
          if (error.response.status === ResponseStatus.BadRequest) {
            dispatch(CartActionCreator.setErrorMessage(ErrorMsg.NotFound));
          } else {
            dispatch(CartActionCreator.setErrorMessage(error.message));
          }
          dispatch(CartActionCreator.setDiscountPercent(0));
        });
    };
  },
};


/* eslint-disable  @typescript-eslint/no-explicit-any */
export const cartReducer = (state: CartStateModel = initialState, action:any) => {
  switch (action.type) {
    case CartAction.AddOneToCartItems:
      if (state.cartItems.length > 0) {
        let newCartItems = [...state.cartItems];
        const guitar = action.payload as GuitarModel;
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

      } else {
        return Object.assign({}, state, {
          cartItems: [{guitar: action.payload, count: 1}],
        });
      }
    case CartAction.AddCustomToCartItems:
      if (state.cartItems.find((cartItem) => cartItem.guitar.id === action.payload.guitar.id)) {
        let newCartItems = [...state.cartItems];
        const guitarWithCount = action.payload as CartItemModel;
        newCartItems = newCartItems.map((cartItem) => {
          const newItem = {...cartItem};
          if (cartItem.guitar.id === guitarWithCount.guitar.id) {
            if (action.payload.count <= 0) {
              newItem.count = INITIAL_CART_ITEM_COUNT;
            } else {
              newItem.count = guitarWithCount.count > 99 ? 99 : guitarWithCount.count;
            }
          }
          return newItem;
        });
        return Object.assign({}, state, {
          cartItems: newCartItems,
        });
      } else {
        return Object.assign({}, state, {
          cartItems: [...state.cartItems],
        });
      }
    case CartAction.DeleteOneFromCartItems:
    {
      const guitar = action.payload as GuitarModel;
      let newCartItems = [...state.cartItems];
      if(state.cartItems.find((cartItem) => cartItem.guitar.id === guitar.id)){
        newCartItems = newCartItems.map((cartItem) =>{
          const newItem = {...cartItem};
          if(cartItem.guitar.id === guitar.id){
            newItem.count--;
          }
          return newItem;
        });
      }
      return Object.assign({}, state, {
        cartItems: newCartItems,
      });
    }
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

