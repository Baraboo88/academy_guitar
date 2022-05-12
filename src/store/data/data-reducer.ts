import {GuitarModel} from '../../types/guitar-model';
import { DataStateModel, StateModel} from '../../types/redux-models';
import {AppDispatch} from '../../index';
import { AxiosStatic} from 'axios';

export enum DataAction {
    SetGuitars = 'set-guitars',
    SetCurrentGuitar = 'set-current-guitar',
    SetGuitarsCommentsCount = 'set-guitars-comments-count',
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
  currentGuitar: null,
  isResponseReceived: false,
  errorMsg: '',
};


const resetIsResponseReceivedAndError = (dispatch: AppDispatch) => {
  dispatch(DataActionCreator.setError(''));
  dispatch(DataActionCreator.setIsResponseReceived(false));
};


export const DataOperation = {
  getGuitars() {
    return (dispatch: AppDispatch, state: StateModel, api: AxiosStatic) => {
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
  getGuitarById(id: number) {
    return (dispatch: AppDispatch, state: StateModel, api: AxiosStatic) => {
      resetIsResponseReceivedAndError(dispatch);
      api.get<GuitarModel>(`/guitars/${id}`)
        .then((response) => {
          dispatch(DataActionCreator.setCurrentGuitar(response.data));
        })
        .catch((error) => {
          if (error.response.status === ResponseStatus.BadRequest) {
            dispatch(DataActionCreator.setError(ErrorMsg.Other));
          }
          dispatch(DataActionCreator.setError(error.message));
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
                commentsCount: responses[index].data.length,
              });
            } else {
              guitarWithComment = Object.assign({}, guitar, {
                commentsCount: 0,
              });
            }
            guitarsWithComments.push(guitarWithComment);
          });
          dispatch(DataActionCreator.setGuitars(guitarsWithComments));

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
  setCurrentGuitar(quests: GuitarModel | null) {
    return {type: DataAction.SetCurrentGuitar, payload: quests};
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
    case DataAction.SetCurrentGuitar:
      return Object.assign({}, state, {
        currentGuitar: action.payload,
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

