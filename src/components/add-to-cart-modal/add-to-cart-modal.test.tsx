import * as renderer from 'react-test-renderer';
import * as React from 'react';


import AddToCartModal from './add-to-cart-modal';
import {mockGuitars} from '../../utils/test-utils';

it('AddToCartModal successfully rendered', () => {
  const mockCloseHandler = jest.fn();
  //TODO
  const tree = renderer.create(<AddToCartModal onAddToCard={jest.fn} guitar={mockGuitars[0]} onModalClose={mockCloseHandler}/>);
  expect(tree).toMatchSnapshot();
});
