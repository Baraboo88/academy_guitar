
import * as Enzyme from 'enzyme';

import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import AddCommentModal from './add-comment-modal';
import {getTestStore, mockCommentToAdd, mockGuitars} from '../../utils/test-utils';


Enzyme.configure({adapter: new EnzymeReactAdapter()});


it('AddCommentModal successfully rendered', () => {
  const mockCloseModalHandler = jest.fn();
  const mockSetUserNameHandler = jest.fn();
  const mockSetAdvantageHandler = jest.fn();
  const mockSetDisadvantageHandler = jest.fn();
  const mockSetCommentHandler = jest.fn();
  const mockSetRatingHandler = jest.fn();
  const mockOnSubmitHandler = jest.fn();
  const tree = mount(
    <Provider store={getTestStore()}>
      <AddCommentModal
        guitar={mockGuitars[0]}
        advantage={mockCommentToAdd.advantage}
        comment={mockCommentToAdd.comment}
        disadvantage={mockCommentToAdd.disadvantage}
        rating={mockCommentToAdd.rating}
        userName={mockCommentToAdd.userName}
        onCloseModalHandler={mockCloseModalHandler}
        setUserNameHandler={mockSetUserNameHandler}
        setAdvantageHandler={mockSetAdvantageHandler}
        setDisadvantageHandler={mockSetDisadvantageHandler}
        setCommentHandler={mockSetCommentHandler}
        setRatingHandler={mockSetRatingHandler}
        onSubmitHandler={mockOnSubmitHandler}

      />
    </Provider>,
  );
  expect(toJson(tree, {mode: 'deep'})).toMatchSnapshot();
});
