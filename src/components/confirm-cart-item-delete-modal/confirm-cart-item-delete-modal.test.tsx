import * as renderer from 'react-test-renderer';
import * as React from 'react';


import {BrowserRouter} from 'react-router-dom';
import ConfirmCartItemDeleteModal from './confirm-cart-item-delete-modal';
import {mockGuitars} from '../../utils/test-utils';

it('AddToCartModalSuccess successfully rendered', () => {
  const mockCloseHandler = jest.fn();
  const mockCartItemDeleteHandler = jest.fn();
  const tree = renderer.create(<BrowserRouter><ConfirmCartItemDeleteModal onCartItemDelete={mockCartItemDeleteHandler} guitar={mockGuitars[0]} onModalClose={mockCloseHandler}/></BrowserRouter>);
  expect(tree).toMatchSnapshot();
});
