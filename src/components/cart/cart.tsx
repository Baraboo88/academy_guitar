import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import {StateModel} from '../../types/redux-models';

import {ThunkDispatch} from 'redux-thunk';
import {RootState} from '../../index';
import {AxiosStatic} from 'axios';
import {Action} from 'redux';

import {connect} from 'react-redux';

import {CartItemModel} from '../../types/guitar-model';
import {getAdapterImage, getCyrillicType, getPriceWithSpaces} from '../../utils/utils';
import {Link} from 'react-router-dom';
import {getCartItems} from '../../store/cart/cart-selector';


interface CartProps{
  cartItems: CartItemModel [];
  //setCartItems: (cartItems: CartItemModel []) => void;
}

function Cart(props: CartProps) {
  const {cartItems} = props;


  // const handlerCartItemDelete = (guitar: GuitarModel) => {
  //   setCartItems(cartItems.filter((cartItem) => cartItem.guitar.id !== guitar.id));
  // };


  const renderCartItems  = () => cartItems.map((cartItem: CartItemModel) =>    (
    <div className="cart-item" key={cartItem.guitar.id}>
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить">
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
        <button className="quantity__button" aria-label="Уменьшить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input className="quantity__input" type="number" placeholder="1" id="2-count" name="2-count" max="99"/>
        <button className="quantity__button" aria-label="Увеличить количество">
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
                <form className="coupon__form" id="coupon-form" method="post" action="/">
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input type="text" placeholder="Введите промокод" id="coupon" name="coupon"/>
                    <p className="form-input__message form-input__message--success">Промокод принят</p>
                  </div>
                  <button className="button button--big coupon__button">Применить</button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span>
                  <span
                    className="cart__total-value"
                  >52 000 ₽
                  </span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Скидка:</span>
                  <span
                    className="cart__total-value cart__total-value--bonus"
                  >- 3000 ₽
                  </span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">К оплате:</span>
                  <span
                    className="cart__total-value cart__total-value--payment"
                  >49 000 ₽
                  </span>
                </p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}


const mapStateToProps = (state: StateModel) => ({
  cartItems: getCartItems(state),
});


const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, AxiosStatic, Action>) => ({
  // setCartItems(cartItems: CartItemModel []) {
  //   dispatch(CartActionCreator.setCartItems(cartItems));
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
export {Cart};
