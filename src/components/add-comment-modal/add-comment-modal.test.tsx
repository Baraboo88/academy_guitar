
import * as Enzyme from 'enzyme';

import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import AddCommentModal from './add-comment-modal';
import {getTestStore, mockCommentToAdd, mockGuitars} from '../../utils/test-utils';


Enzyme.configure({adapter: new EnzymeReactAdapter()});


it('AddCommentModal successfully rendered', () => {
  const mockHandlerModalClose = jest.fn();
  const mockHandlerUserNameSet = jest.fn();
  const mockHandlerAdvantageSet = jest.fn();
  const mockHandlerDisadvantageSet = jest.fn();
  const mockHandlerCommentSet = jest.fn();
  const mockHandlerRatingSet = jest.fn();
  const mockHandlerCommentSubmit = jest.fn();
  const tree = mount(
    <Provider store={getTestStore()}>
      <AddCommentModal
        guitar={mockGuitars[0]}
        advantage={mockCommentToAdd.advantage}
        comment={mockCommentToAdd.comment}
        disadvantage={mockCommentToAdd.disadvantage}
        rating={mockCommentToAdd.rating}
        userName={mockCommentToAdd.userName}
        onCloseModal={mockHandlerModalClose}
        onSetUserName={mockHandlerUserNameSet}
        onSetAdvantage={mockHandlerAdvantageSet}
        onSetDisadvantage={mockHandlerDisadvantageSet}
        onSetComment={mockHandlerCommentSet}
        onSetRating={mockHandlerRatingSet}
        onSubmitHandler={mockHandlerCommentSubmit}

      />
    </Provider>,
  );
  expect(toJson(tree, {mode: 'deep'})).toMatchSnapshot();
});
