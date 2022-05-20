
import {MOCK_ERROR, mockGuitars} from '../../utils/test-utils';
import {CurrentGuitarStateModel} from '../../types/redux-models';
import {CurrentGuitarAction, currentGuitarReducer} from './current-guitar-reducer';

const initialState:CurrentGuitarStateModel = {
  currentGuitar: null,
  isResponseReceived: false,
  errorMsg: '',
};


it('Reducer setCurrentGuitar  success', () => {
  expect(currentGuitarReducer(initialState, {type: CurrentGuitarAction.SetCurrentGuitar, payload: mockGuitars[0]})).toEqual({
    isResponseReceived: true,
    errorMsg: '',
    currentGuitar: mockGuitars[0],
  });
});


it('Reducer CurrentGuitar setError  success', () => {
  expect(currentGuitarReducer(initialState, {type: CurrentGuitarAction.SetError, payload: MOCK_ERROR})).toEqual({
    isResponseReceived: true,
    errorMsg: MOCK_ERROR,
    currentGuitar: null,
  });
});


it('Reducer CurrentGuitar setIsResponseReceived   success', () => {
  expect(currentGuitarReducer(initialState, {type: CurrentGuitarAction.SetIsResponseReceived, payload: false})).toEqual({
    isResponseReceived: false,
    errorMsg: '',
    currentGuitar: null,
  });
});
