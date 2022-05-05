import {GuitarModel} from './guitar-model';

export interface DataStateModel {
    guitars: GuitarModel [];
    isResponseReceived: boolean;
    errorMsg: string;
}

export interface StateModel {
    data: DataStateModel
}
