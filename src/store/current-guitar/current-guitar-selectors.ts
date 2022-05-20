import {StateModel} from '../../types/redux-models';

export const getCurrentGuitar = (state: StateModel) => state.currentGuitar.currentGuitar;
export const getCurrentGuitarError = (state: StateModel) => state.currentGuitar.errorMsg;
export const getCurrentGuitarIsResponseReceived = (state: StateModel) => state.currentGuitar.isResponseReceived;
