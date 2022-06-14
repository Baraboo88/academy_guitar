import * as Enzyme from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import {mount, ReactWrapper} from 'enzyme';

import {findByTestAtr, mockGuitars} from '../../utils/test-utils';
import * as React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ConfirmCartItemDeleteModal from './confirm-cart-item-delete-modal';

Enzyme.configure({adapter: new EnzymeReactAdapter()});

describe('ConfirmCartItemDeleteModal e2e', () => {

  const mockOnCloseModalHandler = jest.fn();
  const mockOnCartItemDeleteHandler = jest.fn();

  let app: ReactWrapper;

  beforeEach(() => {
    app = mount(
      <BrowserRouter>
        <ConfirmCartItemDeleteModal onCartItemDelete={mockOnCartItemDeleteHandler} guitar={mockGuitars[0]} onModalClose={mockOnCloseModalHandler}/>
      </BrowserRouter>,
    );
  });

  it('Should modal close executed', async () => {
    const closeFields = await findByTestAtr(app, 'test-close-modal');
    closeFields.forEach((field) => field.simulate('click'));
    expect(mockOnCloseModalHandler).toHaveBeenCalledTimes(3);
  });

  it('Should delete from cart executed', async () => {
    const addToCartField = await findByTestAtr(app, 'test-delete-from-cart');
    addToCartField.simulate('click');
    expect(mockOnCartItemDeleteHandler).toHaveBeenCalledTimes(1);
  });

});
