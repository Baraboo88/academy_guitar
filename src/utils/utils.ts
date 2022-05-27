import {GuitarType} from '../types/guitar-model';

const STARTS_AMOUNT = 5;

export const getAdapterImage = (img: string) => img.slice(img.length - 5, img.length - 4);


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



export const monthNames = ['января', 'февраля ', 'марта', 'апреля', 'майя', 'июня',
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
  PageNo='page', Sort='sort', Types='types', Strings='strings', MinPrices='minPrice',MaxPrices='maxPrice'
}

export interface QueryModel{
  page: string;
  sort: string;
  types?: string [];
  strings?: string [];
  minPrice: number;
  maxPrice: number;
  prices?: number[]
}
