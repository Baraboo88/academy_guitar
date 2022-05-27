import {StateModel} from '../../types/redux-models';
import {createSelector} from 'reselect';
import {GuitarModel, GuitarStringCount, GuitarType} from '../../types/guitar-model';
import {SortDirection, SortType} from '../../utils/utils';

export const getGuitars = (state: StateModel) => state.guitars.guitars;
export const getGuitarsError = (state: StateModel) => state.guitars.errorMsg;
export const getGuitarsIsResponseReceived = (state: StateModel) => state.guitars.isResponseReceived;
export const getGuitarsNameFilter = (state: StateModel) => state.guitars.nameFilter;
export const getGuitarsSortDirection = (state: StateModel) => state.guitars.sortDirection;
export const getGuitarsSortType = (state: StateModel) => state.guitars.sortType;

export const getGuitarsSelectedMinPrice = (state: StateModel) => state.guitars.minPrice;
export const getGuitarsSelectedMaxPrice = (state: StateModel) => state.guitars.maxPrice;

export const getGuitarsSelectedStrings = (state: StateModel) => state.guitars.guitarsStrings;
export const getGuitarsSelectedTypes = (state: StateModel) => state.guitars.guitarsTypes;

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

export const getFilteredGuitars = createSelector([getGuitarsSelectedMinPrice, getGuitarsSelectedMaxPrice, getGuitarsSelectedStrings, getGuitarsSelectedTypes, getGuitars],(minPrice, maxPrice,stringsNo, guitarsType, guitars) => {

  const returnGuitars: GuitarModel [] = [];

  const applyStringFilter = (guitar: GuitarModel) => {
    if(stringsNo.length > 0 && stringsNo.find((el) => el === guitar.stringCount)){
      returnGuitars.push(guitar);
    }
    if(stringsNo.length === 0){
      returnGuitars.push(guitar);
    }
  };

  const applyTypeAndStringsFilter = (guitar: GuitarModel) => {
    if(guitarsType.find((el) => el === guitar.type)){
      applyStringFilter(guitar);
    }
    if(guitarsType.length === 0){
      applyStringFilter(guitar);
    }
  };

  guitars.forEach((guitar) => {
    if(minPrice === -1 && maxPrice === -1){
      applyTypeAndStringsFilter(guitar);
    }
    if(minPrice === -1 && minPrice !== -1 && guitar.price <= maxPrice){
      applyTypeAndStringsFilter(guitar);
    }
    if(minPrice !== -1 && minPrice <= guitar.price && maxPrice !== -1 && guitar.price <= maxPrice){
      applyTypeAndStringsFilter(guitar);
    }

    if(minPrice !== -1 && minPrice <= guitar.price && maxPrice === -1){
      applyTypeAndStringsFilter(guitar);
    }

  });
  return returnGuitars;
});

export const getSortedGuitars = createSelector([getGuitarsSortType, getGuitarsSortDirection, getFilteredGuitars], (sortType, sortDirection,guitars) => {

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

export const getMinMaxPrice = createSelector(getFilteredGuitars,getGuitarsSelectedMinPrice, getGuitarsSelectedMaxPrice, (guitars, minCurrentPrice, maxCurrentPrice) => {
  let minPrice = guitars.length > 0 ? Number.MAX_SAFE_INTEGER : 0;
  let maxPrice = 0;
  guitars.forEach((guitar) => {
    if(guitar.price > maxPrice){
      maxPrice = guitar.price;
    }
    if(guitar.price < minPrice){
      minPrice = guitar.price;
    }
  });
  return [minPrice, maxPrice];
});

export const getGuitarsStrings = createSelector(getFilteredGuitars, getGuitarsSelectedTypes, (guitars, selectedTypes) => {
  let  returnStrings: GuitarStringCount [] = [];
  if(guitars.length > 0){
    const strings = new Set();
    guitars.forEach((guitar) => strings.add(guitar.stringCount));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    returnStrings = [...strings];
    returnStrings.sort((a,b) =>  a-b);
  }
  return returnStrings;
});

export const getGuitarsTypes = createSelector(getFilteredGuitars,
  (guitars) => {
    const returnTypes: GuitarType [] = [];
    let uniqueTypes: GuitarType [] = [];
    if (guitars.length > 0) {
      const types = new Set();
      guitars.forEach((guitar) => types.add(guitar.type));

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uniqueTypes = [...types];

      Object.values(GuitarType).forEach((value) => {
        if (uniqueTypes.find((el) => el === value)) {
          returnTypes.push(value);
        }
      });

    }
    return returnTypes;
  });
