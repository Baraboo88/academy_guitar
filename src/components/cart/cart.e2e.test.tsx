import * as Enzyme from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import {mount, ReactWrapper} from 'enzyme';

import {findByTestAtr, getTestStore, mockCartItems, mockGuitars} from '../../utils/test-utils';
import * as React from 'react';
import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import {Cart} from './cart';

Enzyme.configure({adapter: new EnzymeReactAdapter()});

describe('ConfirmCartItemDeleteModal e2e', () => {

  const mockAddOneToCartItems = jest.fn();
  const mockAddCustomToCartItems = jest.fn();
  const mockDeleteOneFromCartItems = jest.fn();
  const mockDeleteFromCartItems = jest.fn();
  const mockResetErrorMessage = jest.fn();
  const mockGetPromoDiscount = jest.fn();

  let app: ReactWrapper;

  beforeEach(() => {
    app = mount(
      <Provider store={getTestStore()}>
        <BrowserRouter>
          <Cart
            cartItems={mockCartItems}
            addOneToCartItems={mockAddOneToCartItems}
            addCustomToCartItems={mockAddCustomToCartItems}
            deleteOneFromCartItems={mockDeleteOneFromCartItems}
            deleteFromCartItems={mockDeleteFromCartItems}
            totalAmount={2000}
            resetCartErrorMessage={mockResetErrorMessage}
            getPromoDiscount={mockGetPromoDiscount}
            errorMessage={''}
            discountAmount={15}
            isResponseReceived
          />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('Should AddCustomToCartItems executed', async () => {
    const fields = await findByTestAtr(app, 'test-custom-count');
    fields.forEach((field) => field.simulate('blur'));
    expect(mockAddCustomToCartItems).toHaveBeenCalledTimes(mockCartItems.length);
  });

  it('Should DeleteOneFromCartItems executed', async () => {
    const fields = await findByTestAtr(app, 'test-decrease-one');
    fields.forEach((field) => field.simulate('click'));
    expect(mockDeleteOneFromCartItems).toHaveBeenCalledTimes(mockCartItems.length);
  });


  it('Should AddOneToCartItems executed', async () => {
    const fields = await findByTestAtr(app, 'test-add-one');
    fields.forEach((field) => field.simulate('click'));
    expect(mockAddOneToCartItems).toHaveBeenCalledTimes(mockCartItems.length);
  });

  it('Should mockGetPromoDiscount from cart executed', async () => {
    const field = await findByTestAtr(app, 'test-promo-submit');
    field.simulate('submit');
    expect(mockGetPromoDiscount).toHaveBeenCalledTimes(1);
  });

  it('Should resetCartErrorMessage from cart executed', async () => {
    const field = await findByTestAtr(app, 'test-change-promo');
    field.simulate('change');
    expect(mockResetErrorMessage).toHaveBeenCalledTimes(1);
  });

});
