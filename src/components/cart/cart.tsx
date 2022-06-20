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
  getCartErrorMessage, getCartIsResponseReceived,
  getCartItems, getCartItemsDiscountAmount,
  getCartItemsTotalAmount
} from '../../store/cart/cart-selector';
import {CartActionCreator, CartOperation} from '../../store/cart/cart-actions';
import ConfirmCartItemDeleteModal from '../confirm-cart-item-delete-modal/confirm-cart-item-delete-modal';
import {TailSpin} from 'react-loader-spinner';


interface CartProps{
  cartItems: CartItemModel [];
  addOneToCartItems: (guitar: GuitarModel) => void;
  addCustomToCartItems: (guitarWithCount: CartItemModel) => void;
  deleteOneFromCartItems:(guitar: GuitarModel) => void;
  deleteFromCartItems: (guitar: GuitarModel) => void;
  discountAmount: number;
  errorMessage: string;
  isResponseReceived: boolean;
  getPromoDiscount: (promo: string) => void;
  resetCartErrorMessage: () => void;
  totalAmount: number
}

function Cart(props: CartProps) {
  const {cartItems,
    addOneToCartItems,
    addCustomToCartItems,
    deleteOneFromCartItems,
    deleteFromCartItems,
    discountAmount,
    errorMessage,
    getPromoDiscount,
    resetCartErrorMessage,
    totalAmount,
    isResponseReceived,
  } = props;

  const[guitarToDelete, setGuitarToDelete] = useState<GuitarModel | null>(null);
  const [promo, setPromo] = useState('');
  const [isPromoInvalid, setIsPromoInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [innerCartItems, setInnerCartItems] = useState<CartItemModel []>([]);

  useEffect(() => {
    setInnerCartItems(cartItems);
  }, [cartItems]);

  useEffect(() => {
    if(isResponseReceived && isLoading){
      setIsLoading(false);
    }
  }, [isResponseReceived, isLoading]);

  useEffect(() => {
    if(errorMessage){
      setIsPromoInvalid(true);
    } else {
      setIsPromoInvalid(false);
    }
  }, [errorMessage]);


  const handlerCartItemDelete = () => {
    if(guitarToDelete){
      deleteFromCartItems(guitarToDelete);
      setGuitarToDelete(null);
    }
  };

  const handlerConfirmDeleteModalClose = () => {
    setGuitarToDelete(null);
  };

  const handlerInnerCartItemIncrease = (guitar: GuitarModel) => {
    addOneToCartItems(guitar);
  };

  const handlerGuitarCountChange = (guitar: GuitarModel, count: number) => {

    const newInnerCartItems = innerCartItems.map((cartItem) => {
      const isChangedItem = cartItem.guitar.id === guitar.id;
      if(isChangedItem){
        const newCartItem = {...cartItem};
        newCartItem.count = count;
        return newCartItem;
      }
      return cartItem;
    });

    setInnerCartItems(newInnerCartItems);
  };

  const handlerGuitarCountBlur = (guitar:GuitarModel) => {

    const changedItem = innerCartItems.find((item) => item.guitar.id === guitar.id);

    if(changedItem){
      if(changedItem.count <= 0 ){
        setGuitarToDelete(guitar);
      } else {
        addCustomToCartItems({guitar, count: changedItem.count });
      }
    }

  };


  const handlerCartItemDecrease = (cartItem:CartItemModel) => {
    if(cartItem.count === INITIAL_CART_ITEM_COUNT){
      setGuitarToDelete(cartItem.guitar);
    } else {
      deleteOneFromCartItems(cartItem.guitar);
    }
  };

  const handlerPromoCodeSubmit = (evt:React.SyntheticEvent) => {
    evt.preventDefault();
    setIsLoading(true);
    getPromoDiscount(promo.trim());
  };

  const handlerPromoChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPromo(evt.target.value);
    resetCartErrorMessage();
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
          height="130" alt={cartItem.guitar.name}
        />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{cartItem.guitar.name}</p>
        <p className="product-info__info">Артикул: {cartItem.guitar.vendorCode}</p>
        <p className="product-info__info">{getCyrillicType(cartItem.guitar.type)}, {cartItem.guitar.stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{getPriceWithSpaces(cartItem.guitar.price)} ₽</div>
      <div className="quantity cart-item__quantity">
        <button data-test ='test-decrease-one' onClick={() => {
          handlerCartItemDecrease(cartItem);
        }} className="quantity__button" aria-label="Уменьшить количество"
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input  data-test ='test-custom-count' onBlur={() => {
          handlerGuitarCountBlur(cartItem.guitar);
        }} onChange={(evt) => {
          handlerGuitarCountChange(cartItem.guitar, Number(evt.target.value));
        }} value={cartItem.count === 0 ? '' : cartItem.count} className="quantity__input" type="number" placeholder={cartItem.count.toString()} id="2-count" name="2-count" max="99"
        />
        <button data-test ='test-add-one' onClick={() => {
          handlerInnerCartItemIncrease(cartItem.guitar);
        }}  className="quantity__button" aria-label="Увеличить количество"
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{getPriceWithSpaces(cartItem.guitar.price * cartItem.count)} ₽</div>
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
                <form  data-test='test-promo-submit' className="coupon__form" id="coupon-form" method="post" action="/" onSubmit={handlerPromoCodeSubmit}>
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input data-test ='test-change-promo' onChange={handlerPromoChange} type="text" placeholder="Введите промокод" id="coupon" name="coupon"/>
                    {discountAmount ? <p className="form-input__message form-input__message--success">Промокод принят</p> : ''}
                    {isPromoInvalid &&
                      <p className="form-input__message form-input__message--error">неверный промокод</p>}
                    {isLoading &&
                        <TailSpin  color="#000000" height={80} width={80} />}
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
                    className={`cart__total-value ${discountAmount > 0  ? 'cart__total-value--bonus' : ''}`}
                  >{discountAmount > 0 ? `- ${getPriceWithSpaces(discountAmount)}`: 0} ₽
                  </span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">К оплате:</span>
                  <span
                    className="cart__total-value cart__total-value--payment"
                  >{getPriceWithSpaces(totalAmount - (discountAmount ? discountAmount: 0))} ₽
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
  discountAmount: getCartItemsDiscountAmount(state),
  errorMessage: getCartErrorMessage(state),
  isResponseReceived: getCartIsResponseReceived(state),
});


const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, AxiosStatic, Action>) => ({
  addOneToCartItems(guitar: GuitarModel) {
    dispatch(CartActionCreator.addOneToCartItems(guitar));
  },
  addCustomToCartItems(guitarWithCount: CartItemModel){
    dispatch(CartActionCreator.addCustomToCartItems(guitarWithCount));
  },
  deleteOneFromCartItems(guitar: GuitarModel){
    dispatch(CartActionCreator.deleteOneFromCartItems(guitar));
  },
  deleteFromCartItems(guitar: GuitarModel){
    dispatch(CartActionCreator.deleteFromCartItems(guitar));
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
