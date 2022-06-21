import * as Enzyme from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import {mount, ReactWrapper} from 'enzyme';

import {findByTestAtr} from '../../utils/test-utils';
import * as React from 'react';
import {BrowserRouter} from 'react-router-dom';
import AddToCartModalSuccess from './add-to-cart-modal-success';

Enzyme.configure({adapter: new EnzymeReactAdapter()});

describe('AddToCartModalSuccess e2e', () => {

  const mockOnCloseModalHandler = jest.fn();

  let app: ReactWrapper;

  beforeEach(() => {
    app = mount(
      <BrowserRouter>
        <AddToCartModalSuccess isFromCatalog onModalClose={mockOnCloseModalHandler}/>
      </BrowserRouter>,
    );
  });

  it('Should modal close executed', async () => {
    const closeFields = await findByTestAtr(app, 'test-close-modal');
    closeFields.forEach((field) => field.simulate('click'));
    expect(mockOnCloseModalHandler).toHaveBeenCalledTimes(3);
  });

});
