
import {GuitarReducerActionModel, GuitarsStateModel} from '../../types/redux-models';

import { SortDirection, SortType} from '../../utils/utils';
import {GuitarsAction} from './guitars-actions';


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


export const guitarsReducer = (state: GuitarsStateModel = initialState, action:GuitarReducerActionModel) => {
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

