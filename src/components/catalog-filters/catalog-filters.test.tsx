
import * as Enzyme from 'enzyme';

import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';

import {getTestStore} from '../../utils/test-utils';

import { BrowserRouter } from 'react-router-dom';
import {CatalogFilters} from './catalog-filters';
import {MAX_PRICE_INITIAL_VALUE, MIN_PRICE_INITIAL_VALUE} from '../../utils/utils';


Enzyme.configure({adapter: new EnzymeReactAdapter()});


it('CatalogFilters successfully rendered', () => {
  const mockSetMinPrice = jest.fn();
  const mockSetMaxPrice = jest.fn();
  const mockSetGuitarsTypes = jest.fn();
  const mockSetGuitarsStrings = jest.fn();
  const mockOnInnerQuerySet = jest.fn();
  const query = {  page: '',
    sort: '',
    minPrice: '',
    maxPrice: ''};

  const tree = mount(
    <Provider store={getTestStore()}>
      <BrowserRouter>
        <CatalogFilters
          setMinPrice ={mockSetMinPrice}
          setMaxPrice={mockSetMaxPrice}
          setGuitarsTypes={mockSetGuitarsTypes}
          setGuitarsStrings={mockSetGuitarsStrings}
          availableMinMaxPrices={[-1, -1]}
          availableGuitarsString={[]}
          availableGuitarsTypes={[]}
          selectedTypes={[]}
          selectedStrings={[]}
          onInnerQuerySet={mockOnInnerQuerySet}
          innerQuery={query}
          selectedMinPrice={MIN_PRICE_INITIAL_VALUE}
          selectedMaxPrice={MAX_PRICE_INITIAL_VALUE}
        />
      </BrowserRouter>
    </Provider>,
  );
  expect(toJson(tree, {mode: 'deep'})).toMatchSnapshot();
});
