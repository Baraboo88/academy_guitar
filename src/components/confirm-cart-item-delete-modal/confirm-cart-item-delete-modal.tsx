import React from 'react';
import {GuitarModel} from '../../types/guitar-model';
import {useModal} from '../../hooks/use-modal/use-modal';
import {getAdapterImage, getCyrillicType, getPriceWithSpaces} from '../../utils/utils';
import FocusTrap from 'focus-trap-react';


interface ConfirmCartItemDeleteModalProps{
  guitar: GuitarModel;
  onModalClose: () => void;
  onCartItemDelete: (guitar: GuitarModel) => void;
}

function ConfirmCartItemDeleteModal(props: ConfirmCartItemDeleteModalProps) {

  const {guitar, onModalClose, onCartItemDelete} = props;

  useModal(onModalClose);
  return (
    <FocusTrap>
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal data-test="test-close-modal" onClick={onModalClose}></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
            <div className="modal__info">
              <img className="modal__img" src={`/img/content/catalog-product-${getAdapterImage(guitar.previewImg)}.jpg`}
                srcSet={`/img/content/catalog-product-${getAdapterImage(guitar.previewImg)}@2x.jpg 2x`} width="67" height="137"
                alt={guitar.name}
              />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">{guitar.name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar.vendorCode}</p>
                <p className="modal__product-params">{getCyrillicType(guitar.type)}, {guitar.stringCount} струнная</p>
                <p className="modal__price-wrapper">
                  <span className="modal__price">Цена:</span>
                  <span
                    className="modal__price"
                  >{getPriceWithSpaces(guitar.price)} ₽
                  </span>
                </p>
              </div>
            </div>
            <div className="modal__button-container">
              <button onClick={() => {
                onCartItemDelete(guitar);
              }} className="button button--small modal__button"
              data-test="test-delete-from-cart"
              >Удалить товар
              </button>
              <button onClick={onModalClose} className="button button--black-border button--small modal__button modal__button--right" data-test="test-close-modal">Продолжить
              покупки
              </button>
            </div>
            <button onClick={onModalClose} className="modal__close-btn button-cross" type="button" aria-label="Закрыть" data-test="test-close-modal">
              <span
                className="button-cross__icon"
              >
              </span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default ConfirmCartItemDeleteModal;
