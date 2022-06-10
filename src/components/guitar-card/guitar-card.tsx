import React, {useState} from 'react';
import {CartItemModel, GuitarModel} from '../../types/guitar-model';
import {
  generateStars,
  getCyrillicRating,
  getPriceWithSpaces,
  getAdapterImage,
  handlerCartItemIncrease
} from '../../utils/utils';
import {Link} from 'react-router-dom';
import AddToCartModal from '../add-to-cart-modal/add-to-cart-modal';
import {StateModel} from '../../types/redux-models';
import {getCartItems} from '../../store/cart/cart-selector';
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
  cartItems: CartItemModel [];
  setCartItems: (cartItems: CartItemModel []) => void;
}

function GuitarCard(props :GuitarCardProps) {
  const {card, cartItems, setCartItems} = props;
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
    setCartItems(handlerCartItemIncrease(cartItems, card));
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

          {cartItems.find((cartItem) => cartItem.guitar.id === card.id) === undefined ?
            <button
              onClick={() => {
                setIsAddToCardPopUpOpened(true);
              }}
              className="button button--red button--mini button--add-to-cart"
            >Купить
            </button> :
            <Link to={'/cart'} className="button button--red-border button--mini button--in-cart">В Корзине</Link>}

        </div>

      </div>
      {isAddToCardPopUpOpened && <AddToCartModal onAddToCard={handlerCartItemAdd} onModalClose={handlerIsAddToCardClose} guitar={card}/>}
      {isAddToCardPopUpOpenedSuccess && <AddToCartModalSuccess onModalClose={handlerIsAddToCardCloseSuccess}/>}
    </>
  );
}

const mapStateToProps = (state: StateModel) => ({
  cartItems: getCartItems(state),
});


const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, AxiosStatic, Action>) => ({
  setCartItems(cartItems: CartItemModel []) {
    dispatch(CartActionCreator.setCartItems(cartItems));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GuitarCard);

export {GuitarCard};
