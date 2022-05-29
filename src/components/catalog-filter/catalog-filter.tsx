import React, {useEffect, useState} from 'react';
import {getCyrillicTypeFiler, getPriceWithSpaces, Query, QueryModel, SortDirection, SortType} from '../../utils/utils';
import {StateModel} from '../../types/redux-models';
import {

  getGuitarsSelectedMaxPrice,
  getGuitarsSelectedMinPrice,
  getGuitarsSelectedStrings,
  getGuitarsSelectedTypes,

  getGuitarsStrings,
  getGuitarsTypes,
  getMinMaxPrice

} from '../../store/guitars/guitars-selectors';
import {GuitarsActionCreator} from '../../store/guitars/guitars-reducer';
import { GuitarStringCount, GuitarType} from '../../types/guitar-model';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useQuery} from '../../hooks/use-query/use-query';
import {useDebounce} from 'use-debounce';
import * as queryString from 'query-string';

interface CatalogFilterProps {
  setMinPrice: (minPrice: number) => void,
  setMaxPrice: (maxPrice: number) => void;
  setGuitarsTypes: (guitarTypes: GuitarType []) => void;
  setNoOfStrings: (noOfStrings: GuitarStringCount []) => void;
  availableMinMaxPrices: number [],
  availableGuitarsString: GuitarStringCount [],
  availableGuitarsTypes: GuitarType [],
  selectedMinPrice: number,
  selectedMaxPrice: number,
  selectedTypes: GuitarType [];
  selectedStrings: GuitarStringCount [];
  onInnerQuerySet: (newQuery: QueryModel) => void;
  innerQuery: QueryModel;
}


function CatalogFilter(props: CatalogFilterProps) {
  const {
    setMinPrice,
    setMaxPrice,

    availableMinMaxPrices,
    availableGuitarsString,
    availableGuitarsTypes,
    selectedMinPrice,

    innerQuery,
    onInnerQuerySet,
    selectedMaxPrice,
    selectedTypes,
    selectedStrings,
    setGuitarsTypes,
    setNoOfStrings,
  } = props;

  const [innerMinPrice, setInnerMinPrice] = useState('');
  const [innerMaxPrice, setInnerMaxPrice] = useState('');

  const navigate = useNavigate();
  const query = useQuery();
  const [debouncedMinPrice] = useDebounce(innerMinPrice, 1000);
  const [debouncedMaxPrice] = useDebounce(innerMaxPrice, 1000);
  const minPriceFromQuery = query.get(Query.MinPrices);
  const maxPriceFromQuery = query.get(Query.MaxPrices);

  useEffect(()=> {
    if(minPriceFromQuery){
      let newMinPrice = Number(minPriceFromQuery);

      if(newMinPrice < availableMinMaxPrices[0]){
        newMinPrice = availableMinMaxPrices[0];
      }
      if(newMinPrice > availableMinMaxPrices[1]){
        newMinPrice = availableMinMaxPrices[1];
      }
      onInnerQuerySet({...innerQuery, minPrice:newMinPrice});
      setInnerMinPrice(newMinPrice.toString());
      setMinPrice(newMinPrice);
    }

  }, [minPriceFromQuery, setMinPrice, availableMinMaxPrices]);

  useEffect(()=> {
    if(maxPriceFromQuery){
      let newMaxPrice = Number(maxPriceFromQuery);
      if(newMaxPrice > availableMinMaxPrices[1]){
        newMaxPrice = availableMinMaxPrices[1];
      }
      if(newMaxPrice < availableMinMaxPrices[0]){
        newMaxPrice = availableMinMaxPrices[0];
      }
      onInnerQuerySet({...innerQuery, maxPrice:newMaxPrice});
      setInnerMaxPrice(newMaxPrice.toString());
      setMaxPrice(newMaxPrice);
    }

  }, [maxPriceFromQuery, setMaxPrice, availableMinMaxPrices]);

  useEffect(() => {
    if(debouncedMinPrice && Number(debouncedMinPrice) >= 0) {
      navigate(generateMinPriceLink(Number(debouncedMinPrice)));
    }
  }, [debouncedMinPrice]);


  useEffect(() => {
    if(innerMaxPrice && debouncedMaxPrice){
      navigate(Number(debouncedMaxPrice) >= Number(innerMinPrice) ? generateMaxPriceLink(Number(debouncedMaxPrice)) : generateMaxPriceLink(Number(innerMinPrice)));
    }

  }, [debouncedMaxPrice]);


  const generateMaxPriceLink = (elPrice:number) => `?${queryString.stringify({...innerQuery, maxPrice: elPrice},  {skipEmptyString: true})}`;

  const generateMinPriceLink = (elPrice:number) => `?${queryString.stringify({...innerQuery, minPrice: elPrice},  {skipEmptyString: true})}`;


  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input value={Number(innerMinPrice) <= -1 ? '' : innerMinPrice} onChange={(evt) => {
              setInnerMinPrice(evt.target.value);
            }} type="number" placeholder={`${availableMinMaxPrices.length > 0 ? getPriceWithSpaces(availableMinMaxPrices[0]) : ''}`} id="priceMin" name="от"
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input value={Number(innerMaxPrice) <= -1 ? '' : innerMaxPrice} onChange={(evt) => {
              setInnerMaxPrice(evt.target.value);
            }}
            type="number" placeholder={`${availableMinMaxPrices.length > 1 ? getPriceWithSpaces(availableMinMaxPrices[1]) : ''}`} id="priceMax" name="до"
            />
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
  );
}

const mapStateToProps = (state: StateModel) => ({
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
export default connect(mapStateToProps, mapDispatchToProps)(CatalogFilter);

export {CatalogFilter};
