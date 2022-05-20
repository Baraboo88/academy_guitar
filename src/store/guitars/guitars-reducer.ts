import { GuitarModel} from '../../types/guitar-model';
import {GuitarsStateModel, StateModel} from '../../types/redux-models';
import {AppDispatch} from '../../index';
import { AxiosStatic} from 'axios';
import {ErrorMsg, ResponseStatus} from '../../utils/utils';

export enum GuitarsAction {
    SetGuitars = 'guitars-set-guitars',
    SetError = 'guitars-set-error',
    SetIsResponseReceived = 'guitars-set-is-response-received',
}

const initialState: GuitarsStateModel = {
  guitars: [],
  isResponseReceived: false,
  errorMsg: '',
};


const resetIsResponseReceivedAndError = (dispatch: AppDispatch) => {
  dispatch(GuitarsActionCreator.setError(''));
  dispatch(GuitarsActionCreator.setIsResponseReceived(false));
};


export const GuitarsOperation = {
  getGuitars() {
    return (dispatch: AppDispatch, state: StateModel, api: AxiosStatic) => {
      resetIsResponseReceivedAndError(dispatch);
      api.get<GuitarModel []>('/guitars?_limit=27')
        .then((response) => {
          dispatch(GuitarsActionCreator.setGuitars(response.data));
        })
        .catch((error) => {
          if (error.response.status === ResponseStatus.BadRequest) {
            dispatch(GuitarsActionCreator.setError(ErrorMsg.Other));
          }
          dispatch(GuitarsActionCreator.setError(error.message));
        });
    };
  },
  getCommentsCount(guitars: GuitarModel []) {
    return (dispatch: AppDispatch, state: StateModel, api: AxiosStatic) => {
      Promise.all(guitars.map((el) => api.get((`/guitars/${el.id}/comments`))))
        .then((responses) =>{
          const guitarsWithComments: GuitarModel [] = [];
          guitars.forEach((guitar, index) => {
            let guitarWithComment: GuitarModel;
            if(responses[index].data && responses[index].data.length > 0){
              guitarWithComment = Object.assign({}, guitar, {
                comments: responses[index].data,
              });
            } else {
              guitarWithComment = Object.assign({}, guitar, {
                comments: [],
              });
            }
            guitarsWithComments.push(guitarWithComment);
          });
          dispatch(GuitarsActionCreator.setGuitars(guitarsWithComments));

        })
        .catch((error) => {
          if (error.response.status === ResponseStatus.BadRequest) {
            dispatch(GuitarsActionCreator.setError(ErrorMsg.Other));
          }
          dispatch(GuitarsActionCreator.setError(error.message));
        });
    };
  },
};


export const GuitarsActionCreator = {
  setGuitars(guitars: GuitarModel[]) {
    return {type: GuitarsAction.SetGuitars, payload: guitars};
  },
  setError(error: string) {
    return {type: GuitarsAction.SetError, payload: error};
  },
  setIsResponseReceived(isResponseReceived: boolean) {
    return {type: GuitarsAction.SetIsResponseReceived, payload: isResponseReceived};
  },
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const guitarsReducer = (state: GuitarsStateModel = initialState, action:any) => {
  switch (action.type) {
    case GuitarsAction.SetGuitars:
      return Object.assign({}, state, {
        guitars: action.payload,
        isResponseReceived: true,
        errorMsg: '',
      });
    case GuitarsAction.SetError:
      return Object.assign({}, state, {errorMsg: action.payload, isResponseReceived: true});
    case GuitarsAction.SetIsResponseReceived:
      return Object.assign({}, state, {isResponseReceived: action.payload});
  }
  return state;
};

