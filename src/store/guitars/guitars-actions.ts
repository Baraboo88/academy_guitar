import {GuitarModel, GuitarStringCount, GuitarType} from '../../types/guitar-model';
import {SortDirection, SortType} from '../../utils/utils';

export enum GuitarsAction {
  SetGuitars = 'guitars/set-guitars',
  SetNameSearch= 'guitars/set-name-search',
  SetSortDirection = 'guitars/set-sort-direction',
  SetSortType = 'guitars/set-sort-type',
  SetError = 'guitars/set-error',
  SetIsResponseReceived = 'guitars/set-is-response-received',
  SetMinPrice='guitars/set-min-price',
  SetMaxPrice='guitars/set-max-price',
  SetGuitarsTypes='guitars/set-guitars-type',
  SetNoOfStrings='guitars/set-guitars-strings'
}


export const GuitarsActionCreator = {
  setGuitars(guitars: GuitarModel[]) {
    return {type: GuitarsAction.SetGuitars, payload: guitars};
  },
  setSearchGuitarName(filter: string) {
    return {type: GuitarsAction.SetNameSearch, payload: filter};
  },
  setGuitarsSortDirection(sortDirection: SortDirection) {
    return {type: GuitarsAction.SetSortDirection, payload: sortDirection};
  },
  setGuitarsSortType(sortType: SortType) {
    return {type: GuitarsAction.SetSortType, payload: sortType};
  },
  setMinPrice(minPrice: number){
    return {type: GuitarsAction.SetMinPrice, payload:minPrice};
  },
  setMaxPrice(maxPrice:number){
    return {type: GuitarsAction.SetMaxPrice, payload:maxPrice};
  },
  setGuitarsTypes(guitarTypes: GuitarType []){
    return {type: GuitarsAction.SetGuitarsTypes, payload: guitarTypes};
  },
  setNoOfStrings(noOfStrings: GuitarStringCount []){
    return {type: GuitarsAction.SetNoOfStrings, payload: noOfStrings};
  },
  setError(error: string) {
    return {type: GuitarsAction.SetError, payload: error};
  },
  setIsResponseReceived(isResponseReceived: boolean) {
    return {type: GuitarsAction.SetIsResponseReceived, payload: isResponseReceived};
  },
};
