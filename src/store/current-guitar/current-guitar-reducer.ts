import {AddCommentModel, GuitarCommentModel, GuitarModel} from '../../types/guitar-model';
import {CurrentGuitarStateModel} from '../../types/redux-models';
import {AppDispatch, RootState} from '../../index';
import { AxiosStatic} from 'axios';
import {ErrorMsg, ResponseStatus} from '../../utils/utils';
import {CurrentGuitarAction, CurrentGuitarActionCreator} from './current-guitar-actions';
import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';


const initialState: CurrentGuitarStateModel = {
  currentGuitar: null,
  isResponseReceived: false,
  errorMsg: '',
};


const resetIsResponseReceivedAndError = (dispatch: AppDispatch) => {
  dispatch(CurrentGuitarActionCreator.setError(''));
  dispatch(CurrentGuitarActionCreator.setIsResponseReceived(false));
};


export const CurrentGuitarOperation = {
  getGuitarById(id: number) : ThunkAction<void, RootState, AxiosStatic, AnyAction>  {
    return (dispatch, state, api) => {
      resetIsResponseReceivedAndError(dispatch);
      api.get<GuitarModel>(`/guitars/${id}`)
        .then((response) => {
          dispatch(CurrentGuitarActionCreator.setCurrentGuitar(response.data));
        })
        .catch((error) => {
          if (error.response.status === ResponseStatus.BadRequest) {
            dispatch(CurrentGuitarActionCreator.setError(ErrorMsg.Other));
          } else if (error.response.status === ResponseStatus.NotFound) {
            dispatch(CurrentGuitarActionCreator.setError(ErrorMsg.NotFound));
          } else {
            dispatch(CurrentGuitarActionCreator.setError(error.message));
          }
        });
    };
  },
  getCurrentGuitarComments(guitar: GuitarModel): ThunkAction<void, RootState, AxiosStatic, AnyAction>  {
    return (dispatch, state, api) => {
      resetIsResponseReceivedAndError(dispatch);
      api.get<GuitarCommentModel []>(`/guitars/${guitar.id}/comments`)
        .then((response) => {
          dispatch(CurrentGuitarActionCreator.setCurrentGuitar(Object.assign({}, guitar, {
            comments: response.data,
          })));
        })
        .catch((error) => {
          if (error.response.status === ResponseStatus.BadRequest) {
            dispatch(CurrentGuitarActionCreator.setError(ErrorMsg.Other));
          }
          dispatch(CurrentGuitarActionCreator.setError(error.message));
        });
    };
  },
  addComment(guitar: GuitarModel, comment: AddCommentModel): ThunkAction<void, RootState, AxiosStatic, AnyAction>  {
    return (dispatch, state, api) => {
      resetIsResponseReceivedAndError(dispatch);
      api.post<GuitarCommentModel>('/comments', comment)
        .then((response) => {
          const newComments= guitar.comments ? [...guitar.comments] : [];
          newComments.unshift(response.data);
          dispatch(CurrentGuitarActionCreator.setCurrentGuitar(Object.assign({}, guitar, {
            comments: newComments,
          })));
        })
        .catch((error) => {
          if (error.response.status === ResponseStatus.BadRequest) {
            dispatch(CurrentGuitarActionCreator.setError(ErrorMsg.Other));
          }
          dispatch(CurrentGuitarActionCreator.setError(error.message));
        });
    };
  },


};


/* eslint-disable  @typescript-eslint/no-explicit-any */
export const currentGuitarReducer = (state: CurrentGuitarStateModel = initialState, action:any) => {
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

