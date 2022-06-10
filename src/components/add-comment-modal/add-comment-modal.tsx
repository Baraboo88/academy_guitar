import React, {useRef} from 'react';
import {AddCommentModel, GuitarModel} from '../../types/guitar-model';
import {getCyrillicRating, MOCK_FILL_VALUE} from '../../utils/utils';
import FocusTrap from 'focus-trap-react';
import {useModal} from '../../hooks/use-modal/use-modal';
import {useActiveElement} from '../../hooks/use-active-element/use-active-element';


interface AddCommentModalProps{
  onCloseModal: () => void;
  guitar: GuitarModel;
  userName: string;
  onSetUserName: (name: string) => void;
  advantage: string;
  onSetAdvantage: (adv: string) => void;
  disadvantage:string;
  onSetDisadvantage: (disadv: string) => void;
  comment: string;
  onSetComment: (comment: string) => void;
  rating: number;
  onSetRating: (rating: number) => void;
  onSubmitHandler: (comment: AddCommentModel) => void;
  isNameValidationError: boolean;
  isAdvantageValidationError: boolean;
  isDisadvantageValidationError: boolean;
  isCommentValidationError: boolean;
  isRatingValidationError: boolean;
}

enum Arrow {
  Right = 'ArrowRight',
Left = 'ArrowLeft'
}

const EMPTY_BLOCK_HEIGHT = 15;

export const NUMBER_OF_START = 5;

function AddCommentModal(props: AddCommentModalProps) {
  const{onCloseModal, guitar,userName,
    onSetUserName,
    advantage,
    onSetAdvantage,
    disadvantage,
    onSetDisadvantage,
    comment,
    onSetComment,
    rating,
    onSetRating,
    onSubmitHandler,
    isNameValidationError,
    isAdvantageValidationError,
    isDisadvantageValidationError,
    isCommentValidationError,
    isRatingValidationError} = props;

  useModal(onCloseModal);


  const starRefs = useRef<HTMLInputElement []>([]);
  const focusedElement = useActiveElement();


  const renderStars = () => new Array(NUMBER_OF_START).fill(MOCK_FILL_VALUE).map((_,index) => {
    const starNo = NUMBER_OF_START - index;
    if(starNo === NUMBER_OF_START && focusedElement === starRefs.current[5]&& rating === 0){

      if(starRefs.current[1] ){
        starRefs.current[1].focus();
      }
    }
    return (
      <React.Fragment key={getCyrillicRating(starNo)}>
        <input ref={(element:HTMLInputElement) => {
          starRefs.current[starNo] = element;

        }}  checked={rating === starNo} onKeyDown={(evt) => {
          if(evt.key === Arrow.Right || evt.key === Arrow.Left){
            evt.preventDefault();
            evt.stopPropagation();

            if(Arrow.Right === evt.key){
              if(rating !== NUMBER_OF_START){
                onSetRating(Number(rating + 1));
                if(starRefs.current[rating + 1]){
                  starRefs.current[rating + 1].focus();
                }
              } else {
                onSetRating(Number( 1));
                starRefs.current[1].focus();
              }
            }
            if(Arrow.Left === evt.key){
              if(rating !== 1){
                onSetRating(Number(rating - 1));
                if(starRefs.current[rating - 1]){
                  starRefs.current[rating - 1].focus();
                }
              } else {
                onSetRating(Number(NUMBER_OF_START));
                starRefs.current[NUMBER_OF_START].focus();
              }
            }
          }
        }} className="visually-hidden" id={`star-${starNo}`} name="rate" type="radio" value={starNo} onChange={(evt) => {

          onSetRating(Number(evt.target.value));

        }}
        data-test="test-rating"
        />
        <label className="rate__label"  htmlFor={`star-${starNo}`} title={getCyrillicRating(starNo)}></label>
      </React.Fragment>);
  });

  return (
    <FocusTrap>
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={onCloseModal} data-test="test-close-modal"></div>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitar && guitar.name}</h3>

            <form className="form-review" data-test="test-submit" onSubmit={(evt) => {
              evt.preventDefault();
              onSubmitHandler({comment, advantage, disadvantage, rating, guitarId: guitar ? guitar?.id : 0, userName});
            }}
            >

              <div className="form-review__wrapper">

                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше
                                    Имя
                  </label>
                  <input autoFocus  className="form-review__input form-review__input--name" id="user-name" type="text"
                    autoComplete="off"
                    value = {userName}
                    onChange={(evt) => {
                      onSetUserName(evt.target.value);
                    }}
                    data-test="test-user-name"
                  />
                  {isNameValidationError && !userName ? <p className="form-review__warning">Заполните поле</p> : <div style={{height: EMPTY_BLOCK_HEIGHT}}/>  }
                </div>
                <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse" >
                    {renderStars()}
                    {isRatingValidationError && !rating ? <p className="rate__message">Поставьте оценку</p> : <div style={{height: EMPTY_BLOCK_HEIGHT}}/>  }
                  </div>
                </div>
              </div>
              <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
              <input value={advantage} onChange={(evt) => {
                onSetAdvantage(evt.target.value);
              }} className="form-review__input" id="adv" type="text" autoComplete="off"
              data-test="test-advantage"
              />

              {isAdvantageValidationError && !advantage ? <p className="form-review__warning">Заполните поле</p> : <div style={{height: EMPTY_BLOCK_HEIGHT}}/>  }
              <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
              <input value={disadvantage} onChange={(evt) => {
                onSetDisadvantage(evt.target.value);
              }} className="form-review__input" id="disadv" type="text" autoComplete="off"
              data-test="test-disadvantage"
              />
              {isDisadvantageValidationError && !disadvantage ? <p className="form-review__warning">Заполните поле</p> : <div style={{height: EMPTY_BLOCK_HEIGHT}}/>  }

              <label className="form-review__label form-review__label--required"
                htmlFor="comment"
              >Комментарий
              </label>
              <textarea value={comment} onChange={(evt) => {
                onSetComment(evt.target.value);
              }} className="form-review__input form-review__input--textarea" id="comment" rows={10}
              autoComplete="off"
              data-test="test-comment"
              >
              </textarea>
              {isCommentValidationError && !comment ? <p className="form-review__warning">Заполните поле</p> : <div style={{height: EMPTY_BLOCK_HEIGHT}}/> }

              <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв
              </button>

            </form>

            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" data-test="test-close-modal" onClick={onCloseModal}>
              <span
                className="button-cross__icon"
              >
              </span><span className="modal__close-btn-interactive-area"  ></span>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default AddCommentModal;
