import {StateModel} from '../../types/redux-models';
import {createSelector} from 'reselect';
import { GuitarStringCount, GuitarType} from '../../types/guitar-model';
import {
  getGuitarsWithMinAndMaxFilter,
  getGuitarsWithStringFilter,
  getGuitarsWithTypeFilter,
  SortDirection,
  SortType
} from '../../utils/utils';
import {getCartItems} from '../cart/cart-selector';

export const getGuitars = (state: StateModel) => state.guitars.guitars;
export const getGuitarsError = (state: StateModel) => state.guitars.errorMsg;
export const getGuitarsIsResponseReceived = (state: StateModel) => state.guitars.isResponseReceived;
export const getSearchGuitarName = (state: StateModel) => state.guitars.searchGuitarName;
export const getGuitarsSortDirection = (state: StateModel) => state.guitars.sortDirection;
export const getGuitarsSortType = (state: StateModel) => state.guitars.sortType;

export const getGuitarsSelectedMinPrice = (state: StateModel) => state.guitars.minPrice;
export const getGuitarsSelectedMaxPrice = (state: StateModel) => state.guitars.maxPrice;

export const getGuitarsSelectedStrings = (state: StateModel) => state.guitars.guitarsStrings;
export const getGuitarsSelectedTypes = (state: StateModel) => state.guitars.guitarsTypes;

export const getGuitarsWithNameFilter = createSelector([getSearchGuitarName, getGuitars], (filter, guitars) => guitars.filter((guitar) => filter ? guitar.name.toLocaleLowerCase().search(filter.toLocaleLowerCase()) >= 0 : true)) ;

export const getGuitarsWithCart = createSelector([getGuitars, getCartItems], (guitars, cartItems) => guitars.map((guitar) => {
  guitar.isInCart = cartItems.find((cartItem) => cartItem.guitar.id === guitar.id) !== undefined;
  return guitar;
}));

export const getFilteredGuitars = createSelector([getGuitarsSelectedMinPrice, getGuitarsSelectedMaxPrice, getGuitarsSelectedStrings, getGuitarsSelectedTypes, getGuitarsWithCart],(minPrice, maxPrice,stringsNo, guitarsTypes, guitars) =>getGuitarsWithStringFilter(getGuitarsWithTypeFilter(getGuitarsWithMinAndMaxFilter(guitars, minPrice, maxPrice), guitarsTypes), stringsNo));


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

export const getMinMaxPrice = createSelector(getGuitars ,getGuitarsSelectedMinPrice, getGuitarsSelectedMaxPrice, (guitars, minCurrentPrice, maxCurrentPrice) => {

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


export const getGuitarsStrings = createSelector([getGuitars, getGuitarsSelectedMinPrice, getGuitarsSelectedMaxPrice, getGuitarsSelectedTypes], (guitars, minPrice, maxPrice, guitarsTypes) => {
  let  returnGuitarStrings: GuitarStringCount [] = [];
  const newGuitars = getGuitarsWithMinAndMaxFilter(getGuitarsWithTypeFilter(guitars, guitarsTypes), minPrice, maxPrice);
  if(newGuitars.length > 0){
    const newGuitarStrings  = new Set<GuitarStringCount>();
    newGuitars.forEach((guitar) => newGuitarStrings.add(guitar.stringCount));
    returnGuitarStrings = [...newGuitarStrings];
  }
  return returnGuitarStrings;
});

export const getGuitarsTypes = createSelector([getGuitars, getGuitarsSelectedMinPrice, getGuitarsSelectedMaxPrice,getGuitarsSelectedStrings],
  (guitars, minPrice, maxPrice, guitarsStrings) => {
    let returnTypes: GuitarType [] = [];
    const newGuitars = getGuitarsWithMinAndMaxFilter(getGuitarsWithStringFilter(guitars, guitarsStrings), minPrice, maxPrice);
    if (newGuitars.length > 0) {
      const types = new Set<GuitarType>();
      newGuitars.forEach((guitar) => {

        types.add(guitar.type);
      } );

      returnTypes = [...types];

    }
    return returnTypes;
  });
