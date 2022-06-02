import {GuitarsStateModel} from '../../types/redux-models';
import {GuitarsAction, guitarsReducer} from './guitars-reducer';
import {MOCK_ERROR, mockGuitars} from '../../utils/test-utils';
import {MAX_PRICE_INITIAL_VALUE, MIN_PRICE_INITIAL_VALUE, SortDirection, SortType} from '../../utils/utils';
import {GuitarStringCount, GuitarType} from '../../types/guitar-model';


const initialState:GuitarsStateModel = {
  guitars: [],
  searchGuitarName: '',
  sortDirection: SortDirection.None,
  sortType:SortType.Price,
  guitarsStrings: [],
  guitarsTypes: [],
  minPrice: MIN_PRICE_INITIAL_VALUE,
  maxPrice: MAX_PRICE_INITIAL_VALUE,
  isResponseReceived: false,
  errorMsg: '',
};


it('Reducer Guitars setGuitars  success', () => {
  expect(guitarsReducer(initialState, {type: GuitarsAction.SetGuitars, payload: mockGuitars})).toEqual({
    guitars: mockGuitars,
    isResponseReceived: true,
    errorMsg: '',
    guitarsStrings: [],
    guitarsTypes: [],
    maxPrice: MAX_PRICE_INITIAL_VALUE,
    minPrice: MIN_PRICE_INITIAL_VALUE,
    nameFilter: '',
    sortDirection: SortDirection.None,
    sortType: SortType.Price,
  });
});


it('Reducer Guitars setError  success', () => {
  expect(guitarsReducer(initialState, {type: GuitarsAction.SetError, payload: MOCK_ERROR})).toEqual({
    guitars: [],
    isResponseReceived: true,
    errorMsg: MOCK_ERROR,
    guitarsStrings: [],
    guitarsTypes: [],
    maxPrice: MAX_PRICE_INITIAL_VALUE,
    minPrice: MIN_PRICE_INITIAL_VALUE,
    nameFilter: '',
    sortDirection: SortDirection.None,
    sortType: SortType.Price,
  });
});


it('Reducer Guitars setIsResponseReceived success', () => {
  expect(guitarsReducer(initialState, {type: GuitarsAction.SetIsResponseReceived, payload: true})).toEqual({
    guitars: [],
    isResponseReceived: true,
    errorMsg: '',
    guitarsStrings: [],
    guitarsTypes: [],
    maxPrice: MAX_PRICE_INITIAL_VALUE,
    minPrice: MIN_PRICE_INITIAL_VALUE,
    nameFilter: '',
    sortDirection: SortDirection.None,
    sortType: SortType.Price,
  });
});


it('Reducer Guitars setGuitarsTypes success', () => {
  expect(guitarsReducer(initialState, {type: GuitarsAction.SetGuitarsTypes, payload: [GuitarType.Acoustic]})).toEqual({
    guitars: [],
    isResponseReceived: false,
    errorMsg: '',
    guitarsStrings: [],
    guitarsTypes: [GuitarType.Acoustic],
    maxPrice: MAX_PRICE_INITIAL_VALUE,
    minPrice: MIN_PRICE_INITIAL_VALUE,
    nameFilter: '',
    sortDirection: SortDirection.None,
    sortType: SortType.Price,
  });
});

it('Reducer Guitars setNoOfStrings success', () => {
  expect(guitarsReducer(initialState, {type: GuitarsAction.SetNoOfStrings, payload: [GuitarStringCount.Seven, GuitarStringCount.Four]})).toEqual({
    guitars: [],
    isResponseReceived: false,
    errorMsg: '',
    guitarsStrings: [GuitarStringCount.Seven, GuitarStringCount.Four],
    guitarsTypes: [],
    maxPrice: MAX_PRICE_INITIAL_VALUE,
    minPrice: MIN_PRICE_INITIAL_VALUE,
    nameFilter: '',
    sortDirection: SortDirection.None,
    sortType: SortType.Price,
  });
});

it('Reducer Guitars setMinPrice success', () => {
  expect(guitarsReducer(initialState, {type: GuitarsAction.SetMinPrice, payload: 5})).toEqual({
    guitars: [],
    isResponseReceived: false,
    errorMsg: '',
    guitarsStrings: [],
    guitarsTypes: [],
    maxPrice: MAX_PRICE_INITIAL_VALUE,
    minPrice: 5,
    nameFilter: '',
    sortDirection: SortDirection.None,
    sortType: SortType.Price,
  });
});

it('Reducer Guitars setMaxPrice success', () => {
  expect(guitarsReducer(initialState, {type: GuitarsAction.SetMaxPrice, payload: 5})).toEqual({
    guitars: [],
    isResponseReceived: false,
    errorMsg: '',
    guitarsStrings: [],
    guitarsTypes: [],
    maxPrice: 5,
    minPrice: MIN_PRICE_INITIAL_VALUE,
    nameFilter: '',
    sortDirection: SortDirection.None,
    sortType: SortType.Price,
  });
});

it('Reducer Guitars setNameFilter success', () => {
  expect(guitarsReducer(initialState, {type: GuitarsAction.SetNameSearch, payload: 'mockText'})).toEqual({
    guitars: [],
    isResponseReceived: false,
    errorMsg: '',
    guitarsStrings: [],
    guitarsTypes: [],
    maxPrice: MIN_PRICE_INITIAL_VALUE,
    minPrice: MIN_PRICE_INITIAL_VALUE,
    nameFilter: 'mockText',
    sortDirection: SortDirection.None,
    sortType: SortType.Price,
  });
});

it('Reducer Guitars setSortDirection success', () => {
  expect(guitarsReducer(initialState, {type: GuitarsAction.SetSortDirection, payload: SortDirection.LowToHigh})).toEqual({
    guitars: [],
    isResponseReceived: false,
    errorMsg: '',
    guitarsStrings: [],
    guitarsTypes: [],
    maxPrice: MIN_PRICE_INITIAL_VALUE,
    minPrice: MIN_PRICE_INITIAL_VALUE,
    nameFilter: '',
    sortDirection: SortDirection.LowToHigh,
    sortType: SortType.Price,
  });
});

it('Reducer Guitars setSortType success', () => {
  expect(guitarsReducer(initialState, {type: GuitarsAction.SetSortType, payload: SortType.Popularity})).toEqual({
    guitars: [],
    isResponseReceived: false,
    errorMsg: '',
    guitarsStrings: [],
    guitarsTypes: [],
    maxPrice: MIN_PRICE_INITIAL_VALUE,
    minPrice: MIN_PRICE_INITIAL_VALUE,
    nameFilter: '',
    sortDirection: SortDirection.None,
    sortType: SortType.Popularity,
  });
});
