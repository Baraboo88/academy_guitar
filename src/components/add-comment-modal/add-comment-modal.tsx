import React from 'react';
import {GuitarModel} from '../../types/guitar-model';
import {getCyrillicRating} from '../../utils/utils';
import withModal from '../../hoc/with-modal';
import FocusTrap from 'focus-trap-react';

interface AddCommentModalProps{
  closeModalHandler: () => void;
  guitar?: GuitarModel;
  userName: string;
  setUserNameHandler: (name: string) => void;
  advantage: string;
  setAdvantageHandler: (adv: string) => void;
  disadvantage:string;
  setDisadvantageHandler: (disadv: string) => void;
  comment: string;
  setCommentHandler: (comment: string) => void;
  rating: number;
  setRatingHandler: (rating: number) => void;
  onSubmitHandler: () => void;
}


const NUMBER_OF_START = 5;
const MOCK_FILL_VALUE = 1;

function AddCommentModal(props: AddCommentModalProps) {
  const{closeModalHandler, guitar,userName,
    setUserNameHandler,
    advantage,
    setAdvantageHandler,
    disadvantage,
    setDisadvantageHandler,
    comment,
    setCommentHandler,
    rating,
    setRatingHandler, onSubmitHandler} = props;


  const renderStars = () => new Array(NUMBER_OF_START).fill(MOCK_FILL_VALUE).map((_,index) => {
    const starNo = NUMBER_OF_START - index + 1;
    return (
      <React.Fragment key={getCyrillicRating(starNo)}>
        <input className="visually-hidden" id={`star-${starNo}`} name="rate" type="radio" value={starNo} onChange={(evt) => {
          setRatingHandler(Number(evt.target.value));
        }}
        />
        <label className="rate__label" htmlFor={`star-${starNo}`} title={getCyrillicRating(starNo)}></label>
      </React.Fragment>);
  });

  return (
    <FocusTrap>
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={closeModalHandler}></div>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitar && guitar.name}</h3>

            <form className="form-review" onSubmit={(evt) => {
              evt.preventDefault();
              onSubmitHandler();
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
                      setUserNameHandler(evt.target.value);
                    }}
                  />
                  {!userName && <p className="form-review__warning">Заполните поле</p>}
                </div>
                <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse" >
                    {renderStars()}

                    {!rating && <p className="rate__message">Поставьте оценку</p>}
                  </div>
                </div>
              </div>
              <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
              <input onChange={(evt) => {
                setAdvantageHandler(evt.target.value);
              }} className="form-review__input" id="adv" type="text" autoComplete="off"
              />
              {!advantage && <p className="form-review__warning">Заполните поле</p>}
              <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
              <input onChange={(evt) => {
                setDisadvantageHandler(evt.target.value);
              }} className="form-review__input" id="disadv" type="text" autoComplete="off"
              />
              {!disadvantage && <p className="form-review__warning">Заполните поле</p>}
              <label className="form-review__label form-review__label--required"
                htmlFor="comment"
              >Комментарий
              </label>
              <textarea onChange={(evt) => {
                setCommentHandler(evt.target.value);
              }} className="form-review__input form-review__input--textarea" id="comment" rows={10}
              autoComplete="off"
              >
              </textarea>
              {!comment && <p className="form-review__warning">Заполните поле</p>}
              <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв
              </button>

            </form>

            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
              <span
                className="button-cross__icon"
              >
              </span><span className="modal__close-btn-interactive-area" onClick={closeModalHandler}></span>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default withModal(AddCommentModal);
