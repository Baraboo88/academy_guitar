import {GuitarModel} from '../../types/guitar-model';
import { DataStateModel, StateModel} from '../../types/redux-models';
import {AppDispatch} from '../../index';
import {AxiosInstance} from 'axios';

export enum DataAction {
    SetGuitars = 'set-guitars',
    SetError = 'set-error',
    SetIsResponseReceived = 'set-is-response-received',
}

export enum ResponseStatus {
    Ok = 201,
    BadRequest = 400,
    NotFound = 404,

}

export enum ErrorMsg {
    Other = 'Something went wrong...',
    NotFound = 'not-found',
}

const initialState: DataStateModel = {
  guitars: [],
  isResponseReceived: false,
  errorMsg: '',
};


const resetIsResponseReceivedAndError = (dispatch: AppDispatch) => {
  dispatch(DataActionCreator.setError(''));
  dispatch(DataActionCreator.setIsResponseReceived(false));
};


export const DataOperation = {
  getGuitars() {
    return (dispatch: AppDispatch, state: StateModel, api: AxiosInstance) => {
      resetIsResponseReceivedAndError(dispatch);
      api.get<GuitarModel []>('/guitars')
        .then((response) => {
          dispatch(DataActionCreator.setGuitars(response.data));
        })
        .catch((error) => {
          if (error.response.status === ResponseStatus.BadRequest) {
            dispatch(DataActionCreator.setError(ErrorMsg.Other));
          }
          dispatch(DataActionCreator.setError(error.message));
        });
    };
  },
};


export const DataActionCreator = {
  setGuitars(quests: GuitarModel[]) {
    return {type: DataAction.SetGuitars, payload: quests};
  },
  setError(error: string) {
    return {type: DataAction.SetError, payload: error};
  },
  setIsResponseReceived(isResponseReceived: boolean) {
    return {type: DataAction.SetIsResponseReceived, payload: isResponseReceived};
  },
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const dataReducer = (state: DataStateModel = initialState, action:any) => {
  switch (action.type) {
    case DataAction.SetGuitars:
      return Object.assign({}, state, {
        guitars: action.payload,
        isResponseReceived: true,
        errorMsg: '',
      });
    case DataAction.SetError:
      return Object.assign({}, state, {errorMsg: action.payload, isResponseReceived: true});
    case DataAction.SetIsResponseReceived:
      return Object.assign({}, state, {isResponseReceived: action.payload});
  }
  return state;
};

