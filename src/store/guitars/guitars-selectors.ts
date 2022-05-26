import {StateModel} from '../../types/redux-models';
import {createSelector} from 'reselect';
import {GuitarModel} from '../../types/guitar-model';
import {SortDirection, SortType} from '../../utils/utils';

export const getGuitars = (state: StateModel) => state.guitars.guitars;
export const getGuitarsError = (state: StateModel) => state.guitars.errorMsg;
export const getGuitarsIsResponseReceived = (state: StateModel) => state.guitars.isResponseReceived;
export const getGuitarsNameFilter = (state: StateModel) => state.guitars.nameFilter;
export const getGuitarsSortDirection = (state: StateModel) => state.guitars.sortDirection;
export const getGuitarsSortType = (state: StateModel) => state.guitars.sortType;


export const getGuitarsWithNameFilter = createSelector([getGuitarsNameFilter, getGuitars], (filter, guitars) => {
  const returnGuitars: GuitarModel [] = [];

  if(filter){
    guitars.forEach((guitar) => {
      if( guitar.name.toLocaleLowerCase().search(filter.toLocaleLowerCase()) >= 0){
        returnGuitars.push(guitar);
      }
    });
  }
  return returnGuitars.slice(0, 3);
}) ;

export const getSortedGuitars = createSelector([getGuitarsSortType, getGuitarsSortDirection, getGuitars], (sortType, sortDirection,guitars) => {

  const newGuitars = [...guitars];

  if(sortType === SortType.Price && (sortDirection === SortDirection.LowToHigh || sortDirection === SortDirection.None)){
    return newGuitars.sort((guitar1, guitar2) => guitar1.price - guitar2.price);
  }
  if(sortType === SortType.Price && sortDirection === SortDirection.HighToLow){
    return newGuitars.sort((guitar1, guitar2) => guitar2.price - guitar1.price);
  }
  if(sortType === SortType.Popularity && (sortDirection === SortDirection.LowToHigh || sortDirection === SortDirection.None)){
    return newGuitars.sort((guitar1, guitar2) => guitar1.rating - guitar2.rating);
  }
  if(sortType === SortType.Popularity && sortDirection === SortDirection.HighToLow){
    return newGuitars.sort((guitar1, guitar2) => guitar2.rating - guitar1.rating);
  }

  return newGuitars;


});
