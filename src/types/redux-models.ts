import {GuitarModel} from './guitar-model';

export interface DataStateModel {
    guitars: GuitarModel [];
    currentGuitar: GuitarModel | null;
    isResponseReceived: boolean;
    errorMsg: string;
}

export interface StateModel {
    data: DataStateModel
}
