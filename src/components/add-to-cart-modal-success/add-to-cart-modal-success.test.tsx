import * as renderer from 'react-test-renderer';
import * as React from 'react';


import AddToCartModalSuccess from './add-to-cart-modal-success';
import {BrowserRouter} from 'react-router-dom';

it('AddToCartModalSuccess successfully rendered', () => {
  const mockCloseHandler = jest.fn();

  const tree = renderer.create(<BrowserRouter><AddToCartModalSuccess onModalClose={mockCloseHandler}/></BrowserRouter>);
  expect(tree).toMatchSnapshot();
});
