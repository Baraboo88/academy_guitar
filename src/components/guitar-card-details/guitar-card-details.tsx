import React, {useEffect} from 'react';
import {StateModel} from '../../types/redux-models';
import {getCurrentGuitar} from '../../store/data/data-selectors';
import {DataActionCreator, DataOperation} from '../../store/data/data-reducer';
import {connect} from 'react-redux';
import {GuitarModel} from '../../types/guitar-model';
import {RouteComponentProps} from 'react-router-dom';
import {getCyrillicRating, getCyrillicType, getPriceWithSpaces, imageAdapter} from '../../utils/utils';
import {renderStars} from '../guitar-card/guitar-card';
import Header from '../header/header';
import Footer from '../footer/footer';

interface MatchParams {
  id?: string;
}

interface GuitarCardDetailsProps {
  currentGuitar: GuitarModel | null;
  resetCurrentGuitar: () => void;
  onMount: (id: number) => void;
}


function GuitarCardDetails(props: GuitarCardDetailsProps & RouteComponentProps<MatchParams>) {

  const{currentGuitar, resetCurrentGuitar, onMount } = props;

  useEffect(() => {

    onMount(Number(props.match.params.id));
    return () => {
      resetCurrentGuitar();
    };

  }, [props.match.params.id, onMount, resetCurrentGuitar]);

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
            <div className="product-container">
              <img className="product-container__img"
                src={`/img/content/catalog-product-${imageAdapter(currentGuitar.previewImg)}.jpg`}
                srcSet={`/img/content/catalog-product-${imageAdapter(currentGuitar.previewImg)}@2x.jpg 2x`} width="90"
                height="235" alt=""
              />
              <div className="product-container__info-wrapper">
                <h2 className="product-container__title title title--big title--uppercase">{currentGuitar.name}</h2>
                <div className="rate product-container__rating">
                  {renderStars(currentGuitar.rating, true)}
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
            </div>}

          <section className="reviews">
            <h3 className="reviews__title title title--bigger">Отзывы</h3>
            <a
              className="button button--red-border button--big reviews__sumbit-button" href="#"
            >Оставить отзыв
            </a>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Иванов Максим</h4>
                <span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть
                            чехла и ремня.
              </p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Перова Ольга</h4>
                <span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть
                            чехла и ремня.
              </p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Преображенская
                                Ксения
                </h4><span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть
                            чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и
                            ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У
                            гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня.
              </p>
            </div>
            <button className="button button--medium reviews__more-button">Показать еще отзывы</button>
            <a className="button button--up button--red-border button--big reviews__up-button"
              href="#header"
            >Наверх
            </a>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

const mapStateToProps = (state: StateModel) => ({
  currentGuitar: getCurrentGuitar(state),
});

/* eslint-disable  @typescript-eslint/no-explicit-any */
const mapDispatchToProps = (dispatch: any) => (
  {
    onMount(id: number) {
      dispatch(DataOperation.getGuitarById(id));
    },
    resetCurrentGuitar() {
      dispatch(DataActionCreator.setCurrentGuitar(null));
      dispatch(DataActionCreator.setIsResponseReceived(false));
      dispatch(DataActionCreator.setError(''));
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(GuitarCardDetails);
