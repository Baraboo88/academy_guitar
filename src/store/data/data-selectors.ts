import {StateModel} from '../../types/redux-models';

export const getGuitars = (state: StateModel) => state.data.guitars;
export const getDataError = (state: StateModel) => state.data.errorMsg;
export const getDataIsResponseReceived = (state: StateModel) => state.data.isResponseReceived;
