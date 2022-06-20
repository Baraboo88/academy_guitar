import {CartItemModel, GuitarModel} from '../../types/guitar-model';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../../index';
import {AxiosStatic} from 'axios';

import {ErrorMsg, ResponseStatus} from '../../utils/utils';
import {CartReducerActionWithoutPayload} from '../../types/redux-models';


export enum CartAction {
  AddOneToCartItems = 'cart/add-one-to-cart-items',
  AddCustomToCartItems = 'cart/add-custom-to-cart-items',
  DeleteOneFromCartItems = 'cart/delete-one-from-cart-items',
  DeleteFromCartItems ='cart/delete-from-cart-items',
  SetDiscountPercent ='cart/set-discount-percent',
  SetErrorMessage = 'cart/set-error-message',
  SetIsResponseReceived = 'cart/set-is-response-received'
}

export const CartOperation = {
  getPromoDiscount(promoCode: string): ThunkAction<void, RootState, AxiosStatic, CartReducerActionWithoutPayload> {
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


export const CartActionCreator = {
  addOneToCartItems(guitar: GuitarModel) {
    return {type: CartAction.AddOneToCartItems, payload: guitar};
  },
  addCustomToCartItems(guitarWithCount: CartItemModel) {
    return {type: CartAction.AddCustomToCartItems, payload: guitarWithCount};
  },
  deleteOneFromCartItems(guitar: GuitarModel) {
    return {type: CartAction.DeleteOneFromCartItems, payload: guitar};
  },
  deleteFromCartItems(guitar: GuitarModel) {
    return {type: CartAction.DeleteFromCartItems, payload: guitar};
  },
  setDiscountPercent(discount: number) {
    return {type: CartAction.SetDiscountPercent, payload: discount};
  },
  setErrorMessage(error: string) {
    return {type: CartAction.SetErrorMessage, payload: error};
  },
  setIsResponseReceived(isResponseReceived: boolean) {
    return {type: CartAction.SetIsResponseReceived, payload: isResponseReceived};
  },
};
