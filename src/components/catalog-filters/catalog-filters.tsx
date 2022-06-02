import React, {useCallback, useEffect, useState} from 'react';
import {
  ENTER_KEY,
  getCyrillicTypeFiler,
  getPriceWithSpaces, MAX_PRICE_INITIAL_VALUE,
  MIN_PRICE_INITIAL_VALUE,
  Query,
  QueryModel
} from '../../utils/utils';
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

import * as queryString from 'query-string';


interface CatalogFilterProps {
  setMinPrice: (minPrice: number) => void,
  setMaxPrice: (maxPrice: number) => void;
  setGuitarsTypes: (guitarTypes: GuitarType []) => void;
  setGuitarsStrings: (noOfStrings: GuitarStringCount []) => void;
  availableMinMaxPrices: number [],
  availableGuitarsString: GuitarStringCount [],
  availableGuitarsTypes: GuitarType [],
  selectedTypes: GuitarType [];
  selectedStrings: GuitarStringCount [];
  onInnerQuerySet: (newQuery: QueryModel) => void;
  innerQuery: QueryModel;
  selectedMaxPrice: number;
  selectedMinPrice: number;
}


function CatalogFilters(props: CatalogFilterProps) {
  const {
    setMinPrice,
    setMaxPrice,

    availableMinMaxPrices,
    availableGuitarsString,
    availableGuitarsTypes,
    innerQuery,
    onInnerQuerySet,
    selectedTypes,
    selectedStrings,
    setGuitarsTypes,
    setGuitarsStrings,
    selectedMinPrice,
    selectedMaxPrice,
  } = props;

  const [innerMinPrice, setInnerMinPrice] = useState('');
  const [innerMaxPrice, setInnerMaxPrice] = useState('');

  const navigate = useNavigate();
  const query = useQuery();

  const minPriceFromQuery = query.get(Query.MinPrice);
  const maxPriceFromQuery = query.get(Query.MaxPrice);
  const guitarsTypesFromQuery = query.get(Query.GuitarTypes);
  const guitarStringsFromQuery = query.get(Query.GuitarStrings);
  useEffect(()=> {
    if(minPriceFromQuery){
      let newMinPrice = Number(minPriceFromQuery);

      if(newMinPrice < availableMinMaxPrices[0]){
        newMinPrice = availableMinMaxPrices[0];
      }
      if(newMinPrice > availableMinMaxPrices[1]){
        newMinPrice = availableMinMaxPrices[1];
      }
      setMinPrice(newMinPrice);
    } else {
      setMinPrice(MIN_PRICE_INITIAL_VALUE);
    }


  }, [minPriceFromQuery, setMinPrice, availableMinMaxPrices, onInnerQuerySet]);


  useEffect(() => {
    if(Number(innerMaxPrice) !== selectedMaxPrice) {

      onInnerQuerySet({maxPrice:selectedMaxPrice=== MAX_PRICE_INITIAL_VALUE ? MAX_PRICE_INITIAL_VALUE : Number(selectedMaxPrice)});
      setInnerMaxPrice(selectedMaxPrice.toString());
    }
  }, [selectedMaxPrice]);

  useEffect(() => {
    if(Number(innerMinPrice) !== selectedMinPrice) {
      onInnerQuerySet({minPrice:selectedMinPrice=== MIN_PRICE_INITIAL_VALUE ? MIN_PRICE_INITIAL_VALUE : Number(innerMinPrice)});
      setInnerMinPrice(selectedMinPrice.toString());
    }


  }, [selectedMinPrice]);

  useEffect(()=> {
    if(maxPriceFromQuery){
      let newMaxPrice = Number(maxPriceFromQuery);
      if(newMaxPrice !== selectedMaxPrice){
        if(newMaxPrice > availableMinMaxPrices[1]){
          newMaxPrice = availableMinMaxPrices[1];
        }
        if(newMaxPrice < availableMinMaxPrices[0]){
          newMaxPrice = availableMinMaxPrices[0];
        }
        setMaxPrice(newMaxPrice);
      } else {
        setMaxPrice(MAX_PRICE_INITIAL_VALUE);
      }

    }


  }, [maxPriceFromQuery, setMaxPrice, availableMinMaxPrices, onInnerQuerySet]);


  useEffect(() => {

    if(guitarsTypesFromQuery){
      const newGuitarTypes = guitarsTypesFromQuery.split(',').map((el) => el  as GuitarType);

      if(selectedTypes.length !== newGuitarTypes.length){

        onInnerQuerySet({guitarTypes: newGuitarTypes});
        setGuitarsTypes(newGuitarTypes);
      }

    } else {
      if(selectedTypes.length !== 0){
        onInnerQuerySet({guitarTypes: []});
        setGuitarsTypes([]);
      }
    }
  },[selectedTypes, guitarsTypesFromQuery, onInnerQuerySet, setGuitarsTypes]);

  useEffect(() => {
    if(guitarStringsFromQuery){
      const newGuitarStrings = guitarStringsFromQuery.toString().split(',').map((el) => el  as GuitarStringCount);
      if(selectedStrings.length !== newGuitarStrings.length){
        setGuitarsStrings(newGuitarStrings);
        onInnerQuerySet({ guitarStrings: newGuitarStrings});
      }

    } else {
      if(selectedStrings.length !== 0){
        onInnerQuerySet({guitarStrings: []});
        setGuitarsStrings([]);
      }
    }
  },[selectedStrings, guitarStringsFromQuery, setGuitarsStrings,onInnerQuerySet]);

  const enterFunction = useCallback((event) => {

    if (event.key === ENTER_KEY) {
      let minPrice = '';
      let maxPrice = '';

      if(innerMinPrice && Number(innerMinPrice) >= 0) {
        minPrice = innerMinPrice;
      }
      if( innerMaxPrice && Number(innerMaxPrice) >= Number(innerMinPrice)){
        maxPrice = Number(innerMaxPrice) >= Number(innerMinPrice) ? innerMaxPrice :innerMinPrice;
      } else {
        setInnerMaxPrice('');
      }
      if(selectedMinPrice !== Number(innerMinPrice)){
        setMinPrice(MIN_PRICE_INITIAL_VALUE);
      }
      if(selectedMaxPrice !== Number(innerMaxPrice)){
        setMaxPrice(MAX_PRICE_INITIAL_VALUE);
      }


      navigate(generateMinMaxPriceLink(minPrice, maxPrice));


    }
  }, [innerMinPrice, innerMaxPrice, navigate]);


  useEffect(() => {
    document.addEventListener('keydown', enterFunction, false);

    return () => {
      document.removeEventListener('keydown', enterFunction, false);

    };
  }, [enterFunction]);

  const generateMinMaxPriceLink = (minPrice: string, maxPrice: string) => `?${queryString.stringify({...innerQuery, minPrice, maxPrice},  {skipEmptyString: true, arrayFormat: 'comma'})}`;

  const generateGuitarsTypeLink = (elements:GuitarType []) => `?${queryString.stringify({...innerQuery, guitarTypes: elements},  {skipEmptyString: true, arrayFormat: 'comma'})}`;

  const generateGuitarsStringsLink = (elements:GuitarStringCount []) => `?${queryString.stringify({...innerQuery, guitarStrings: elements},  {skipEmptyString: true, arrayFormat: 'comma'})}`;


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
            <input value={Number(innerMaxPrice) <= -1  ? '' : innerMaxPrice} onChange={(evt) => {
              setInnerMaxPrice(evt.target.value);
            }}
            type="number" placeholder={`${availableMinMaxPrices.length > 1 ? getPriceWithSpaces(availableMinMaxPrices[1]) : ''}`} id="priceMax" name="до"
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {Object.values(GuitarType).map((guitarType, index) =>(
          <div key={guitarType} className="form-checkbox catalog-filter__block-item">
            <input onChange={() => {
              const selectedIndex = selectedTypes.indexOf(guitarType);
              const newSelectedGuitarsTypes = [...selectedTypes];
              if(selectedIndex >= 0){
                newSelectedGuitarsTypes.splice(selectedIndex, 1);
              } else {
                newSelectedGuitarsTypes.push(guitarType);
              }
              navigate(generateGuitarsTypeLink(newSelectedGuitarsTypes));
            }} checked={selectedTypes.includes(guitarType)} className="visually-hidden" type="checkbox" id={guitarType} name={guitarType} disabled={!availableGuitarsTypes.includes(guitarType)}
            />
            <label htmlFor={guitarType}>{getCyrillicTypeFiler(guitarType)}</label>
          </div>),

        )}

      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {Object.values(GuitarStringCount).filter((value ) => !isNaN(Number(value))).map((stringNo) =>
          (
            <div key={stringNo} className="form-checkbox catalog-filter__block-item">
              <input onChange={() => {
                const selectedIndex = selectedStrings.indexOf(stringNo);
                const newSelectedGuitarsStrings = [...selectedStrings];
                if(selectedIndex >= 0){
                  newSelectedGuitarsStrings.splice(selectedIndex, 1);
                } else {
                  newSelectedGuitarsStrings.push(stringNo);
                }
                navigate(generateGuitarsStringsLink(newSelectedGuitarsStrings));
              }} className="visually-hidden" type="checkbox"
              id={`${stringNo}-strings`} name={`${stringNo}-strings`}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              disabled={!availableGuitarsString.includes(Number(stringNo))}
              />
              <label htmlFor={`${stringNo}-strings`}>{stringNo}</label>
            </div>))}

      </fieldset>
      <button onClick={() => {

        navigate(`?${queryString.stringify({...innerQuery, guitarTypes: [], guitarStrings: [], maxPrice:'', minPrice:''},  {skipEmptyString: true})}`);
      }} className="catalog-filter__reset-btn button button--black-border button--medium"
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
  setGuitarsStrings(noOfStrings: GuitarStringCount []) {
    dispatch(GuitarsActionCreator.setNoOfStrings(noOfStrings));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CatalogFilters);

export {CatalogFilters};
