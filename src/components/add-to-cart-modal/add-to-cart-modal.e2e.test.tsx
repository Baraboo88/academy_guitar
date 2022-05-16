import * as Enzyme from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import {mount, ReactWrapper} from 'enzyme';

import {findByTestAtr, mockGuitars} from '../../utils/test-utils';
import * as React from 'react';
import AddToCartModal from './add-to-cart-modal';

Enzyme.configure({adapter: new EnzymeReactAdapter()});

describe('AddCommentModalSuccess e2e', () => {

  const mockOnCloseModalHandler = jest.fn();
  let app: ReactWrapper;

  beforeEach(() => {
    app = mount(
      <AddToCartModal guitar={mockGuitars[0]}  onCloseModalHandler={mockOnCloseModalHandler}/>,
    );
  });

  it('Should modal close executed', async () => {
    const closeFields = await findByTestAtr(app, 'test-close-modal');
    closeFields.forEach((field) => field.simulate('click'));
    expect(mockOnCloseModalHandler).toHaveBeenCalledTimes(2);
  });
});
