import * as Enzyme from 'enzyme';
import {mount, ReactWrapper} from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import {Provider} from 'react-redux';
import {findByTestAtr, getTestStore, mockCommentToAdd, mockGuitars} from '../../utils/test-utils';
import AddCommentModal, {NUMBER_OF_START} from './add-comment-modal';

Enzyme.configure({adapter: new EnzymeReactAdapter()});

describe('AddCommentModal e2e', () => {

  const mockHandlerModalClose = jest.fn();
  const mockHandlerUserNameSet = jest.fn();
  const mockHandlerAdvantageSet = jest.fn();
  const mockHandlerDisadvantageSet = jest.fn();
  const mockHandlerCommentSet = jest.fn();
  const mockHandlerRatingSet = jest.fn();
  const mockHandlerCommentSubmit = jest.fn();

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
          onCloseModal={mockHandlerModalClose}
          onSetUserName={mockHandlerUserNameSet}
          onSetAdvantage={mockHandlerAdvantageSet }
          onSetDisadvantage={mockHandlerDisadvantageSet}
          onSetComment={mockHandlerCommentSet}
          onSetRating={mockHandlerRatingSet}
          onSubmitHandler={mockHandlerCommentSubmit}
          isNameValidationError ={false}
          isAdvantageValidationError={false}
          isDisadvantageValidationError={false}
          isCommentValidationError={false}
          isRatingValidationError={false}
        />
      </Provider>);
  });

  it('Should modal close executed', async () => {

    const closeFields =  await findByTestAtr(app, 'test-close-modal');
    closeFields.forEach((field) => field.simulate('click'));
    expect(mockHandlerModalClose).toHaveBeenCalledTimes(2);
  });

  it('Should user name changed', async () => {

    const formField =  await findByTestAtr(app, 'test-user-name');
    formField.simulate('change');
    expect(mockHandlerUserNameSet).toHaveBeenCalledTimes(1);

  });

  it('Should advantage changed', async () => {
    const formField =  await findByTestAtr(app, 'test-advantage');
    formField.simulate('change');
    expect(mockHandlerAdvantageSet ).toHaveBeenCalledTimes(1);

  });

  it('Should disadvantage changed', async () => {

    const formField =  await findByTestAtr(app, 'test-disadvantage');
    formField.simulate('change');
    expect(mockHandlerDisadvantageSet).toHaveBeenCalledTimes(1);

  });

  it('Should comment changed', async () => {

    const formField =  await findByTestAtr(app, 'test-comment');

    formField.simulate('change');
    expect(mockHandlerCommentSet).toHaveBeenCalledTimes(1);
  });

  it('Should rating changed', async () => {

    const ratingFields =  await findByTestAtr(app, 'test-rating');
    ratingFields.forEach((field) => field.simulate('change'));
    expect(mockHandlerRatingSet).toHaveBeenCalledTimes(NUMBER_OF_START);
  });

  it('Should addComment works', async () => {

    const formField =  await findByTestAtr(app, 'test-submit');
    formField.simulate('submit');
    expect(mockHandlerCommentSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandlerCommentSubmit).toHaveBeenCalledWith( {...mockCommentToAdd, guitarId: mockGuitars[2].id });
  });

});
