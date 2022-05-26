import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Page} from '../../utils/utils';
import {StateModel} from '../../types/redux-models';

import { GuitarModel} from '../../types/guitar-model';
import {connect} from 'react-redux';

import {
  getGuitars,
  getGuitarsError,
  getGuitarsIsResponseReceived, getGuitarsNameFilter,
  getGuitarsWithNameFilter
} from '../../store/guitars/guitars-selectors';
import {GuitarsActionCreator, GuitarsOperation} from '../../store/guitars/guitars-reducer';


interface HeaderProps {
  activePage?: Page;
  guitars: GuitarModel [],
  guitarsWithFilter: GuitarModel [],
  guitarsNameFilter: string,
  fetchGuitars: () => void;
  setGuitarsNameFilter: (filterName: string) => void;
}

function Header(props: HeaderProps) {
  const {activePage, guitars, guitarsWithFilter, guitarsNameFilter, fetchGuitars, setGuitarsNameFilter} = props;

  useEffect(() => {
    if(guitars.length === 0){
      fetchGuitars();
    }
  }, [guitars]);
  const navigate = useNavigate();
  const renderFilteredGuitars = () => guitarsWithFilter.map((guitar) =>
    (
      <li key={guitar.id} onClick={() => {
        navigate(`/product/${guitar.id}`);
        setGuitarsNameFilter('');
      }} className="form-search__select-item" tabIndex={0}
      >
        {guitar.name}
      </li>));


  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to='/'>
          <img className="logo__img"
            width="70"
            height="70"
            src="/img/svg/logo.svg"
            alt="Логотип"
          />
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><Link to='/' className={`link main-nav__link ${activePage === Page.Catalog ? 'link--current' : ''}`} >Каталог</Link>
            </li>
            <li><a className="link main-nav__link" href="#">Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href="#">О компании</a>
            </li>
          </ul>
        </nav>
        <div className="form-search" style={{display: 'flex'}}>
          <form className="form-search__form"  id="form-search">
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg>
              <span className="visually-hidden">Начать поиск</span>
            </button>
            <input value={guitarsNameFilter} onChange={(evt) => {
              setGuitarsNameFilter(evt.target.value);
            }} className="form-search__input" id="search" type="text" autoComplete="off"
            placeholder="что вы ищите?"
            />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul className={`form-search__select-list ${guitarsNameFilter ? 'list-opened' : 'hidden'}`}>
            {guitarsWithFilter.length > 0 && renderFilteredGuitars()}
          </ul>
          <button onClick={() => {
            setGuitarsNameFilter('');
          }} className="form-search__reset" type="reset" form="form-search"
          >
            <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
            <span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <a className="header__cart-link" href="#" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span
            className="header__cart-count"
          >2
          </span>
        </a>
      </div>
    </header>
  );
}
const mapStateToProps = (state: StateModel) => ({
  guitars: getGuitars(state),
  guitarsWithFilter: getGuitarsWithNameFilter(state),
  guitarsNameFilter: getGuitarsNameFilter(state),
  isResponseReceived: getGuitarsIsResponseReceived(state),
  errorMsg: getGuitarsError(state),
});

/* eslint-disable  @typescript-eslint/no-explicit-any */
const mapDispatchToProps = (dispatch: any) => ({
  fetchGuitars() {
    dispatch(GuitarsOperation.getGuitars());
  },
  setGuitarsNameFilter(filter: string){
    dispatch(GuitarsActionCreator.setGuitarsNameFilter(filter));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
export {Header};

