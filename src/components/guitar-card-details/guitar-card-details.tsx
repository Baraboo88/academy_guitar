import React, {useEffect, useState} from 'react';
import {StateModel} from '../../types/redux-models';
import {getCurrentGuitar, getDataError, getDataIsResponseReceived} from '../../store/data/data-selectors';
import {DataActionCreator, DataOperation} from '../../store/data/data-reducer';
import {connect} from 'react-redux';
import {AddCommentModel, GuitarModel} from '../../types/guitar-model';
import {RouteComponentProps} from 'react-router-dom';
import {getCyrillicRating, getCyrillicType, getPriceWithSpaces, imageAdapter} from '../../utils/utils';
import {renderStars, StarSize} from '../guitar-card/guitar-card';
import Header from '../header/header';
import Footer from '../footer/footer';
import CommentCard from '../comment-card/comment-card';
import AddCommentModal from '../add-comment-modal/add-comment-modal';
import AddCommentModalSuccess from '../add-comment-modal-success/add-comment-modal-success';


const COMMENTS_TO_SKIP = 3;

interface MatchParams {
    id?: string;
}

interface GuitarCardDetailsProps {
    currentGuitar: GuitarModel | null;
    resetCurrentGuitar: () => void;
    onMount: (id: number) => void;
    getComments: (guitar: GuitarModel) => void;
    addComment: (guitar: GuitarModel, comment: AddCommentModel) => void;
    isResponseReceived: boolean;
    error: string;
}


function GuitarCardDetails(props: GuitarCardDetailsProps & RouteComponentProps<MatchParams>) {

  const {currentGuitar, resetCurrentGuitar, onMount, getComments, addComment, isResponseReceived, error} = props;
  const [commentsToSkip, setCommentsToSkip] = useState(COMMENTS_TO_SKIP);
  const [isAddCommentOpened, setIsAddCommentOpened] = useState(false);

  const [userName, setUserName] = useState<string>('');
  const [advantage, setAdvantage] = useState<string>('');
  const [disadvantage, setDisadvantage] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [modalCommentIsSending, setModalCommentIsSending] = useState(false);
  const [isCommentAddSuccess, setIsCommentAddSuccess] = useState(false);

  useEffect(() => {

    onMount(Number(props.match.params.id));

    return () => {
      resetCurrentGuitar();
    };

  }, [props.match.params.id, onMount, resetCurrentGuitar]);

  useEffect(() => {

    if (currentGuitar && !currentGuitar.comments) {
      getComments(currentGuitar);

    }

  }, [currentGuitar]);

  useEffect(() => {

    if(modalCommentIsSending && isResponseReceived && !error){
      setModalCommentIsSending(false);
      setIsCommentAddSuccess(true);
      setUserName('');
      setRating(0);
      setAdvantage('');
      setDisadvantage('');
      setComment('');
    }
  },[modalCommentIsSending, isResponseReceived]);

  const onSubmitHandler = () => {
    if(userName && advantage && disadvantage && comment && rating&& currentGuitar){
      addComment(currentGuitar,{userName, guitarId: currentGuitar?.id, advantage, disadvantage, comment, rating});
      setModalCommentIsSending(true);
    }
  };

  const userNameSetHandler = (name: string) => {
    setUserName(name);
  };

  const advantageSetHandler = (adv: string) => {
    setAdvantage(adv);
  };

  const disadvantageSetHandler = (disadv: string) => {
    setDisadvantage(disadv);
  };

  const commentSetHandler = (userComment: string) => {
    setComment(userComment);
  };

  const ratingSetHandler = (userRating: number) => {
    setRating(userRating);
  };


  const showMoreCommentsHandler = () => {
    setCommentsToSkip(commentsToSkip + COMMENTS_TO_SKIP);
  };

  const closeAddCommentModalHandler = () => {
    setIsAddCommentOpened(false);
  };

  return (
    <div>

      <Header/>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Каталог</a>
            </li>
            <li className="breadcrumbs__item"><a className="link">Товар</a>
            </li>
          </ul>
          {currentGuitar &&
                        <React.Fragment>
                          <div className="product-container">
                            <img className="product-container__img"
                              src={`/img/content/catalog-product-${imageAdapter(currentGuitar.previewImg)}.jpg`}
                              srcSet={`/img/content/catalog-product-${imageAdapter(currentGuitar.previewImg)}@2x.jpg 2x`}
                              width="90"
                              height="235" alt=""
                            />
                            <div className="product-container__info-wrapper">
                              <h2 className="product-container__title title title--big title--uppercase">{currentGuitar.name}</h2>
                              <div className="rate product-container__rating">
                                {renderStars(currentGuitar.rating, StarSize.CardDetails)}
                                <p className="visually-hidden">Оценка: {getCyrillicRating(currentGuitar.rating)}</p>
                              </div>
                              <div className="tabs">
                                <a className="button button--medium tabs__button"
                                  href="#characteristics"
                                >Характеристики
                                </a>
                                <a
                                  className="button button--black-border button--medium tabs__button"
                                  href="#description"
                                >Описание
                                </a>
                                <div className="tabs__content" id="characteristics">
                                  <table className="tabs__table">
                                    <tr className="tabs__table-row">
                                      <td className="tabs__title">Артикул:</td>
                                      <td className="tabs__value">{currentGuitar.vendorCode}</td>
                                    </tr>
                                    <tr className="tabs__table-row">
                                      <td className="tabs__title">Тип:</td>
                                      <td className="tabs__value">{getCyrillicType(currentGuitar.type)}</td>
                                    </tr>
                                    <tr className="tabs__table-row">
                                      <td className="tabs__title">Количество струн:</td>
                                      <td className="tabs__value">{currentGuitar.stringCount} струнная</td>
                                    </tr>
                                  </table>
                                  <p className="tabs__product-description hidden">{currentGuitar.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="product-container__price-wrapper">
                              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
                              <p className="product-container__price-info product-container__price-info--value">{getPriceWithSpaces(currentGuitar.price)} ₽</p>
                              <a
                                className="button button--red button--big product-container__button" href="#"
                              >Добавить в
                                        корзину
                              </a>
                            </div>
                          </div>

                          <section className="reviews">
                            <h3 className="reviews__title title title--bigger">Отзывы</h3>
                            <button onClick={() => {
                              setIsAddCommentOpened(true);
                              setIsCommentAddSuccess(false);
                            }}
                            className="button button--red-border button--big reviews__sumbit-button"
                            >Оставить отзыв
                            </button>

                            {(currentGuitar?.comments && currentGuitar?.comments.length > 0) ? currentGuitar?.comments.slice(0, commentsToSkip).map((innerComment) =>
                              <CommentCard key={innerComment.id} comment={innerComment}/>) : <div/>}

                            {(currentGuitar?.comments && currentGuitar?.comments.length > 0 && commentsToSkip < currentGuitar?.comments.length) &&

                                    <button onClick={() => {
                                      showMoreCommentsHandler();
                                    }} className="button button--medium reviews__more-button"
                                    >Показать еще отзывы
                                    </button>}


                            <button className="button button--up button--red-border button--big reviews__up-button"
                              onClick={() => {
                                window.scrollTo(0, 0);
                              }}
                            >Наверх
                            </button>

                          </section>
                          {isAddCommentOpened && (isCommentAddSuccess ? <AddCommentModalSuccess closeModalHandler={closeAddCommentModalHandler}/> :
                            <AddCommentModal closeModalHandler={closeAddCommentModalHandler} guitar={currentGuitar}
                              userName={userName} setUserNameHandler={userNameSetHandler}
                              advantage={advantage} setAdvantageHandler={advantageSetHandler}
                              disadvantage={disadvantage} setDisadvantageHandler={disadvantageSetHandler}
                              rating={rating} setRatingHandler={ratingSetHandler}
                              comment={comment} setCommentHandler={commentSetHandler}
                              onSubmitHandler={onSubmitHandler}
                            />)}
                        </React.Fragment>}

        </div>

      </main>
      <Footer/>
    </div>
  );
}

const mapStateToProps = (state: StateModel) => ({
  currentGuitar: getCurrentGuitar(state),
  isResponseReceived: getDataIsResponseReceived(state),
  error: getDataError(state),
});

/* eslint-disable  @typescript-eslint/no-explicit-any */
const mapDispatchToProps = (dispatch: any) => (
  {
    onMount(id: number) {
      dispatch(DataOperation.getGuitarById(id));
    },
    getComments(guitar: GuitarModel) {
      dispatch(DataOperation.getCurrentGuitarComments(guitar));
    },
    resetCurrentGuitar() {
      dispatch(DataActionCreator.setCurrentGuitar(null));
      dispatch(DataActionCreator.setIsResponseReceived(false));
      dispatch(DataActionCreator.setError(''));
    },
    addComment(guitar: GuitarModel, comment: AddCommentModel){
      dispatch(DataOperation.addComment(guitar, comment));
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(GuitarCardDetails);
