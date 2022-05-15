
import * as Enzyme from 'enzyme';

import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';

import {getTestStore, mockGuitars} from '../../utils/test-utils';
import {ActiveTab, GuitarCardDetails} from './guitar-card-details';
import { BrowserRouter } from 'react-router-dom';


Enzyme.configure({adapter: new EnzymeReactAdapter()});


it('GuitarCardDetails successfully rendered', () => {
  const mockResetCurrentGuitar = jest.fn();
  const mockOnMount = jest.fn();
  const mockGetComments = jest.fn();
  const mockAddComment = jest.fn();
  const mockResetIsResponseReceived = jest.fn();
  const MOCK_ERROR = '';

  const mockHistory = { push: jest.fn() };
  const routeComponentPropsMock = {
    history: mockHistory as any,
    location: {} as any,
    match: {
      params: {
        id: '1',
        cat: ActiveTab.Characteristics,
      },
    } as any,
  };

  const tree = mount(
    <Provider store={getTestStore()}>
      <BrowserRouter>
        <GuitarCardDetails
          {...routeComponentPropsMock}
          currentGuitar={mockGuitars[0]}
          resetCurrentGuitar ={mockResetCurrentGuitar}
          onMount = {mockOnMount}
          getComments={mockGetComments}
          addComment={mockAddComment}
          isResponseReceived ={false}
          resetIsResponseReceived={mockResetIsResponseReceived}
          error={MOCK_ERROR}
        />
      </BrowserRouter>
    </Provider>,
  );
  expect(toJson(tree, {mode: 'deep'})).toMatchSnapshot();
});
