import {DataStateModel} from '../../types/redux-models';
import {DataAction, dataReducer} from './data-reducer';
import {MOCK_ERROR, mockGuitars} from '../../utils/test-utils';

const initialState:DataStateModel = {
  guitars: [],
  currentGuitar: null,
  isResponseReceived: false,
  errorMsg: '',
};


it('Reducer setGuitars  success', () => {
  expect(dataReducer(initialState, {type: DataAction.SetGuitars, payload: mockGuitars})).toEqual({
    guitars: mockGuitars,
    isResponseReceived: true,
    errorMsg: '',
    currentGuitar: null,
  });
});


it('Reducer setCurrentGuitar  success', () => {
  expect(dataReducer(initialState, {type: DataAction.SetCurrentGuitar, payload: mockGuitars[0]})).toEqual({
    guitars: [],
    isResponseReceived: true,
    errorMsg: '',
    currentGuitar: mockGuitars[0],
  });
});


it('Reducer setError  success', () => {
  expect(dataReducer(initialState, {type: DataAction.SetError, payload: MOCK_ERROR})).toEqual({
    guitars: [],
    isResponseReceived: true,
    errorMsg: MOCK_ERROR,
    currentGuitar: null,
  });
});


it('Reducer setIsResponseReceived   success', () => {
  expect(dataReducer(initialState, {type: DataAction.SetIsResponseReceived, payload: false})).toEqual({
    guitars: [],
    isResponseReceived: false,
    errorMsg: '',
    currentGuitar: null,
  });
});
