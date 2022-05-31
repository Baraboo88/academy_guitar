import * as Enzyme from 'enzyme';
import {mount, ReactWrapper} from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import {Provider} from 'react-redux';

import {getTestStore} from '../../utils/test-utils';

import {MemoryRouter} from 'react-router-dom';
import {CatalogFilters} from './catalog-filters';
import {GuitarStringCount, GuitarType} from '../../types/guitar-model';


Enzyme.configure({adapter: new EnzymeReactAdapter()});


describe('CatalogFilters successfully rendered', () => {
  const mockSetMinPrice = jest.fn();
  const mockSetMaxPrice = jest.fn();
  const mockSetGuitarsTypes = jest.fn();
  const mockSetGuitarsStrings = jest.fn();
  const mockOnInnerQuerySet = jest.fn();
  const MIN_PRICE = 2000;
  const MAX_PRICE = 20000;
  const query = {  page: '',
    sort: '',
    minPrice: '',
    maxPrice: ''};

  beforeEach(() => {
    mount(
      <Provider store={getTestStore()}>
        <MemoryRouter initialEntries = {[`/?minPrice=${MIN_PRICE}&maxPrice=${MAX_PRICE}&guitarTypes=${GuitarType.Ukulele}&guitarStrings=${GuitarStringCount.Six},${GuitarStringCount.Seven}`]}>
          <CatalogFilters
            setMinPrice ={mockSetMinPrice}
            setMaxPrice={mockSetMaxPrice}
            setGuitarsTypes={mockSetGuitarsTypes}
            setGuitarsStrings={mockSetGuitarsStrings}
            availableMinMaxPrices={[100, 35000]}
            availableGuitarsString={[]}
            availableGuitarsTypes={[]}
            selectedTypes={[]}
            selectedStrings={[]}
            onInnerQuerySet={mockOnInnerQuerySet}
            innerQuery={query}
          />
        </MemoryRouter >
      </Provider>,
    );
  });


  it('Should SetMinPrice successfully working', () => {
    expect(mockSetMinPrice).toHaveBeenCalledTimes(1);
    expect(mockSetMinPrice).toHaveBeenCalledWith(MIN_PRICE);
  });
  it('Should setMaxPrice successfully working', () => {
    expect(mockSetMaxPrice).toHaveBeenCalledTimes(1);
    expect(mockSetMaxPrice).toHaveBeenCalledWith(MAX_PRICE);
  });
  it('Should setGuitarsTypes successfully working', () => {
    expect(mockSetGuitarsTypes).toHaveBeenCalledTimes(1);
    expect(mockSetGuitarsTypes).toHaveBeenCalledWith([GuitarType.Ukulele]);
  });
  it('Should setGuitarsStrings successfully working', () => {
    expect(mockSetGuitarsStrings).toHaveBeenCalledTimes(1);
    expect(mockSetGuitarsStrings).toHaveBeenCalledWith([GuitarStringCount.Six,GuitarStringCount.Seven]);
  });

  it('Should onInnerQuerySet successfully working', () => {
    expect(mockOnInnerQuerySet).toHaveBeenCalledTimes(4);
    expect(mockOnInnerQuerySet).toHaveBeenCalledWith({...query, minPrice: MIN_PRICE});
    expect(mockOnInnerQuerySet).toHaveBeenCalledWith({...query, maxPrice: MAX_PRICE});
    expect(mockOnInnerQuerySet).toHaveBeenCalledWith({...query,  guitarTypes: [GuitarType.Ukulele]});
    expect(mockOnInnerQuerySet).toHaveBeenCalledWith({...query,  guitarStrings:[GuitarStringCount.Six,GuitarStringCount.Seven]});
  });
});
