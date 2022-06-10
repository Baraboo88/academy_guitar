import {mount, ReactWrapper} from 'enzyme';

import {getTestStore, mockGuitars} from '../../utils/test-utils';
import { GuitarCardDetails} from './guitar-card-details';
import {BrowserRouter} from 'react-router-dom';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as Enzyme from 'enzyme';


import 'intersection-observer';

import React from 'react';
import {ErrorMsg} from '../../utils/utils';
import {Provider} from 'react-redux';


Enzyme.configure({adapter: new EnzymeReactAdapter()});

const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 1,
    cat: 'characteristics',
  }),
  useNavigate: () => mockedNavigator,
}));

describe('GuitarCardDetails e2e', () => {

  const mockResetCurrentGuitar = jest.fn();
  const mockOnMount = jest.fn();
  const mockGetComments = jest.fn();
  const mockAddComment = jest.fn();
  const mockResetIsResponseReceived = jest.fn();


  let app: ReactWrapper;
  //TODO
  beforeEach(() => {
    app = mount(
      <Provider store={getTestStore()}>
        <BrowserRouter>
          <GuitarCardDetails
            currentGuitar={mockGuitars[0]}
            resetCurrentGuitar ={mockResetCurrentGuitar}
            onMount = {mockOnMount}
            getComments={mockGetComments}
            addComment={mockAddComment}
            isResponseReceived ={false}
            resetIsResponseReceived={mockResetIsResponseReceived}
            error={ErrorMsg.NotFound}
            cartItems={[]}
            setCartItems={jest.fn()}
          />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('Should resetCurrentQuest successfully working', () => {
    app.unmount();
    expect(mockResetCurrentGuitar).toHaveBeenCalledTimes(1);
  });

  it('Should getComments successfully working', () => {
    expect(mockGetComments).toHaveBeenCalledTimes(1);
    expect(mockGetComments).toHaveBeenCalledWith(mockGuitars[0]);
  });

  it('Should onMount successfully working', () => {
    expect(mockOnMount).toHaveBeenCalledTimes(1);
    expect(mockOnMount).toHaveBeenCalledWith(1);
  });
  it('Use navigate executed', () => {
    expect(mockedNavigator).toHaveBeenCalledTimes(1);
    expect(mockedNavigator).toHaveBeenCalledWith('/not-found');
  });
});
