import * as Enzyme from 'enzyme';
import {mount, ReactWrapper} from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import {Provider} from 'react-redux';
import {findByTestAtr, getTestStore, mockCommentToAdd, mockGuitars} from '../../utils/test-utils';
import AddCommentModal, {NUMBER_OF_START} from './add-comment-modal';

Enzyme.configure({adapter: new EnzymeReactAdapter()});

describe('AddCommentModal e2e', () => {

  const mockOnCloseModalHandler = jest.fn();
  const mockSetUserNameHandler = jest.fn();
  const mockSetAdvantageHandler = jest.fn();
  const mockSetDisadvantageHandler = jest.fn();
  const mockSetCommentHandler = jest.fn();
  const mockSetRatingHandler = jest.fn();
  const mockOnSubmitHandler = jest.fn();

  let app: ReactWrapper;

  beforeEach(() => {
    app = mount(
      <Provider store={getTestStore()}>
        <AddCommentModal
          guitar = {mockGuitars[2]}
          advantage={mockCommentToAdd.advantage}
          comment={mockCommentToAdd.comment}
          disadvantage={mockCommentToAdd.disadvantage}
          rating={mockCommentToAdd.rating}
          userName={mockCommentToAdd.userName}
          onCloseModalHandler={mockOnCloseModalHandler}
          setUserNameHandler={mockSetUserNameHandler}
          setAdvantageHandler={mockSetAdvantageHandler}
          setDisadvantageHandler={mockSetDisadvantageHandler}
          setCommentHandler={mockSetCommentHandler}
          setRatingHandler={mockSetRatingHandler}
          onSubmitHandler={mockOnSubmitHandler}
        />
      </Provider>);
  });

  it('Should modal close executed', async () => {

    const closeFields =  await findByTestAtr(app, 'test-close-modal');
    closeFields.forEach((field) => field.simulate('click'));
    expect(mockOnCloseModalHandler).toHaveBeenCalledTimes(2);
  });

  it('Should user name changed', async () => {

    const formField =  await findByTestAtr(app, 'test-user-name');
    formField.simulate('change');
    expect(mockSetUserNameHandler).toHaveBeenCalledTimes(1);

  });

  it('Should advantage changed', async () => {
    const formField =  await findByTestAtr(app, 'test-advantage');
    formField.simulate('change');
    expect(mockSetAdvantageHandler).toHaveBeenCalledTimes(1);

  });

  it('Should disadvantage changed', async () => {

    const formField =  await findByTestAtr(app, 'test-disadvantage');
    formField.simulate('change');
    expect(mockSetDisadvantageHandler).toHaveBeenCalledTimes(1);

  });

  it('Should comment changed', async () => {

    const formField =  await findByTestAtr(app, 'test-comment');

    formField.simulate('change');
    expect(mockSetCommentHandler).toHaveBeenCalledTimes(1);
  });

  it('Should rating changed', async () => {

    const ratingFields =  await findByTestAtr(app, 'test-rating');
    ratingFields.forEach((field) => field.simulate('change'));
    expect(mockSetRatingHandler).toHaveBeenCalledTimes(NUMBER_OF_START);
  });

  it('Should addComment works', async () => {

    const formField =  await findByTestAtr(app, 'test-submit');
    formField.simulate('submit');
    expect(mockOnSubmitHandler).toHaveBeenCalledTimes(1);
    expect(mockOnSubmitHandler).toHaveBeenCalledWith( {...mockCommentToAdd, guitarId: mockGuitars[2].id });
  });

});
