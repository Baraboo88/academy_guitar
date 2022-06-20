import {GuitarModel, GuitarStringCount, GuitarType} from '../../types/guitar-model';
import {ErrorMsg, ResponseStatus, SortDirection, SortType} from '../../utils/utils';
import {AppDispatch, RootState} from '../../index';
import {ThunkAction} from 'redux-thunk';
import {AxiosStatic} from 'axios';
import {GuitarReducerActionWithoutPayload} from '../../types/redux-models';

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


const resetIsResponseReceivedAndError = (dispatch: AppDispatch) => {
  dispatch(GuitarsActionCreator.setError(''));
  dispatch(GuitarsActionCreator.setIsResponseReceived(false));
};


export const GuitarsOperation = {
  getGuitars(): ThunkAction<void, RootState, AxiosStatic, GuitarReducerActionWithoutPayload> {
    return (dispatch, state, api) => {
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
  getCommentsCount(guitars: GuitarModel []): ThunkAction<void, RootState, AxiosStatic, GuitarReducerActionWithoutPayload> {
    return (dispatch, state, api) => {
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
