import {AddCommentModel, GuitarCommentModel, GuitarModel} from '../../types/guitar-model';
import { DataStateModel, StateModel} from '../../types/redux-models';
import {AppDispatch} from '../../index';
import { AxiosStatic} from 'axios';

export enum DataAction {
    SetGuitars = 'set-guitars',
    SetCurrentGuitar = 'set-current-guitar',
    SetError = 'set-error',
    SetIsResponseReceived = 'set-is-response-received',
}

export enum ResponseStatus {
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
      api.get<GuitarModel []>('/guitars?_limit=27')
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
          } else if (error.response.status === ResponseStatus.NotFound) {
            dispatch(DataActionCreator.setError(ErrorMsg.NotFound));
          } else {
            dispatch(DataActionCreator.setError(error.message));
          }
        });
    };
  },
  getCurrentGuitarComments(guitar: GuitarModel) {
    return (dispatch: AppDispatch, state: StateModel, api: AxiosStatic) => {
      resetIsResponseReceivedAndError(dispatch);
      api.get<GuitarCommentModel []>(`/guitars/${guitar.id}/comments`)
        .then((response) => {
          dispatch(DataActionCreator.setCurrentGuitar(Object.assign({}, guitar, {
            comments: response.data,
          })));
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
                comments: responses[index].data,
              });
            } else {
              guitarWithComment = Object.assign({}, guitar, {
                comments: [],
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
  addComment(guitar: GuitarModel, comment: AddCommentModel) {
    return (dispatch: AppDispatch, state: StateModel, api: AxiosStatic) => {
      resetIsResponseReceivedAndError(dispatch);
      api.post<GuitarCommentModel>('/guitars', comment)
        .then((response) => {
          const newComments= guitar.comments ? [...guitar.comments] : [];
          newComments.unshift(response.data);
          dispatch(DataActionCreator.setCurrentGuitar(Object.assign({}, guitar, {
            comments: newComments,
          })));
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

