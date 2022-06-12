import * as React from 'react';


import {Cart} from './cart';
import {getTestStore, mockCartItems} from '../../utils/test-utils';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import toJson from 'enzyme-to-json';
import * as Enzyme from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new EnzymeReactAdapter()});


it('Cart successfully rendered', () => {
  const mockSetCartItems = jest.fn();

  const tree = mount(
    <Provider store={getTestStore()}>
      <BrowserRouter>
        <Cart cartItems={mockCartItems} setCartItems ={mockSetCartItems}/>
      </BrowserRouter>
    </Provider>,
  );
  expect(toJson(tree, {mode: 'deep'})).toMatchSnapshot();
});
