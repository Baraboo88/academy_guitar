import * as Enzyme from 'enzyme';
import {mount, ReactWrapper} from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import {Provider} from 'react-redux';

import {findByTestAtr, getTestStore} from '../../utils/test-utils';

import {BrowserRouter} from 'react-router-dom';

import {Header} from './header';
import {INITIAL_COUNT} from '../../store/cart/cart-selector';


Enzyme.configure({adapter: new EnzymeReactAdapter()});


describe('Header e2e', () => {
  const mockSetSearchGuitarName = jest.fn();
  const mockFetchGuitars = jest.fn();
  let app: ReactWrapper;

  beforeEach(() => {
    app = mount(
      <Provider store={getTestStore()}>
        <BrowserRouter>
          <Header
            guitars = {[]}
            guitarsWithFilter={[]}
            searchGuitarName=''
            fetchGuitars = {mockFetchGuitars}
            setSearchGuitarName= {mockSetSearchGuitarName}
            cartItemsCount={INITIAL_COUNT}
          />
        </BrowserRouter >
      </Provider>,
    );
  });


  it('Should FetchGuitars successfully working', () => {
    expect(mockFetchGuitars).toHaveBeenCalledTimes(1);
  });

  it('Should guitarsNameFilter changed', async () => {
    const formField =  await findByTestAtr(app, 'test-search-name');
    formField.simulate('change');
    expect(mockSetSearchGuitarName).toHaveBeenCalledTimes(1);

  });

});
