import * as Enzyme from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import {mount, ReactWrapper} from 'enzyme';
import {findByTestAtr} from '../../utils/test-utils';
import AddCommentModalSuccess from './add-comment-modal-success';
import * as React from 'react';


Enzyme.configure({adapter: new EnzymeReactAdapter()});

describe('AddCommentModalSuccess e2e', () => {

  const mockHandlerModalClose = jest.fn();
  let app: ReactWrapper;

  beforeEach(() => {
    app = mount(
      <AddCommentModalSuccess onModalClose={mockHandlerModalClose}/>,
    );
  });

  it('Should modal close executed', async () => {
    const closeFields = await findByTestAtr(app, 'test-close-modal');
    closeFields.forEach((field) => field.simulate('click'));
    expect(mockHandlerModalClose).toHaveBeenCalledTimes(3);
  });
});
