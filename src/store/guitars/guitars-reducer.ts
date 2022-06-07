import {GuitarModel} from '../../types/guitar-model';
import {GuitarsStateModel} from '../../types/redux-models';
import {AppDispatch, RootState} from '../../index';
import {AxiosStatic} from 'axios';
import {ErrorMsg, ResponseStatus, SortDirection, SortType} from '../../utils/utils';
import {GuitarsAction, GuitarsActionCreator} from './guitars-actions';
import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';


const initialState: GuitarsStateModel = {
  guitars: [],
  searchGuitarName: '',
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
  getGuitars(): ThunkAction<void, RootState, AxiosStatic, AnyAction> {
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
  getCommentsCount(guitars: GuitarModel []): ThunkAction<void, RootState, AxiosStatic, AnyAction> {
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


/* eslint-disable  @typescript-eslint/no-explicit-any */
export const guitarsReducer = (state: GuitarsStateModel = initialState, action:any) => {
  switch (action.type) {
    case GuitarsAction.SetGuitars:
      return Object.assign({}, state, {
        guitars: action.payload,
        isResponseReceived: true,
        errorMsg: '',
      });
    case GuitarsAction.SetNameSearch:
      return Object.assign({}, state, {searchGuitarName: action.payload});
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

