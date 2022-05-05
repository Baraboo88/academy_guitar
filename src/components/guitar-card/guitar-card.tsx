import React from 'react';
import {GuitarModel} from '../../types/guitar-model';
import {generateStarsArray, getCyrillicRating, imageAdapter} from '../../utils/utils';


export const renderStars = (rating: number) => generateStarsArray().map((el, index) => (
  <svg key={`${rating} - ${el}`} width="12" height="11" aria-hidden="true">
    <use xlinkHref={rating >= el ? '#icon-full-star' : '#icon-star'}></use>
  </svg>));

interface GuitarCardProps{
  card: GuitarModel
}
function GuitarCard(props :GuitarCardProps) {
  const {card} = props;


  return (
    <div className="product-card">
      <img src={`img/content/catalog-product-${imageAdapter(card.previewImg)}.jpg`}
        srcSet={`img/content/catalog-product-${imageAdapter(card.previewImg)}@2x.jpg 2x`}
        width="75"
        height="190" alt={`${card.name}`}
      />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {renderStars(card.rating)}
          <p className="visually-hidden">Рейтинг: {getCyrillicRating(card.rating)}</p>
          <p className="rate__count">
            <span
              className="visually-hidden"
            >Всего оценок:
            </span>0
          </p>
        </div>
        <p className="product-card__title">{card.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {card.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <a className="button button--mini"
          href="#"
        >Подробнее
        </a>
        <a
          className="button button--red button--mini button--add-to-cart" href="#"
        >Купить
        </a>
      </div>
    </div>
  );
}

export default GuitarCard;
