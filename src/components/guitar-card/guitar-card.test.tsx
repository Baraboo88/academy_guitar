import * as renderer from 'react-test-renderer';
import * as React from 'react';


import {GuitarCard} from './guitar-card';
import { mockGuitars} from '../../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';


it('GuitarCard successfully rendered', () => {
  const tree = renderer.create(  <BrowserRouter><GuitarCard card={mockGuitars[0]} setAddOneToCartItems={jest.fn()}/></BrowserRouter>);
  expect(tree).toMatchSnapshot();
});
