import React, {useCallback, useEffect, useState} from 'react';

import {StateModel} from '../../types/redux-models';

import {connect} from 'react-redux';
import {GuitarModel, GuitarStringCount, GuitarType} from '../../types/guitar-model';
import GuitarCard from '../guitar-card/guitar-card';
import {Link, useNavigate} from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import {
  getGuitarsError,
  getGuitarsIsResponseReceived, getGuitarsSelectedMaxPrice,
  getGuitarsSelectedMinPrice,
  getGuitarsSelectedStrings,
  getGuitarsSelectedTypes,
  getGuitarsSortDirection,
  getGuitarsSortType,
  getGuitarsStrings,
  getGuitarsTypes,
  getMinMaxPrice,
  getSortedGuitars
} from '../../store/guitars/guitars-selectors';
import {GuitarsActionCreator, GuitarsOperation} from '../../store/guitars/guitars-reducer';
import {
  getCyrillicTypeFiler, getPriceWithSpaces,
  Page,
  Query,
  QueryModel,
  SortDirection,
  SortType,
  SortTypeWithDirection
} from '../../utils/utils';
import {useQuery} from '../../hooks/use-query/use-query';
import * as queryString from 'query-string';

const ITEMS_ON_THE_PAGE = 9;


interface MainProps {
    guitars: GuitarModel [];
    onMount: () => void;
    sortDirection: SortDirection,
    sortType: SortType,
    setSortType: (sortType: SortType) => void;
    setSortDirection: (sortDirection: SortDirection) => void;
    isResponseReceived: boolean;
    errorMsg: string;
    getCommentsCount: (guitars: GuitarModel []) => void;
    setMinPrice: (minPrice: number) => void,
    setMaxPrice: (maxPrice: number) => void;
    setGuitarsTypes: (guitarTypes: GuitarType []) => void;
    setNoOfStrings: (noOfStrings: GuitarStringCount []) => void;
    availableMinMaxPrices: number [],
    availableGuitarsString: GuitarStringCount [],
    availableGuitarsTypes: GuitarType [],
    selectedMinPrice: number,
    selectedMaxPrice: number,
    selectedTypes: GuitarType [],
    selectedStrings: GuitarStringCount [],
}


function Main(props: MainProps) {
  const {
    onMount,
    guitars,
    isResponseReceived,
    errorMsg,
    getCommentsCount,
    sortDirection,
    sortType,
    setSortType,
    setSortDirection,
    setMinPrice,
    setMaxPrice,
    setGuitarsTypes,
    setNoOfStrings,
    availableMinMaxPrices,
    availableGuitarsString,
    availableGuitarsTypes,
    selectedMinPrice,
    selectedMaxPrice,
    selectedTypes,
    selectedStrings,
  } = props;
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [innerGuitars, setInnerGuitars] = useState<GuitarModel []>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingCommentsCount, setIsLoadingCommentsCount] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [innerQueryString, setInnerQueryString] = useState<QueryModel>({});
  const [innerMinPrice, setInnerMinPrice] = useState(selectedMinPrice);

  const navigate = useNavigate();
  const query = useQuery();
  const pageNo = query.get(Query.PageNo);
  const sort = query.get(Query.Sort);
  const newPrice = query.get(Query.MinPrices);
  const maxPrice = query.get(Query.MaxPrices);

  useEffect(() => {
    if (isResponseReceived && errorMsg) {
      setError(errorMsg);
    }
    if (!isResponseReceived && guitars.length === 0) {
      onMount();
    } else {
      setIsLoading(false);
      setInnerGuitars(guitars);
      if (isLoadingCommentsCount && guitars.length > 0) {
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
    if (pageNo) {
      setInnerQueryString({...innerQueryString, page: pageNo});
      setCurrentPage(Number(pageNo));
    } else {
      setCurrentPage(1);
    }

    if (guitars && guitars.length > 0 && getAllPages() < Number(pageNo)) {
      navigate('/not-found');
    }

  }, [pageNo, guitars, getAllPages, navigate]);

  useEffect(() => {
    if (sort && guitars.length > 0) {
      if (sort === SortTypeWithDirection.PopularityLowToHigh) {
        setInnerQueryString({...innerQueryString, sort:SortTypeWithDirection.PopularityLowToHigh});
        setSortType(SortType.Popularity);
        setSortDirection(SortDirection.LowToHigh);
      }
      if (sort === SortTypeWithDirection.PopularityHighToLow) {
        setInnerQueryString({...innerQueryString, sort:SortTypeWithDirection.PopularityHighToLow});
        setSortType(SortType.Popularity);
        setSortDirection(SortDirection.HighToLow);
      }
      if (sort === SortTypeWithDirection.PriceLowToHigh) {
        setInnerQueryString({...innerQueryString, sort:SortTypeWithDirection.PriceLowToHigh});
        setSortType(SortType.Price);
        setSortDirection(SortDirection.LowToHigh);
      }
      if (sort === SortTypeWithDirection.PriceHighToLow) {
        setInnerQueryString({...innerQueryString, sort:SortTypeWithDirection.PriceHighToLow});
        setSortType(SortType.Price);
        setSortDirection(SortDirection.HighToLow);
      }
    }
  }, [sort, guitars, setSortDirection, setSortType]);

  useEffect(()=> {
    if(newPrice){
      let newMinPrice: number;
      if( availableMinMaxPrices.length === 0){
        newMinPrice = Number(newPrice) < 0 ? 0 :Number(newPrice);

      } else {
        newMinPrice = Number(newPrice) < availableMinMaxPrices[0] ? availableMinMaxPrices[0] :Number(newPrice);
      }
      setInnerQueryString({...innerQueryString, minPrice:newMinPrice});
      setMinPrice(newMinPrice);
    }

  }, [newPrice, setMinPrice]);

  useEffect(()=> {
    if(selectedMinPrice){
      setInnerMinPrice(selectedMinPrice)
    }

  }, [selectedMinPrice]);

  useEffect(() => {
    setTimeout(() => {navigate(generateMinPriceLink(innerMinPrice));}, 2000);
  }, [innerMinPrice]);


  const renderPagination = () => {


    const allPages = getAllPages();
    const pages = [];
    for (let i = 1; i <= allPages; i++) {
      pages.push(i);
    }
    return pages.map((page) => (
      <li className={`pagination__page ${page === currentPage ? 'pagination__page--active' : ''}`} key={page}>
        <Link to={generatePageLink(page)}
          className="link pagination__page-link"
        >
          {page}
        </Link>
      </li>));
  };

  const getSortQuery = (type: SortType, direction: SortDirection) => {
    if (type === SortType.Price) {
      return direction === SortDirection.HighToLow ? SortTypeWithDirection.PriceHighToLow : SortTypeWithDirection.PriceLowToHigh;
    } else {
      return direction === SortDirection.HighToLow ? SortTypeWithDirection.PopularityHighToLow : SortTypeWithDirection.PopularityLowToHigh;
    }

  };


  const generateMaxPriceLink = (elPrice:number) => `?${queryString.stringify({...innerQueryString, maxPrice: elPrice},  {skipEmptyString: true})}`;

  const generateMinPriceLink = (elPrice:number) => `?${queryString.stringify({...innerQueryString, minPrice: elPrice},  {skipEmptyString: true})}`;

  const generatePageLink = (page: number) => `?${queryString.stringify({...innerQueryString, page},  {skipEmptyString: true})}`;

  const generateSortLink = (type: SortType, direction: SortDirection) => `?${queryString.stringify({...innerQueryString, sort: getSortQuery(type, direction)},{skipEmptyString: true})}`;

  return (
    <div className="wrapper">
      <Header activePage={Page.Catalog}/>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link to={'/'} className="link">Главная</Link>
            </li>
            <li className="breadcrumbs__item"><span>Каталог</span>
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
                    <input value={innerMinPrice === -1 ? '' : innerMinPrice} onChange={(evt) => {
                      setInnerMinPrice(Number(evt.target.value));

                    }} type="number" placeholder={`${availableMinMaxPrices.length > 0 ? getPriceWithSpaces(availableMinMaxPrices[0]) : ''}`} id="priceMin" name="от"
                    />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">Максимальная цена</label>
                    <input type="number" placeholder={`${availableMinMaxPrices.length > 1 ? getPriceWithSpaces(availableMinMaxPrices[1]) : ''}`} id="priceMax" name="до"/>
                  </div>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Тип гитар</legend>
                {availableGuitarsTypes && availableGuitarsTypes.map((guitarType) =>
                  (
                    <div key={guitarType} className="form-checkbox catalog-filter__block-item">
                      <input className="visually-hidden" type="checkbox" id={guitarType} name={guitarType}/>
                      <label htmlFor={guitarType}>{getCyrillicTypeFiler(guitarType)}</label>
                    </div>))}

              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Количество струн</legend>
                {availableGuitarsString && availableGuitarsString.map((stringNo) =>
                  (
                    <div key={stringNo} className="form-checkbox catalog-filter__block-item">
                      <input  className="visually-hidden" type="checkbox"
                        id={`${stringNo}-strings`} name={`${stringNo}-strings`}
                      />
                      <label htmlFor={`${stringNo}-strings`}>{stringNo}</label>
                    </div>))}

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
                <button onClick={() => {
                  navigate(generateSortLink(SortType.Price, sortDirection));
                }}
                className={`catalog-sort__type-button ${sortType === SortType.Price ? 'catalog-sort__type-button--active' : ''}`}
                aria-label="по цене"
                >по цене
                </button>
                <button onClick={() => {
                  navigate(generateSortLink(SortType.Popularity, sortDirection));
                }}
                className={`catalog-sort__type-button ${sortType === SortType.Popularity ? 'catalog-sort__type-button--active' : ''}`}
                aria-label="по популярности"
                >по
                                    популярности
                </button>
              </div>
              <div className="catalog-sort__order">
                <button onClick={() => {
                  navigate(generateSortLink(sortType === SortType.None || sortType === SortType.Price ? SortType.Price : SortType.Popularity, SortDirection.LowToHigh));
                }}
                className={`catalog-sort__order-button catalog-sort__order-button--up  ${sortDirection === SortDirection.LowToHigh ? 'catalog-sort__order-button--active' : ''}`}
                aria-label="По возрастанию"
                >
                </button>
                <button onClick={() => {
                  navigate(generateSortLink(sortType === SortType.None || sortType === SortType.Price ? SortType.Price : SortType.Popularity, SortDirection.HighToLow));
                }}
                className={`catalog-sort__order-button ${sortDirection === SortDirection.HighToLow ? 'catalog-sort__order-button--active' : ''} catalog-sort__order-button--down`}
                aria-label="По убыванию"
                >
                </button>
              </div>
            </div>
            <div className="cards catalog__cards">
              {error && <span style={{color: 'red', textAlign: 'center'}}>Something went wrong</span>}
              {!isLoading && innerGuitars.slice((currentPage - 1) * ITEMS_ON_THE_PAGE, (currentPage - 1) * ITEMS_ON_THE_PAGE + ITEMS_ON_THE_PAGE).map((guitar) =>
                <GuitarCard key={guitar.id} card={guitar}/>)}
            </div>
            <div className="pagination page-content__pagination">
              <ul className="pagination__list">
                {currentPage > 1 ?
                  <li className="pagination__page pagination__page--prev" id="prev">
                    <Link
                      to={generatePageLink(currentPage - 1)}
                      className="link pagination__page-link"
                    >
                                            Назад
                    </Link>
                  </li> : ''}
                {renderPagination()}
                {getAllPages() !== 0 && currentPage < getAllPages() ?
                  <li className="pagination__page pagination__page--next" id="next">
                    <Link
                      to={generatePageLink(currentPage + 1)}
                      className="link pagination__page-link"
                    >
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
  guitars: getSortedGuitars(state),
  sortDirection: getGuitarsSortDirection(state),
  sortType: getGuitarsSortType(state),
  isResponseReceived: getGuitarsIsResponseReceived(state),
  errorMsg: getGuitarsError(state),
  availableMinMaxPrices: getMinMaxPrice(state),
  availableGuitarsString: getGuitarsStrings(state),
  availableGuitarsTypes: getGuitarsTypes(state),
  selectedMinPrice: getGuitarsSelectedMinPrice(state),
  selectedMaxPrice: getGuitarsSelectedMaxPrice(state),
  selectedTypes: getGuitarsSelectedTypes(state),
  selectedStrings: getGuitarsSelectedStrings(state),
});

/* eslint-disable  @typescript-eslint/no-explicit-any */
const mapDispatchToProps = (dispatch: any) => ({
  onMount() {
    dispatch(GuitarsOperation.getGuitars());
  },
  getCommentsCount(guitars: GuitarModel []) {
    dispatch(GuitarsOperation.getCommentsCount(guitars));
  },
  setSortType(sortType: SortType) {
    dispatch(GuitarsActionCreator.setGuitarsSortType(sortType));
  },
  setSortDirection(sortDirection: SortDirection) {
    dispatch(GuitarsActionCreator.setGuitarsSortDirection(sortDirection));
  },
  setMinPrice(minPrice: number) {
    dispatch(GuitarsActionCreator.setMinPrice(minPrice));
  },
  setMaxPrice(maxPrice: number) {
    dispatch(GuitarsActionCreator.setMaxPrice(maxPrice));
  },
  setGuitarsTypes(guitarTypes: GuitarType []) {
    dispatch(GuitarsActionCreator.setGuitarsTypes(guitarTypes));
  },
  setNoOfStrings(noOfStrings: GuitarStringCount []) {
    dispatch(GuitarsActionCreator.setNoOfStrings(noOfStrings));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);

export {Main};
