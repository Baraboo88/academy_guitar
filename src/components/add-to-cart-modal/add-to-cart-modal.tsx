import React from 'react';
import {useModal} from '../../hooks/use-modal/user-modal';
import {GuitarModel} from '../../types/guitar-model';
import {getCyrillicType, getPriceWithSpaces, getAdapterImage} from '../../utils/utils';

export interface AddToCartModelProps{
    onModalClose: () => void;
    guitar: GuitarModel;
}
function AddToCartModal(props: AddToCartModelProps) {
  const {onModalClose, guitar} = props;
  useModal(onModalClose);
  return (
    <div className="modal is-active modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal onClick={onModalClose} data-test="test-close-modal"></div>
        <div className="modal__content">
          <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
          <div className="modal__info">
            <img className="modal__img"
              src={`/img/content/catalog-product-${getAdapterImage(guitar.previewImg)}.jpg`}
              srcSet={`/img/content/catalog-product-${getAdapterImage(guitar.previewImg)}@2x.jpg 2x`}
              width="67"
              height="137" alt={guitar.name}
            />
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">{guitar.name}
              </h3>
              <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar.vendorCode}</p>
              <p className="modal__product-params">{getCyrillicType(guitar.type)}, {guitar.stringCount} струнная</p>
              <p className="modal__price-wrapper"><span className="modal__price">Цена:</span>
                <span
                  className="modal__price"
                >{getPriceWithSpaces(guitar.price)} ₽
                </span>
              </p>
            </div>
          </div>
          <div className="modal__button-container">
            <button className="button button--red button--big modal__button modal__button--add">Добавить в
                          корзину
            </button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" data-test="test-close-modal" onClick={onModalClose}>
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

export default AddToCartModal;
