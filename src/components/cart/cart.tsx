import React, {ChangeEvent, useEffect, useState} from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import {StateModel} from '../../types/redux-models';

import {ThunkDispatch} from 'redux-thunk';
import {RootState} from '../../index';
import {AxiosStatic} from 'axios';
import {Action} from 'redux';

import {connect} from 'react-redux';

import {CartItemModel, GuitarModel} from '../../types/guitar-model';
import {
  getAdapterImage,
  getCyrillicType,
  getPriceWithSpaces, INITIAL_CART_ITEM_COUNT
} from '../../utils/utils';
import {Link} from 'react-router-dom';
import {
  getCartDiscount,
  getCartErrorMessage,
  getCartItems,
  getCartItemsTotalAmount
} from '../../store/cart/cart-selector';
import {CartActionCreator} from '../../store/cart/cart-actions';
import ConfirmCartItemDeleteModal from '../confirm-cart-item-delete-modal/confirm-cart-item-delete-modal';
import {CartOperation} from '../../store/cart/cart-reducer';


interface CartProps{
  cartItems: CartItemModel [];
  setAddOneToCartItems: (guitar: GuitarModel) => void;
  setAddCustomToCartItems: (guitarWithCount: CartItemModel) => void;
  setDeleteOneFromCartItems:(guitar: GuitarModel) => void;
  setDeleteFromCartItems: (guitar: GuitarModel) => void;
  discount: number;
  errorMessage: string;
  getPromoDiscount: (promo: string) => void;
  resetCartErrorMessage: () => void;
  totalAmount: number
}

function Cart(props: CartProps) {
  const {cartItems,
    setAddOneToCartItems,
    setAddCustomToCartItems,
    setDeleteOneFromCartItems,
    setDeleteFromCartItems,
    discount,
    errorMessage,
    getPromoDiscount,
    resetCartErrorMessage,
    totalAmount,
  } = props;

  const[guitarToDelete, setGuitarToDelete] = useState<GuitarModel | null>(null);
  const [promo, setPromo] = useState('');
  const [isPromoInvalid, setIsPromoInvalid] = useState(false);

  const [innerCartItems, setInnerCartItems] = useState<CartItemModel []>([]);

  useEffect(() => {
    setInnerCartItems(cartItems);
  }, [cartItems]);

  useEffect(() => {
    if(errorMessage){
      setIsPromoInvalid(true);
    } else {
      setIsPromoInvalid(false);
    }
  }, [errorMessage]);


  const handlerCartItemDelete = () => {
    if(guitarToDelete){
      setDeleteFromCartItems(guitarToDelete);
      setGuitarToDelete(null);
    }
  };

  const handlerConfirmDeleteModalClose = () => {
    setGuitarToDelete(null);
  };

  const handlerInnerCartItemIncrease = (guitar: GuitarModel) => {
    setAddOneToCartItems(guitar);
  };

  const handlerGuitarCountChange = (guitar: GuitarModel, count: number) => {

    const newInnerCartItems = innerCartItems.map((cartItem) => {
      const isChangedItem = cartItem.guitar.id === guitar.id;
      if(isChangedItem){
        const newCartItem = {...cartItem};
        newCartItem.count = count;
        return newCartItem;
      } else {
        return cartItem;
      }
    });

    setInnerCartItems(newInnerCartItems);


  };

  const handlerGuitarCountBlur = (guitar:GuitarModel) => {

    const changedItem = innerCartItems.find((item) => item.guitar.id === guitar.id);


    if(changedItem){
      if(changedItem.count === 0 ){
        setGuitarToDelete(guitar);
      } else {
        setAddCustomToCartItems({guitar, count: changedItem.count });
      }
    }

  };


  const handlerCartItemDecrease = (cartItem:CartItemModel) => {
    if(cartItem.count === INITIAL_CART_ITEM_COUNT){
      setGuitarToDelete(cartItem.guitar);
    } else {
      setDeleteOneFromCartItems(cartItem.guitar);
    }

  };

  const handlerPromoCodeSubmit = (evt:React.SyntheticEvent) => {
    evt.preventDefault();
    getPromoDiscount(promo.trim());
    // if(isValidCode){
    //   setIsPromoInvalid(false);
    //   setIsPromoSuccess(true);
    // } else {
    //   setIsPromoInvalid(true);
    //   setIsPromoSuccess(false);
    // }
  };

  const handlerPromoChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPromo(evt.target.value);
    resetCartErrorMessage();
  };


  const renderGuitarPrice = (guitar: GuitarModel) => {
    const cartItem = cartItems.find((item) => item.guitar.id === guitar.id);
    if(cartItem){
      return getPriceWithSpaces(cartItem.guitar.price * cartItem.count);
    }
  };


  const renderCartItems  = () => innerCartItems.map((cartItem: CartItemModel) =>    (
    <div className="cart-item" key={cartItem.guitar.id}>
      <button onClick={() => {
        setGuitarToDelete(cartItem.guitar);
      }} className="cart-item__close-button button-cross" type="button" aria-label="Удалить"
      >
        <span
          className="button-cross__icon"
        >
        </span><span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img  src={`/img/content/catalog-product-${getAdapterImage(cartItem.guitar.previewImg)}.jpg`}
          srcSet={`/img/content/catalog-product-${getAdapterImage(cartItem.guitar.previewImg)}@2x.jpg 2x`} width="55"
          height="130" alt="ЭлектроГитара Честер bass"
        />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{cartItem.guitar.name}</p>
        <p className="product-info__info">Артикул: {cartItem.guitar.vendorCode}</p>
        <p className="product-info__info">{getCyrillicType(cartItem.guitar.type)}, {cartItem.guitar.stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{getPriceWithSpaces(cartItem.guitar.price)} ₽</div>
      <div className="quantity cart-item__quantity">
        <button onClick={() => {
          handlerCartItemDecrease(cartItem);
        }} className="quantity__button" aria-label="Уменьшить количество"
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input onBlur={() => {
          handlerGuitarCountBlur(cartItem.guitar);
        }} onChange={(evt) => {
          handlerGuitarCountChange(cartItem.guitar, Number(evt.target.value));
        }} value={cartItem.count === 0 ? '' : cartItem.count} className="quantity__input" type="number" placeholder={cartItem.count.toString()} id="2-count" name="2-count" max="99"
        />
        <button onClick={() => {
          handlerInnerCartItemIncrease(cartItem.guitar);
        }}  className="quantity__button" aria-label="Увеличить количество"
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{renderGuitarPrice(cartItem.guitar)} ₽</div>
    </div>));

  return (
    <div  className="wrapper">
      <Header />
      <main className="page-content">

        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item"><Link to={'/'} className="link">Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link to={'/'} className="link" >Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><span className="link">Корзина</span>
            </li>
          </ul>
          <div className="cart">
            {renderCartItems()}
            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                <form className="coupon__form" id="coupon-form" method="post" action="/" onSubmit={handlerPromoCodeSubmit}>
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input onChange={handlerPromoChange} type="text" placeholder="Введите промокод" id="coupon" name="coupon"/>
                    {discount ? <p className="form-input__message form-input__message--success">Промокод принят</p> : ''}
                    {isPromoInvalid &&
                      <p className="form-input__message form-input__message--error">неверный промокод</p>}
                  </div>
                  <button className="button button--big coupon__button">Применить</button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span>
                  <span
                    className="cart__total-value"
                  >{getPriceWithSpaces(totalAmount)} ₽
                  </span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Скидка:</span>
                  <span
                    className={`cart__total-value ${discount ? 'cart__total-value--bonus' : ''}`}
                  >{discount ? `- ${totalAmount * discount /100}`: 0} ₽
                  </span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">К оплате:</span>
                  <span
                    className="cart__total-value cart__total-value--payment"
                  >{getPriceWithSpaces(totalAmount - (discount ? totalAmount * discount /100: 0))} ₽
                  </span>
                </p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
          {guitarToDelete !== null && <ConfirmCartItemDeleteModal guitar={guitarToDelete} onCartItemDelete={handlerCartItemDelete} onModalClose={handlerConfirmDeleteModalClose}/>}
        </div>

      </main>
      <Footer/>
    </div>
  );
}


const mapStateToProps = (state: StateModel) => ({
  cartItems: getCartItems(state),
  totalAmount: getCartItemsTotalAmount(state),
  discount: getCartDiscount(state),
  errorMessage: getCartErrorMessage(state),
});


const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, AxiosStatic, Action>) => ({
  setAddOneToCartItems(guitar: GuitarModel) {
    dispatch(CartActionCreator.setAddOneToCartItems(guitar));
  },
  setAddCustomToCartItems(guitarWithCount: CartItemModel){
    dispatch(CartActionCreator.setAddCustomToCartItems(guitarWithCount));
  },
  setDeleteOneFromCartItems(guitar: GuitarModel){
    dispatch(CartActionCreator.setDeleteOneFromCartItems(guitar));
  },
  setDeleteFromCartItems(guitar: GuitarModel){
    dispatch(CartActionCreator.setDeleteFromCartItems(guitar));
  },
  getPromoDiscount(promoCode: string){
    dispatch(CartOperation.getPromoDiscount(promoCode));
  },
  resetCartErrorMessage(){
    dispatch(CartActionCreator.setErrorMessage(''));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
export {Cart};
