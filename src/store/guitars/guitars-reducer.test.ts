import { GuitarsStateModel} from '../../types/redux-models';
import { GuitarsAction, guitarsReducer} from './guitars-reducer';
import {MOCK_ERROR, mockGuitars} from '../../utils/test-utils';
import {MAX_PRICE_INICIAL_VALUE, MIN_PRICE_INICIAL_VALUE, SortDirection, SortType} from '../../utils/utils';


const initialState:GuitarsStateModel = {
  guitars: [],
  nameFilter: '',
  sortDirection: SortDirection.None,
  sortType:SortType.Price,
  guitarsStrings: [],
  guitarsTypes: [],
  minPrice: MIN_PRICE_INICIAL_VALUE,
  maxPrice: MAX_PRICE_INICIAL_VALUE,
  isResponseReceived: false,
  errorMsg: '',
};


it('Reducer Guitars setGuitars  success', () => {
  expect(guitarsReducer(initialState, {type: GuitarsAction.SetGuitars, payload: mockGuitars})).toEqual({
    guitars: mockGuitars,
    isResponseReceived: true,
    errorMsg: '',
  });
});


it('Reducer Guitars setError  success', () => {
  expect(guitarsReducer(initialState, {type: GuitarsAction.SetError, payload: MOCK_ERROR})).toEqual({
    guitars: [],
    isResponseReceived: true,
    errorMsg: MOCK_ERROR,
  });
});


it('Reducer Guitars setIsResponseReceived   success', () => {
  expect(guitarsReducer(initialState, {type: GuitarsAction.SetIsResponseReceived, payload: false})).toEqual({
    guitars: [],
    isResponseReceived: false,
    errorMsg: '',
  });
});
