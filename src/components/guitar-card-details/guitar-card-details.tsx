import React, {useCallback, useEffect, useState} from 'react';
import {StateModel} from '../../types/redux-models';
import {getCurrentGuitar, getCurrentGuitarError, getCurrentGuitarIsResponseReceived} from '../../store/current-guitar/current-guitar-selectors';
import {connect} from 'react-redux';
import {AddCommentModel, CartItemModel, GuitarCommentModel, GuitarModel} from '../../types/guitar-model';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {
  getCyrillicRating,
  getCyrillicType,
  getPriceWithSpaces,
  getAdapterImage,
  ErrorMsg,
  handlerCartItemIncrease
} from '../../utils/utils';
import {renderStars, StarSize} from '../guitar-card/guitar-card';
import Header from '../header/header';
import Footer from '../footer/footer';
import CommentCard from '../comment-card/comment-card';
import AddCommentModal from '../add-comment-modal/add-comment-modal';
import AddCommentModalSuccess from '../add-comment-modal-success/add-comment-modal-success';
import AddToCartModal from '../add-to-cart-modal/add-to-cart-modal';

import {CurrentGuitarOperation} from '../../store/current-guitar/current-guitar-reducer';
import {TailSpin} from 'react-loader-spinner';
import {CurrentGuitarActionCreator} from '../../store/current-guitar/current-guitar-actions';
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from '../../index';
import {AxiosStatic} from 'axios';
import {Action} from 'redux';
import {getCartItems} from '../../store/cart/cart-selector';
import {CartActionCreator} from '../../store/cart/cart-actions';
import AddToCartModalSuccess from '../add-to-cart-modal-success/add-to-cart-modal-success';


const COMMENTS_TO_SKIP = 3;

interface GuitarCardDetailsProps {
    currentGuitar: GuitarModel | null;
    resetCurrentGuitar: () => void;
    onMount: (id: number) => void;
    getComments: (guitar: GuitarModel) => void;
    addComment: (guitar: GuitarModel, comment: AddCommentModel) => void;
    isResponseReceived: boolean;
    resetIsResponseReceived: () => void;
    error: string;
    cartItems: CartItemModel [];
    setCartItems: (cartItems: CartItemModel []) => void;
}

export enum ActiveTab{
  Characteristics= 'characteristics',
  Description='description'
}

function GuitarCardDetails(props: GuitarCardDetailsProps ) {

  const {currentGuitar, resetCurrentGuitar, onMount, getComments, addComment, isResponseReceived, error, resetIsResponseReceived, cartItems, setCartItems } = props;
  const [commentsToSkip, setCommentsToSkip] = useState(COMMENTS_TO_SKIP);
  const [isAddCommentOpened, setIsAddCommentOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const [userName, setUserName] = useState<string>('');
  const [advantage, setAdvantage] = useState<string>('');
  const [disadvantage, setDisadvantage] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [modalCommentIsSending, setModalCommentIsSending] = useState(false);
  const [isCommentAddSuccess, setIsCommentAddSuccess] = useState(false);

  //validation
  const [isNameValidationError, setIsNameValidationError] = useState(false);
  const [isAdvantageValidationError, setIsAdvantageValidationError] = useState(false);
  const [isDisadvantageValidationError, setIsDisadvantageValidationError] = useState(false);
  const [isCommentValidationError, setIsCommentValidationError] = useState(false);
  const [isRatingValidationError, setIsRatingValidationError] = useState(false);

  const [activeTab, setActiveTab] = useState<ActiveTab>();
  const [isAddToCardPopUpOpened, setIsAddToCardPopUpOpened] = useState(false);
  const [isAddToCardPopUpOpenedSuccess, setIsAddToCardPopUpOpenedSuccess] = useState(false);

  const handlerIsAddToCardClose = () => {
    setIsAddToCardPopUpOpenedSuccess(false);
  };

  const handlerCartItemAdd = () => {
    setIsAddToCardPopUpOpened(false);
    setIsAddToCardPopUpOpenedSuccess(true);
    if(currentGuitar){
      setCartItems(handlerCartItemIncrease(cartItems, currentGuitar));
    }

  };

  const navigate = useNavigate();

  const {id, cat} = useParams();

  const handlerCommentsShowMore = useCallback(() => {

    setCommentsToSkip(commentsToSkip + COMMENTS_TO_SKIP);
  },[commentsToSkip]);


  useEffect(() => {
    if(error){
      if (error === ErrorMsg.NotFound) {
        navigate('/not-found');
      } else {
        setErrorMsg(error);
      }

    }

  }, [error, navigate]);

  useEffect( () => {
    onMount(Number(id));

    return () => {
      resetCurrentGuitar();
    };

  }, [id, onMount, resetCurrentGuitar, setIsLoading]);

  useEffect(() => {
    if(currentGuitar) {
      if( cat === ActiveTab.Characteristics){
        setActiveTab(ActiveTab.Characteristics);
      }

      if( cat === ActiveTab.Description){
        setActiveTab(ActiveTab.Description);
      }
    } else {
      setActiveTab(ActiveTab.Characteristics);
    }

  }, [cat, currentGuitar]);

  useEffect(() => {
    if(currentGuitar){
      setIsLoading(false);
      if(!currentGuitar.comments){
        getComments(currentGuitar);
      }
    }


  }, [currentGuitar, getComments]);

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
  },[modalCommentIsSending, isResponseReceived, error]);

  useEffect(() => () => {
    resetIsResponseReceived();
  },[resetIsResponseReceived]);

  const handlerCommentSubmit = (commentAdded: AddCommentModel) => {
    if(!commentAdded.userName){
      setIsNameValidationError(true);
    }
    if(!commentAdded.advantage){
      setIsAdvantageValidationError(true);
    }
    if(!commentAdded.disadvantage){
      setIsDisadvantageValidationError(true);
    }
    if(!commentAdded.comment){
      setIsCommentValidationError(true);
    }
    if(!commentAdded.rating){
      setIsRatingValidationError(true);
    }
    if(commentAdded.userName && commentAdded.advantage && commentAdded.disadvantage && commentAdded.comment && commentAdded.rating&& currentGuitar){
      addComment(currentGuitar,commentAdded);
      setModalCommentIsSending(true);
    }
  };

  const handlerAddToCartModalClose = () => {
    setIsAddToCardPopUpOpened(false);
  };

  const handlerUserNameSet = (name: string) => {
    setUserName(name);
    setIsNameValidationError(false);
  };

  const handlerAdvantageSet = (adv: string) => {
    setAdvantage(adv);
    setIsAdvantageValidationError(false);
  };

  const handlerDisadvantageSet = (disadv: string) => {
    setDisadvantage(disadv);
    setIsDisadvantageValidationError(false);
  };

  const handlerCommentSet = (userComment: string) => {
    setComment(userComment);
    setIsCommentValidationError(false);
  };

  const handlerRatingSet = (userRating: number) => {
    setRating(userRating);
    setIsRatingValidationError(false);
  };

  const handlerAddCommentModalClose = () => {
    setIsAddCommentOpened(false);
  };


  return (
    <div className="wrapper">

      <Header/>

      <main className="page-content">


        <div className="container">
          {(errorMsg || isLoading) &&
              <div style={{marginLeft: 'auto', marginRight: 'auto', display: 'flex', justifyContent: 'center'}}>
                {isLoading && <TailSpin  color="#000000" height={80} width={80} />}
                {errorMsg &&       <span style={{color: 'red', textAlign: 'center'}}>Something went wrong</span>}

              </div>}


          {currentGuitar &&
                  <>
                    <h1 className="page-content__title title title--bigger">{currentGuitar.name}</h1>
                    <ul className="breadcrumbs page-content__breadcrumbs">
                      <li className="breadcrumbs__item"><Link to={'/'} className="link">Главная</Link>
                      </li>
                      <li className="breadcrumbs__item"><Link to={'/'} className="link">Каталог</Link>
                      </li>
                      <li className="breadcrumbs__item"><span >{currentGuitar.name}</span>
                      </li>
                    </ul>


                    <div className="product-container">
                      <img className="product-container__img"
                        src={`/img/content/catalog-product-${getAdapterImage(currentGuitar.previewImg)}.jpg`}
                        srcSet={`/img/content/catalog-product-${getAdapterImage(currentGuitar.previewImg)}@2x.jpg 2x`}
                        width="90"
                        height="235" alt=""
                      />
                      <div className="product-container__info-wrapper">
                        <h2 className="product-container__title title title--big title--uppercase">{currentGuitar.name}</h2>
                        <div className="rate product-container__rating">
                          {renderStars(currentGuitar.rating, StarSize.CardDetails)}
                          <p className="visually-hidden">Оценка: {getCyrillicRating(currentGuitar.rating)}</p>
                          <p className="rate__count">
                            <span
                              className="visually-hidden"
                            >Всего оценок:
                            </span> {currentGuitar.comments ? currentGuitar.comments.length : 0}
                          </p>
                        </div>
                        <div className="tabs">
                          <Link to={`/product/${id}/${ActiveTab.Characteristics}`}
                            className={`button button--medium tabs__button ${activeTab !== ActiveTab.Characteristics ? 'button--black-border' : ''}`}
                          >
                      Характеристики
                          </Link>
                          <Link
                            to={`/product/${id}/${ActiveTab.Description}`}
                            className={`button button--medium tabs__button ${activeTab !== ActiveTab.Description ? 'button--black-border' : ''} `}
                          >Описание
                          </Link>
                          <div className="tabs__content" id="characteristics">
                            <table className={`tabs__table ${activeTab !== ActiveTab.Characteristics ? 'hidden' : ''}`}>
                              <tbody>
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
                              </tbody>
                            </table>
                            <p className={`tabs__product-description  ${activeTab !== ActiveTab.Description ? 'hidden' : ''}`}>{currentGuitar.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="product-container__price-wrapper">
                        <p className="product-container__price-info product-container__price-info--title">Цена:</p>
                        <p className="product-container__price-info product-container__price-info--value">{getPriceWithSpaces(currentGuitar.price)} ₽</p>
                        <button
                          onClick={() => {
                            setIsAddToCardPopUpOpened(true);
                          }}
                          className="button button--red button--big product-container__button"
                        >Добавить в
                    корзину
                        </button>
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

                      {(currentGuitar?.comments && currentGuitar?.comments.length > 0) ? currentGuitar?.comments.slice(0, commentsToSkip).map((innerComment:GuitarCommentModel) =>
                        <CommentCard key={innerComment.id} comment={innerComment}/>) : <div/>}

                      {(currentGuitar?.comments && commentsToSkip < currentGuitar?.comments?.length  && currentGuitar?.comments.length > 0 && commentsToSkip < currentGuitar?.comments.length) &&

                    <button onClick={() => {
                      handlerCommentsShowMore();
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
                    {isAddCommentOpened && (isCommentAddSuccess ?
                      <AddCommentModalSuccess onModalClose={handlerAddCommentModalClose}/> :
                      <AddCommentModal onCloseModal={handlerAddCommentModalClose} guitar={currentGuitar}
                        userName={userName} onSetUserName={handlerUserNameSet}
                        advantage={advantage} onSetAdvantage={handlerAdvantageSet}
                        disadvantage={disadvantage} onSetDisadvantage={handlerDisadvantageSet}
                        rating={rating} onSetRating={handlerRatingSet}
                        comment={comment} onSetComment={handlerCommentSet}
                        onSubmitHandler={handlerCommentSubmit}
                        isNameValidationError ={isNameValidationError}
                        isAdvantageValidationError = {isAdvantageValidationError}
                        isDisadvantageValidationError ={isDisadvantageValidationError}
                        isCommentValidationError={isCommentValidationError}
                        isRatingValidationError={isRatingValidationError}
                      />)}

                    {isAddToCardPopUpOpened && <AddToCartModal onAddToCart={handlerCartItemAdd } onModalClose={handlerAddToCartModalClose} guitar={currentGuitar}/>}
                    {isAddToCardPopUpOpenedSuccess && <AddToCartModalSuccess onModalClose={handlerIsAddToCardClose}/>}
                  </>}
        </div>
      </main>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state: StateModel) => ({
  currentGuitar: getCurrentGuitar(state),
  cartItems: getCartItems(state),
  isResponseReceived: getCurrentGuitarIsResponseReceived(state),
  error: getCurrentGuitarError(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, AxiosStatic, Action>) => (
  {
    onMount(id: number) {
      dispatch(CurrentGuitarOperation.getGuitarById(id));
    },
    getComments(guitar: GuitarModel) {
      dispatch(CurrentGuitarOperation.getCurrentGuitarComments(guitar));
    },
    resetCurrentGuitar() {
      dispatch(CurrentGuitarActionCreator.setCurrentGuitar(null));
      dispatch(CurrentGuitarActionCreator.setIsResponseReceived(false));
      dispatch(CurrentGuitarActionCreator.setError(''));
    },
    addComment(guitar: GuitarModel, comment: AddCommentModel){
      dispatch(CurrentGuitarOperation.addComment(guitar, comment));
    },
    resetIsResponseReceived() {
      dispatch(CurrentGuitarActionCreator.setIsResponseReceived(false));
    },
    setCartItems(cartItems: CartItemModel []) {
      dispatch(CartActionCreator.setCartItems(cartItems));
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(GuitarCardDetails);
export {GuitarCardDetails};
