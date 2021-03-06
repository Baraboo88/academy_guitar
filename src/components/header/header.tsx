import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {ENTER_KEY, Page} from '../../utils/utils';
import {StateModel} from '../../types/redux-models';

import { GuitarModel} from '../../types/guitar-model';
import {connect} from 'react-redux';

import {
  getGuitars,
  getGuitarsError,
  getGuitarsIsResponseReceived, getSearchGuitarName,
  getGuitarsWithNameFilter
} from '../../store/guitars/guitars-selectors';

import { GuitarsActionCreator, GuitarsOperation} from '../../store/guitars/guitars-actions';
import { RootState} from '../../index';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {AxiosStatic} from 'axios';
import {getCartItemsCount} from '../../store/cart/cart-selector';


interface HeaderProps {
  activePage?: Page;
  guitars: GuitarModel [],
  guitarsWithFilter: GuitarModel [],
  searchGuitarName: string,
  fetchGuitars: () => void;
  setSearchGuitarName: (filterName: string) => void;
  cartItemsCount: number;
}

function Header(props: HeaderProps) {
  const {activePage, guitars, guitarsWithFilter, searchGuitarName, fetchGuitars, setSearchGuitarName, cartItemsCount} = props;


  useEffect(() => {
    if(guitars.length === 0){
      fetchGuitars();
    }
  }, [guitars, fetchGuitars]);
  const navigate = useNavigate();

  const handlerSearchedGuitarClick = (id: number) => {
    navigate(`/product/${id}`);
    setSearchGuitarName('');
  };

  const renderFilteredGuitars = () => guitarsWithFilter.map((guitar) =>
    (
      <li key={guitar.id} onKeyDown={(evt) => {
        if(evt.key === ENTER_KEY){
          handlerSearchedGuitarClick(guitar.id);
        }

      }} onClick={() => {
        handlerSearchedGuitarClick(guitar.id);
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
            alt="??????????????"
          />
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><Link to='/' className={`link main-nav__link ${activePage === Page.Catalog ? 'link--current' : ''}`} >??????????????</Link>
            </li>
            <li><a className="link main-nav__link" href="#">?????? ?????????????</a>
            </li>
            <li><a className="link main-nav__link" href="#">?? ????????????????</a>
            </li>
          </ul>
        </nav>
        <div className="form-search" style={{display: 'flex'}}>
          <form className="form-search__form"  id="form-search">
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg>
              <span className="visually-hidden">???????????? ??????????</span>
            </button>
            <input value={searchGuitarName} onChange={(evt) => {
              setSearchGuitarName(evt.target.value);
            }} className="form-search__input" id="search" type="text" autoComplete="off"
            placeholder="?????? ???? ???????????"
            data-test="test-search-name"
            />
            <label className="visually-hidden" htmlFor="search">??????????</label>
          </form>
          <ul className={`form-search__select-list ${searchGuitarName ? 'list-opened' : 'hidden'}`}>
            {guitarsWithFilter.length > 0 && renderFilteredGuitars()}
          </ul>
          <button onClick={() => {
            setSearchGuitarName('');
          }} className="form-search__reset" type="reset" form="form-search"
          >
            <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
            <span className="visually-hidden">???????????????? ??????????</span>
          </button>
        </div>
        <Link to={'/cart'} className="header__cart-link" aria-label="??????????????">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">?????????????? ?? ??????????????</span>
          {cartItemsCount > 0 &&
            <span
              className="header__cart-count"
            >{cartItemsCount}
            </span>}

        </Link>
      </div>
    </header>
  );
}
const mapStateToProps = (state: StateModel) => ({
  guitars: getGuitars(state),
  guitarsWithFilter: getGuitarsWithNameFilter(state),
  searchGuitarName: getSearchGuitarName(state),
  isResponseReceived: getGuitarsIsResponseReceived(state),
  errorMsg: getGuitarsError(state),
  cartItemsCount: getCartItemsCount(state),
});


const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, AxiosStatic, Action>) => ({
  fetchGuitars() {
    dispatch(GuitarsOperation.getGuitars());
  },
  setSearchGuitarName(filter: string){
    dispatch(GuitarsActionCreator.setSearchGuitarName(filter));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
export {Header};

