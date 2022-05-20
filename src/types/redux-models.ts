import {GuitarModel} from './guitar-model';

export interface GuitarsStateModel {
    guitars: GuitarModel [];
    isResponseReceived: boolean;
    errorMsg: string;
}

export interface CurrentGuitarStateModel {
    currentGuitar: GuitarModel | null;
    isResponseReceived: boolean;
    errorMsg: string;
}


export interface StateModel {
    guitars: GuitarsStateModel,
    currentGuitar: CurrentGuitarStateModel
}
