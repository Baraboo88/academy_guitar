import {GuitarModel, GuitarStringCount, GuitarType} from '../../types/guitar-model';
import {GuitarsStateModel, StateModel} from '../../types/redux-models';
import {AppDispatch} from '../../index';
import {AxiosStatic} from 'axios';
import {ErrorMsg, ResponseStatus, SortDirection, SortType} from '../../utils/utils';

export enum GuitarsAction {
    SetGuitars = 'guitars/set-guitars',
    SetNameFilter= 'guitars/set-name-filter',
    SetSortDirection = 'guitars/set-sort-direction',
    SetSortType = 'guitars/set-sort-type',
    SetError = 'guitars/set-error',
    SetIsResponseReceived = 'guitars/set-is-response-received',
    SetMinPrice='guitars/set-min-price',
    SetMaxPrice='guitars/set-max-price',
    SetGuitarsTypes='guitars/set-guitars-type',
    SetNoOfStrings='guitars/set-guitars-strings'
}

const initialState: GuitarsStateModel = {
  guitars: [],
  nameFilter: '',
  minPrice: -1,
  maxPrice: -1,
  guitarsStrings: [],
  guitarsTypes: [],
  sortDirection: SortDirection.None,
  sortType: SortType.None,
  isResponseReceived: false,
  errorMsg: '',
};


const resetIsResponseReceivedAndError = (dispatch: AppDispatch) => {
  dispatch(GuitarsActionCreator.setError(''));
  dispatch(GuitarsActionCreator.setIsResponseReceived(false));
};


export const GuitarsOperation = {
  getGuitars() {
    return (dispatch: AppDispatch, state: StateModel, api: AxiosStatic) => {
      resetIsResponseReceivedAndError(dispatch);
      api.get<GuitarModel []>('/guitars?_limit=27')
        .then((response) => {
          dispatch(GuitarsActionCreator.setGuitars(response.data));
        })
        .catch((error) => {
          if (error.response.status === ResponseStatus.BadRequest) {
            dispatch(GuitarsActionCreator.setError(ErrorMsg.Other));
          }
          dispatch(GuitarsActionCreator.setError(error.message));
        });
    };
  },
  getCommentsCount(guitars: GuitarModel []) {
    return (dispatch: AppDispatch, state: StateModel, api: AxiosStatic) => {
      Promise.all(guitars.map((el) => api.get((`/guitars/${el.id}/comments`))))
        .then((responses) =>{
          const guitarsWithComments: GuitarModel [] = [];
          guitars.forEach((guitar, index) => {
            let guitarWithComment: GuitarModel;
            if(responses[index].data && responses[index].data.length > 0){
              guitarWithComment = Object.assign({}, guitar, {
                comments: responses[index].data,
              });
            } else {
              guitarWithComment = Object.assign({}, guitar, {
                comments: [],
              });
            }
            guitarsWithComments.push(guitarWithComment);
          });
          dispatch(GuitarsActionCreator.setGuitars(guitarsWithComments));

        })
        .catch((error) => {
          if (error.response.status === ResponseStatus.BadRequest) {
            dispatch(GuitarsActionCreator.setError(ErrorMsg.Other));
          }
          dispatch(GuitarsActionCreator.setError(error.message));
        });
    };
  },
};


export const GuitarsActionCreator = {
  setGuitars(guitars: GuitarModel[]) {
    return {type: GuitarsAction.SetGuitars, payload: guitars};
  },
  setGuitarsNameFilter(filter: string) {
    return {type: GuitarsAction.SetNameFilter, payload: filter};
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

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const guitarsReducer = (state: GuitarsStateModel = initialState, action:any) => {
  switch (action.type) {
    case GuitarsAction.SetGuitars:
      return Object.assign({}, state, {
        guitars: action.payload,
        isResponseReceived: true,
        errorMsg: '',
      });
    case GuitarsAction.SetNameFilter:
      return Object.assign({}, state, {nameFilter: action.payload});
    case GuitarsAction.SetSortDirection:
      return Object.assign({}, state, {sortDirection: action.payload});
    case GuitarsAction.SetSortType:
      return Object.assign({}, state, {sortType: action.payload});
    case GuitarsAction.SetMinPrice:
      return Object.assign({}, state, {minPrice: action.payload});
    case GuitarsAction.SetMaxPrice:
      return Object.assign({}, state, {maxPrice: action.payload});
    case GuitarsAction.SetGuitarsTypes:
      return Object.assign({}, state, {guitarsTypes: action.payload});
    case GuitarsAction.SetNoOfStrings:
      return Object.assign({}, state, {guitarsStrings: action.payload});
    case GuitarsAction.SetError:
      return Object.assign({}, state, {errorMsg: action.payload, isResponseReceived: true});
    case GuitarsAction.SetIsResponseReceived:
      return Object.assign({}, state, {isResponseReceived: action.payload});
  }
  return state;
};

