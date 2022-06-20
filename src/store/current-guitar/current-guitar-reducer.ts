
import {CurrentGuitarReducerActionModel, CurrentGuitarStateModel} from '../../types/redux-models';

import {CurrentGuitarAction} from './current-guitar-actions';


const initialState: CurrentGuitarStateModel = {
  currentGuitar: null,
  isResponseReceived: false,
  errorMsg: '',
};

export const currentGuitarReducer = (state: CurrentGuitarStateModel = initialState, action:CurrentGuitarReducerActionModel) => {
  switch (action.type) {
    case CurrentGuitarAction.SetCurrentGuitar:
      return Object.assign({}, state, {
        currentGuitar: action.payload,
        isResponseReceived: true,
        errorMsg: '',
      });
    case CurrentGuitarAction.SetError:
      return Object.assign({}, state, {errorMsg: action.payload, isResponseReceived: true});
    case CurrentGuitarAction.SetIsResponseReceived:
      return Object.assign({}, state, {isResponseReceived: action.payload});
  }
  return state;
};

