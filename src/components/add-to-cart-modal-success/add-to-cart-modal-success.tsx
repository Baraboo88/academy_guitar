import React, {useEffect} from 'react';

import {useModal} from '../../hooks/use-modal/use-modal';
import {Link} from 'react-router-dom';

export interface AddToCartModalSuccessProps{
  onModalClose: () => void;
}
function AddToCartModalSuccess(props: AddToCartModalSuccessProps) {
  const {onModalClose} = props;
  useEffect(() => () => {
    onModalClose();
  }, []);
  useModal(onModalClose);
  return (
    <div className="modal is-active modal--success modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal  onClick={onModalClose} ></div>
        <div className="modal__content">
          <svg className="modal__icon" width="26" height="20" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <p className="modal__message">Товар успешно добавлен в корзину</p>
          <div className="modal__button-container modal__button-container--add">
            <Link to={'/cart'} className="button button--small modal__button">Перейти в корзину</Link>
            <button  onClick={onModalClose}  className="button button--black-border button--small modal__button modal__button--right">Продолжить
              покупки
            </button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
            <span
              className="button-cross__icon"
            >
            </span><span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToCartModalSuccess;
