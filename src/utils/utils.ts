import {GuitarType} from '../types/guitar-model';

const STARTS_AMOUNT = 5;

export const imageAdapter = (img: string) => img.slice(img.length - 5, img.length - 4);


export const generateStarsArray = () => {
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

export const monthNames = ['января', 'февраля ', 'марта', 'апреля', 'майя', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];


export const getPriceWithSpaces = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

