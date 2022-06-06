import {GuitarModel} from '../../types/guitar-model';

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
