import {AddCommentModel, GuitarCommentModel, GuitarModel} from '../../types/guitar-model';
import {ThunkAction} from 'redux-thunk';
import {AppDispatch, RootState} from '../../index';
import {AxiosStatic} from 'axios';
import {ErrorMsg, ResponseStatus} from '../../utils/utils';
import {CurrentGuitarReducerActionWithoutPayload} from '../../types/redux-models';

export enum CurrentGuitarAction {
  SetCurrentGuitar = 'current-guitar/set-current-guitar',
  SetError = 'current-guitar/set-error',
  SetIsResponseReceived = 'current-guitar/set-is-response-received',
}

export const CurrentGuitarActionCreator = {
  setCurrentGuitar(quests: GuitarModel | null) {
    return {type: CurrentGuitarAction.SetCurrentGuitar, payload: quests};
  },
  setError(error: string) {
    return {type: CurrentGuitarAction.SetError, payload: error};
  },
  setIsResponseReceived(isResponseReceived: boolean) {
    return {type: CurrentGuitarAction.SetIsResponseReceived, payload: isResponseReceived};
  },
};


const resetIsResponseReceivedAndError = (dispatch: AppDispatch) => {
  dispatch(CurrentGuitarActionCreator.setError(''));
  dispatch(CurrentGuitarActionCreator.setIsResponseReceived(false));
};


export const CurrentGuitarOperation = {
  getGuitarById(id: number) : ThunkAction<void, RootState, AxiosStatic, CurrentGuitarReducerActionWithoutPayload>  {
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
  getCurrentGuitarComments(guitar: GuitarModel): ThunkAction<void, RootState, AxiosStatic, CurrentGuitarReducerActionWithoutPayload>  {
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


  addComment(guitar: GuitarModel, comment: AddCommentModel): ThunkAction<void, RootState, AxiosStatic, CurrentGuitarReducerActionWithoutPayload>  {
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
