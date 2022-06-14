import {CartItemModel, GuitarModel} from '../../types/guitar-model';

export enum CartAction {
  AddOneToCartItems = 'cart/add-one-to-cart-items',
  AddCustomToCartItems = 'cart/add-custom-to-cart-items',
  DeleteOneFromCartItems = 'cart/delete-one-from-cart-items',
  DeleteFromCartItems ='cart/delete-from-cart-items',
  SetDiscountPercent ='cart/set-discount-percent',
  SetErrorMessage = 'cart/set-error-message'
}

export const CartActionCreator = {
  setAddOneToCartItems(guitar: GuitarModel) {
    return {type: CartAction.AddOneToCartItems, payload: guitar};
  },
  setAddCustomToCartItems(guitarWithCount: CartItemModel) {
    return {type: CartAction.AddCustomToCartItems, payload: guitarWithCount};
  },
  setDeleteOneFromCartItems(guitar: GuitarModel) {
    return {type: CartAction.DeleteOneFromCartItems, payload: guitar};
  },
  setDeleteFromCartItems(guitar: GuitarModel) {
    return {type: CartAction.DeleteFromCartItems, payload: guitar};
  },
  setDiscountPercent(discount: number) {
    return {type: CartAction.SetDiscountPercent, payload: discount};
  },
  setErrorMessage(error: string) {
    return {type: CartAction.SetErrorMessage, payload: error};
  },
};
