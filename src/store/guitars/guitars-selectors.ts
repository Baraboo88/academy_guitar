import {StateModel} from '../../types/redux-models';

export const getGuitars = (state: StateModel) => state.guitars.guitars;
export const getGuitarsError = (state: StateModel) => state.guitars.errorMsg;
export const getGuitarsIsResponseReceived = (state: StateModel) => state.guitars.isResponseReceived;
