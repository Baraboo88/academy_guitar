
import * as Enzyme from 'enzyme';

import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';

import {getTestStore, mockCartItems, mockGuitars} from '../../utils/test-utils';
import { GuitarCardDetails} from './guitar-card-details';

import 'intersection-observer';

import { BrowserRouter } from 'react-router-dom';

Enzyme.configure({adapter: new EnzymeReactAdapter()});


it('GuitarCardDetails successfully rendered', () => {
  const mockResetCurrentGuitar = jest.fn();
  const mockOnMount = jest.fn();
  const mockGetComments = jest.fn();
  const mockAddComment = jest.fn();
  const mockResetIsResponseReceived = jest.fn();
  const mockSetCartItems = jest.fn();
  const MOCK_ERROR = '';

  const tree = mount(
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
          error={MOCK_ERROR}
          cartItems={mockCartItems}
          setCartItems={mockSetCartItems}
        />
      </BrowserRouter>
    </Provider>,
  );
  expect(toJson(tree, {mode: 'deep'})).toMatchSnapshot();
});
