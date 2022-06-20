import {CartItemModel, GuitarModel, GuitarStringCount, GuitarType} from './guitar-model';
import {SortDirection, SortType} from '../utils/utils';
import {CartAction} from '../store/cart/cart-actions';
import {GuitarsAction} from '../store/guitars/guitars-actions';
import {CurrentGuitarAction} from '../store/current-guitar/current-guitar-actions';


export interface StateModel {
    guitars: GuitarsStateModel,
    currentGuitar: CurrentGuitarStateModel
    cart: CartStateModel
}


//CART MODELS
export interface CartStateModel {
  cartItems: CartItemModel [];
  discount: number;
  errorMessage: string;
  isResponseReceived: boolean;
}

type  CartActionAddCustomToCartItems = {type: CartAction.AddCustomToCartItems};
type CartActionDeleteOneFromCartItems = {type: CartAction.DeleteOneFromCartItems};
type CartActionAddOneToCartItems = {type: CartAction.AddOneToCartItems};
type CartActionDeleteFromCartItems = {type: CartAction.DeleteFromCartItems};
type CartActionSetDiscountPercent = {type: CartAction.SetDiscountPercent};
type CartActionSetErrorMessage ={type: CartAction.SetErrorMessage};
type CartActionSetIsResponseReceived = {type: CartAction.SetIsResponseReceived};

export type CartReducerActionWithoutPayload = CartActionAddCustomToCartItems
  | CartActionDeleteOneFromCartItems
  | CartActionAddOneToCartItems
  | CartActionDeleteFromCartItems
  | CartActionSetDiscountPercent
  | CartActionSetErrorMessage
  | CartActionSetIsResponseReceived

export type CartReducerActionModel =  CartActionAddCustomToCartItems & {payload: CartItemModel}
  | CartActionDeleteOneFromCartItems & {payload: GuitarModel}
  | CartActionAddOneToCartItems & {payload: GuitarModel}
  | CartActionDeleteFromCartItems & {type: CartAction.DeleteFromCartItems, payload: GuitarModel}
  | CartActionSetDiscountPercent & {payload: number}
  | CartActionSetErrorMessage & { payload: string}
  | CartActionSetIsResponseReceived & {payload: boolean}

//GUITARS MODELS
export interface GuitarsStateModel {
  guitars: GuitarModel [];
  searchGuitarName: string;
  sortDirection: SortDirection;
  sortType: SortType;
  minPrice: number;
  maxPrice: number;
  guitarsTypes: GuitarType [],
  guitarsStrings: GuitarStringCount[]
  isResponseReceived: boolean;
  errorMsg: string;
}

type GuitarsActionSetGuitars = {type: GuitarsAction.SetGuitars}
type GuitarsActionSetNameSearch =  {type: GuitarsAction.SetNameSearch}
type GuitarsActionSetSortDirection = {type: GuitarsAction.SetSortDirection}
type GuitarsActionSetSortType = {type: GuitarsAction.SetSortType}
type GuitarsActionSetMinPrice = {type: GuitarsAction.SetMinPrice}
type GuitarsActionSetMaxPrice = {type: GuitarsAction.SetMaxPrice}
type GuitarsActionSetGuitarsTypes = {type: GuitarsAction.SetGuitarsTypes}
type GuitarsActionSetNoOfStrings = {type: GuitarsAction.SetNoOfStrings}
type GuitarsActionSetError = {type: GuitarsAction.SetError}
type GuitarsActionSetIsResponseReceived = {type: GuitarsAction.SetIsResponseReceived}


export type GuitarReducerActionWithoutPayload = GuitarsActionSetGuitars
  | GuitarsActionSetNameSearch
  | GuitarsActionSetSortDirection
  | GuitarsActionSetSortType
  | GuitarsActionSetMinPrice
  | GuitarsActionSetMaxPrice
  | GuitarsActionSetGuitarsTypes
  | GuitarsActionSetNoOfStrings
  | GuitarsActionSetError
  | GuitarsActionSetIsResponseReceived

export type GuitarReducerActionModel = GuitarsActionSetGuitars & { payload: GuitarModel []}
  | GuitarsActionSetNameSearch & { payload: string}
  | GuitarsActionSetSortDirection & { payload: SortDirection}
  | GuitarsActionSetSortType & { payload: SortType}
  | GuitarsActionSetMinPrice & { payload: number}
  | GuitarsActionSetMaxPrice & { payload: number}
  | GuitarsActionSetGuitarsTypes & { payload:  GuitarType []}
  | GuitarsActionSetNoOfStrings & { payload: GuitarStringCount []}
  | GuitarsActionSetError & { payload:string}
  | GuitarsActionSetIsResponseReceived & { payload:boolean}

//CURRENT GUITAR MODELS

export interface CurrentGuitarStateModel {
  currentGuitar: GuitarModel | null;
  isResponseReceived: boolean;
  errorMsg: string;
}


type CurrentGuitarActionSetCurrentGuitar = {type: CurrentGuitarAction.SetCurrentGuitar}
type CurrentGuitarActionSetError =  {type: CurrentGuitarAction.SetError}
type CurrentGuitarActionSetIsResponseReceived = {type: CurrentGuitarAction.SetIsResponseReceived}


export type CurrentGuitarReducerActionWithoutPayload = CurrentGuitarActionSetCurrentGuitar
  | CurrentGuitarActionSetError
  | CurrentGuitarActionSetIsResponseReceived

export type CurrentGuitarReducerActionModel = CurrentGuitarActionSetCurrentGuitar & { payload: GuitarModel}
  | CurrentGuitarActionSetError & { payload: string}
  | CurrentGuitarActionSetIsResponseReceived & { payload: boolean}
