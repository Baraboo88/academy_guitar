import React, {useCallback, useEffect, useState} from 'react';
import {getDataError, getDataIsResponseReceived, getGuitars} from '../../store/data/data-selectors';
import {StateModel} from '../../types/redux-models';

import { DataOperation} from '../../store/data/data-reducer';
import {connect} from 'react-redux';
import {GuitarModel} from '../../types/guitar-model';
import GuitarCard from '../guitar-card/guitar-card';
import {Link, RouteComponentProps} from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';

const ITEMS_ON_THE_PAGE = 9;


interface MatchParams {
  id?: string;
}

interface MainProps {
  guitars: GuitarModel [];
  onMount: () => void;
  isResponseReceived: boolean;
  errorMsg: string;
  getCommentsCount: (guitars: GuitarModel []) => void;
}


function Main(props: MainProps & RouteComponentProps<MatchParams>) {
  const {onMount, guitars, isResponseReceived, errorMsg, getCommentsCount, history} = props;
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [innerGuitars, setInnerGuitars] = useState<GuitarModel []>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingCommentsCount, setIsLoadingCommentsCount] = useState<boolean>(true);

  useEffect(() => {
    if (isResponseReceived && errorMsg) {
      setError(errorMsg);
    }
    if (!isResponseReceived && guitars.length === 0) {
      onMount();
    } else {
      setIsLoading(false);
      setInnerGuitars(guitars);
      if(isLoadingCommentsCount && guitars.length > 0){
        getCommentsCount(guitars);
        setIsLoadingCommentsCount(false);
      }
    }

  }, [guitars, onMount, isResponseReceived, errorMsg, getCommentsCount, isLoadingCommentsCount]);


  const getAllPages = useCallback(() => {
    let allPages = 0;
    if (guitars) {
      if (guitars.length % ITEMS_ON_THE_PAGE === 0) {
        allPages = Math.floor(guitars.length / ITEMS_ON_THE_PAGE);
      } else {
        allPages = Math.floor(guitars.length / ITEMS_ON_THE_PAGE) + 1;
      }
    }
    return allPages;
  }, [guitars]);

  useEffect(() => {
    if(props.match.params.id){
      setCurrentPage(Number(props.match.params.id));
    } else {
      setCurrentPage(1);
    }

    if(guitars && guitars.length > 0 && getAllPages() < Number(props.match.params.id)){
      history.push('/not-found');
    }

  }, [props.match.params.id, guitars, getAllPages, history]);


  const renderPagination = () => {


    const allPages = getAllPages();
    const pages = [];
    for (let i = 1; i <= allPages; i++) {
      pages.push(i);
    }
    return pages.map((page) =>(
      <li className={`pagination__page ${page === currentPage ? 'pagination__page--active' : ''}`} key={page}>
        <Link to={`/catalog/page/${page}`} className="link pagination__page-link" href="#">
          {page}
        </Link>
      </li>));
  };


  return (
    <div className="wrapper">
      <Header/>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link to={'/'} className="link">Главная</Link>
            </li>
            <li className="breadcrumbs__item"><span >Каталог</span>
            </li>
          </ul>
          <div className="catalog">
            <form className="catalog-filter">
              <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Цена, ₽</legend>
                <div className="catalog-filter__price-range">
                  <div className="form-input">
                    <label className="visually-hidden">Минимальная цена</label>
                    <input type="number" placeholder="1 000" id="priceMin" name="от"/>
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">Максимальная цена</label>
                    <input type="number" placeholder="30 000" id="priceMax" name="до"/>
                  </div>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Тип гитар</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"/>
                  <label htmlFor="acoustic">Акустические гитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input defaultChecked className="visually-hidden" type="checkbox" id="electric" name="electric"/>
                  <label htmlFor="electric">Электрогитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input defaultChecked className="visually-hidden" type="checkbox" id="ukulele" name="ukulele"/>
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Количество струн</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input defaultChecked className="visually-hidden" type="checkbox" id="4-strings" name="4-strings"/>
                  <label htmlFor="4-strings">4</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input defaultChecked className="visually-hidden" type="checkbox" id="6-strings" name="6-strings"/>
                  <label htmlFor="6-strings">6</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings"/>
                  <label htmlFor="7-strings">7</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input disabled className="visually-hidden" type="checkbox" id="12-strings" name="12-strings"/>
                  <label htmlFor="12-strings">12</label>
                </div>
              </fieldset>
              <button className="catalog-filter__reset-btn button button--black-border button--medium"
                type="reset"
              >
                                Очистить
              </button>
            </form>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button className="catalog-sort__type-button" aria-label="по цене">по цене</button>
                <button className="catalog-sort__type-button" aria-label="по популярности">по
                                    популярности
                </button>
              </div>
              <div className="catalog-sort__order">
                <button className="catalog-sort__order-button catalog-sort__order-button--up"
                  aria-label="По возрастанию"
                >
                </button>
                <button className="catalog-sort__order-button catalog-sort__order-button--down"
                  aria-label="По убыванию"
                >
                </button>
              </div>
            </div>
            <div className="cards catalog__cards">
              {error && <span style={{color: 'red', textAlign: 'center'}}>Something went wrong</span>}
              {!isLoading && innerGuitars.slice((currentPage - 1) * ITEMS_ON_THE_PAGE,  (currentPage - 1) * ITEMS_ON_THE_PAGE + ITEMS_ON_THE_PAGE).map((guitar) => <GuitarCard key={guitar.id} card={guitar}/>)}
            </div>
            <div className="pagination page-content__pagination">
              <ul className="pagination__list">
                {currentPage > 1 ?
                  <li className="pagination__page pagination__page--prev" id="prev">
                    <Link to={`/catalog/page/${currentPage - 1}`} className="link pagination__page-link">
                      Назад
                    </Link>
                  </li> : ''}
                {renderPagination()}
                { getAllPages() !== 0 && currentPage < getAllPages()  ?
                  <li className="pagination__page pagination__page--next" id="next">
                    <Link to={`/catalog/page/${currentPage + 1}`} className="link pagination__page-link">
                     Далее
                    </Link>
                  </li> : ''}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}


const mapStateToProps = (state: StateModel) => ({
  guitars: getGuitars(state),
  isResponseReceived: getDataIsResponseReceived(state),
  errorMsg: getDataError(state),
});

/* eslint-disable  @typescript-eslint/no-explicit-any */
const mapDispatchToProps = (dispatch: any) => ({
  onMount() {
    dispatch(DataOperation.getGuitars());
  },
  getCommentsCount(guitars: GuitarModel []){
    dispatch(DataOperation.getCommentsCount(guitars));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);

export {Main};
