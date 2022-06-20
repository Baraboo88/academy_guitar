import {CartItemModel, GuitarModel, GuitarStringCount, GuitarType} from '../types/guitar-model';

const STARTS_AMOUNT = 5;
export const MIN_PRICE_INITIAL_VALUE = -1;
export const MAX_PRICE_INITIAL_VALUE = -1;
export const INITIAL_CART_ITEM_COUNT = 1;
export const MAX_CART_ITEM_COUNT = 99;
const INDEX_FROM_END_TO_START_SUB_STRING = 5;
const INDEX_FROM_END_TO_END_SUB_STRING = INDEX_FROM_END_TO_START_SUB_STRING - 1;

export const getAdapterImage = (img: string) => img.slice(img.length - INDEX_FROM_END_TO_START_SUB_STRING, img.length - INDEX_FROM_END_TO_END_SUB_STRING);


export const generateStars = () => {
  const stars = [];
  for (let i = 1; i <= STARTS_AMOUNT; i++) {
    stars.push(i);
  }
  return stars;
};

export const getCyrillicRating = (rating: number) => {
  switch (rating) {
    case 1:
      return 'Ужасно';
    case 2:
      return 'Плохо';
    case 3:
      return 'Нормально';
    case 4:
      return 'Хорошо';
    case 5:
      return 'Отлично';
    default:
      return '';
  }

};

export const getCyrillicType = (type: GuitarType) => {
  switch (type) {
    case GuitarType.Electric:
      return 'Электрогитара';
    case GuitarType.Acoustic:
      return 'Акустическая';
    case GuitarType.Ukulele:
      return 'Укулеле';
    default:
      return '';
  }
};

export const getCyrillicTypeFiler = (type: GuitarType) => {
  switch (type) {
    case GuitarType.Electric:
      return 'Электрогитары';
    case GuitarType.Acoustic:
      return 'Акустические гитары';
    case GuitarType.Ukulele:
      return 'Укулеле';
    default:
      return '';
  }
};


export const MONTH_NAMES = ['января', 'февраля ', 'марта', 'апреля', 'майя', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

export const getPriceWithSpaces = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const MOCK_FILL_VALUE = 1;

export enum ErrorMsg {
    Other = 'Something went wrong...',
    NotFound = 'not-found',
}


export enum ResponseStatus {
    BadRequest = 400,
    NotFound = 404,
}

export enum Page {
    Catalog, WhereToBuy, About
}

export enum SortDirection{
  None, LowToHigh, HighToLow
}

export enum SortType{
  None, Price, Popularity
}

export enum SortTypeWithDirection{
  PriceLowToHigh='price-low-to-high',PriceHighToLow='price-high-to-low', PopularityLowToHigh='popularity-low-to-high', PopularityHighToLow = 'popularity-high-to-low'
}

export enum Query{
  PageNo='page', Sort='sort', GuitarTypes='guitarTypes', GuitarStrings='guitarStrings', MinPrice='minPrice',MaxPrice='maxPrice'
}


export const ENTER_KEY = 'Enter';

export interface QueryModel{
  page?: string;
  sort?: string;
  guitarTypes?: string [];
  guitarStrings?: string [];
  minPrice?: string | number;
  maxPrice?: string | number;
}

export const getGuitarsWithMinAndMaxFilter = (guitars: GuitarModel [], minPrice: number, maxPrice: number) => guitars.filter((guitar) =>
  ((minPrice === MIN_PRICE_INITIAL_VALUE && maxPrice === MAX_PRICE_INITIAL_VALUE)
    || (minPrice === MIN_PRICE_INITIAL_VALUE && maxPrice !== MAX_PRICE_INITIAL_VALUE && guitar.price <= maxPrice)
    || (minPrice !== MIN_PRICE_INITIAL_VALUE && minPrice <= guitar.price && maxPrice !== MIN_PRICE_INITIAL_VALUE && guitar.price <= maxPrice)
    || (minPrice !== MIN_PRICE_INITIAL_VALUE && minPrice <= guitar.price && maxPrice === MAX_PRICE_INITIAL_VALUE)));

export const getGuitarsWithTypeFilter =(guitars: GuitarModel[], guitarsTypes: GuitarType []) => guitars.filter((guitar) => (guitarsTypes.find((el) => el === guitar.type) || guitarsTypes.length === 0));

export const getGuitarsWithStringFilter = (guitars: GuitarModel [], guitarStrings: GuitarStringCount []) =>guitars.filter((guitar) => guitarStrings.find((el) => el === guitar.stringCount.toString()) || guitarStrings.length === 0 );


export const handlerCartItemIncrease = (cartItems: CartItemModel [], guitar: GuitarModel) => {
  const newCartItems = [...cartItems];
  if(newCartItems.length > 0){
    const isExist = newCartItems.find((cartItem) => cartItem.guitar.id === guitar.id);
    if(isExist){
      return newCartItems.map((cartItem) => {
        const newItem = {...cartItem};
        if(cartItem.guitar.id === guitar.id && newItem.count < MAX_CART_ITEM_COUNT){
          newItem.count++;
        }
        return newItem;
      });
    } else {
      newCartItems.push({guitar, count: INITIAL_CART_ITEM_COUNT});
      return newCartItems;
    }

  } else {
    return [{guitar: guitar, count: 1}];
  }
};
