import React from 'react';
import {GuitarModel} from '../../types/guitar-model';
import {generateStarsArray, getCyrillicRating, getPriceWithSpaces, imageAdapter} from '../../utils/utils';
import {Link} from 'react-router-dom';


export const renderStars = (rating: number, isFromCardDetails: boolean) => generateStarsArray().map((el, index) => (
  <svg key={`${rating} - ${el}`} width={isFromCardDetails ? 14 : 12} height={isFromCardDetails ? 14 : 11} aria-hidden="true">
    <use xlinkHref={rating >= el ? '#icon-full-star' : '#icon-star'}></use>
  </svg>));

interface GuitarCardProps{
  card: GuitarModel
}
function GuitarCard(props :GuitarCardProps) {
  const {card} = props;


  return (
    <div className="product-card">
      <img src={`/img/content/catalog-product-${imageAdapter(card.previewImg)}.jpg`}
        srcSet={`/img/content/catalog-product-${imageAdapter(card.previewImg)}@2x.jpg 2x`}
        width="75"
        height="190" alt={`${card.name}`}
      />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {renderStars(card.rating, false)}
          <p className="visually-hidden">Рейтинг: {getCyrillicRating(card.rating)}</p>
          <p className="rate__count">
            <span
              className="visually-hidden"
            >Всего оценок:
            </span> {card.commentsCount ? card.commentsCount : 0}
          </p>
        </div>
        <p className="product-card__title">{card.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {getPriceWithSpaces(card.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">

        <Link to={`/product/${card.id}`} className="button button--mini">Подробнее
        </Link>
        <a
          className="button button--red button--mini button--add-to-cart" href="#"
        >Купить
        </a>
      </div>
    </div>
  );
}

export default GuitarCard;
