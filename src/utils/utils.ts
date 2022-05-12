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
  if(rating> 0 && rating < 3){
    return 'Плохо';
  } else if (rating >= 3 && rating < 4){
    return 'Удовлетворительно';
  } else if(rating >= 4 && rating < 5){
    return 'Хорошо';
  } else {
    return 'Отлично';
  }
};

export const getCyrillicType = (type: GuitarType) => {
  switch (type){
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

export const getPriceWithSpaces = (price: number)  => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
