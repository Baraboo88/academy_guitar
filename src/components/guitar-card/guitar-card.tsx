import React, {useState} from 'react';
import {GuitarModel} from '../../types/guitar-model';
import {
  generateStars,
  getCyrillicRating,
  getPriceWithSpaces,
  getAdapterImage
} from '../../utils/utils';
import {Link} from 'react-router-dom';
import AddToCartModal from '../add-to-cart-modal/add-to-cart-modal';
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from '../../index';
import {AxiosStatic} from 'axios';
import {Action} from 'redux';
import {CartActionCreator} from '../../store/cart/cart-actions';
import {connect} from 'react-redux';
import AddToCartModalSuccess from '../add-to-cart-modal-success/add-to-cart-modal-success';

export enum StarSize{
    Main, CardDetails, Comments
}


export const renderStars = (rating: number, size: StarSize) => generateStars().map((el, index) => {

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
  card: GuitarModel;
  addOneToCartItems: (guitar: GuitarModel) => void;
}

function GuitarCard(props :GuitarCardProps) {
  const {card, addOneToCartItems} = props;
  const [isAddToCardPopUpOpened, setIsAddToCardPopUpOpened] = useState(false);
  const [isAddToCardPopUpOpenedSuccess, setIsAddToCardPopUpOpenedSuccess] = useState(false);
  const handlerIsAddToCardClose = () => {
    setIsAddToCardPopUpOpened(false);
  };

  const handlerIsAddToCardCloseSuccess = () => {
    setIsAddToCardPopUpOpenedSuccess(false);
  };

  const handlerCartItemAdd = () => {
    setIsAddToCardPopUpOpened(false);
    setIsAddToCardPopUpOpenedSuccess(true);
    addOneToCartItems(card);
  };

  const handlerAddToCartClick = () => {
    setIsAddToCardPopUpOpened(true);
  };

  return (
    <>
      <div className="product-card">
        <img src={`/img/content/catalog-product-${getAdapterImage(card.previewImg)}.jpg`}
          srcSet={`/img/content/catalog-product-${getAdapterImage(card.previewImg)}@2x.jpg 2x`}
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

          {card.isInCart ? <Link to={'/cart'} className="button button--red-border button--mini button--in-cart">В Корзине</Link> :
            <button
              onClick={handlerAddToCartClick}
              className="button button--red button--mini button--add-to-cart"
            >Купить
            </button>}

        </div>

      </div>
      {isAddToCardPopUpOpened && <AddToCartModal onAddToCart={handlerCartItemAdd} onModalClose={handlerIsAddToCardClose} guitar={card}/>}
      {isAddToCardPopUpOpenedSuccess && <AddToCartModalSuccess onModalClose={handlerIsAddToCardCloseSuccess}/>}
    </>
  );
}


const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, AxiosStatic, Action>) => ({
  addOneToCartItems(guitar: GuitarModel) {
    dispatch(CartActionCreator.addOneToCartItems(guitar));
  },
});

export default connect(null, mapDispatchToProps)(GuitarCard);

export {GuitarCard};
