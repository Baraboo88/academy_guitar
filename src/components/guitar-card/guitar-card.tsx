import React, {useState} from 'react';
import {GuitarModel} from '../../types/guitar-model';
import {generateStarsArray, getCyrillicRating, getPriceWithSpaces, imageAdapter} from '../../utils/utils';
import {Link} from 'react-router-dom';
import AddToCartModal from '../add-to-cart-modal/add-to-cart-modal';

export enum StarSize{
    Main, CardDetails, Comments
}


export const renderStars = (rating: number, size: StarSize) => generateStarsArray().map((el, index) => {

  switch(size) {
    case StarSize.CardDetails:
      return (
        <svg key={`${rating} - ${el}`} width="14" height="14" aria-hidden="true">
          <use xlinkHref={rating >= el ? '#icon-full-star' : '#icon-star'}></use>
        </svg>);
    case StarSize.Main:
      return     (
        <svg key={`${rating} - ${el}`} width="12" height="11" aria-hidden="true">
          <use xlinkHref={rating >= el ? '#icon-full-star' : '#icon-star'}></use>
        </svg>);
    case StarSize.Comments:
      return (
        <svg key={`${rating} - ${el}`} width="16" height="16" aria-hidden="true">
          <use xlinkHref={rating >= el ? '#icon-full-star' : '#icon-star'}></use>
        </svg>);
    default:
      return <div></div>;
  }


});

interface GuitarCardProps{
  card: GuitarModel
}

function GuitarCard(props :GuitarCardProps) {
  const {card} = props;
  const [isAddToCardPopUpOpened, setIsAddToCardPopUpOpened] = useState(false);

  const onCloseModalHandler = () => {
    setIsAddToCardPopUpOpened(false);
  };

  return (
    <>
      <div className="product-card">
        <img src={`/img/content/catalog-product-${imageAdapter(card.previewImg)}.jpg`}
          srcSet={`/img/content/catalog-product-${imageAdapter(card.previewImg)}@2x.jpg 2x`}
          width="75"
          height="190" alt={`${card.name}`}
        />
        <div className="product-card__info">
          <div className="rate product-card__rate">
            {renderStars(card.rating, StarSize.Main)}
            <p className="visually-hidden">Рейтинг: {getCyrillicRating(card.rating)}</p>
            <p className="rate__count">
              <span
                className="visually-hidden"
              >Всего оценок:
              </span> {card.comments ? card.comments.length : 0}
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
          <button
            onClick={() => {
              setIsAddToCardPopUpOpened(true);
            }}
            className="button button--red button--mini button--add-to-cart"
          >Купить
          </button>
        </div>

      </div>
      {isAddToCardPopUpOpened && <AddToCartModal onCloseModalHandler={onCloseModalHandler} guitar={card}/>}
    </>
  );
}

export default GuitarCard;
