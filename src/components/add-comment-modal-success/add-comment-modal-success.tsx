import React from 'react';

import {useModal} from '../../hooks/use-modal/use-modal';
import FocusTrap from 'focus-trap-react';

export interface AddCommentModalSuccessProps{
  onModalClose: () => void;
}

function AddCommentModalSuccess(props: AddCommentModalSuccessProps) {
  const {onModalClose} = props;
  useModal(onModalClose);
  return (
    <FocusTrap>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={onModalClose} data-test="test-close-modal"></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button className="button button--small modal__button modal__button--review" data-test="test-close-modal" onClick={onModalClose}>К покупкам!</button>
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
    </FocusTrap>
  );
}

export default AddCommentModalSuccess;
