import {GuitarModel} from './guitar-model';
import {SortDirection, SortType} from '../utils/utils';

export interface GuitarsStateModel {
    guitars: GuitarModel [];
    nameFilter: string;
    sortDirection: SortDirection;
    sortType: SortType;
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
