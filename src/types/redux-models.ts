import {CartItemModel, GuitarModel, GuitarStringCount, GuitarType} from './guitar-model';
import {SortDirection, SortType} from '../utils/utils';

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

export interface CurrentGuitarStateModel {
    currentGuitar: GuitarModel | null;
    isResponseReceived: boolean;
    errorMsg: string;
}


export interface CartStateModel {
  cartItems: CartItemModel [];
  discount: number;
  errorMessage: string;
  isResponseReceived: boolean;
}


export interface StateModel {
    guitars: GuitarsStateModel,
    currentGuitar: CurrentGuitarStateModel
    cart: CartStateModel
}
