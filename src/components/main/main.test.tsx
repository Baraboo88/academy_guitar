import * as Enzyme from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {getTestStore, mockGuitars} from '../../utils/test-utils';
import {BrowserRouter} from 'react-router-dom';
import toJson from 'enzyme-to-json';
import {Main} from './main';

Enzyme.configure({adapter: new EnzymeReactAdapter()});


it('Main successfully rendered', () => {

  const mockOnMount = jest.fn();
  const mockGetCommentsCount = jest.fn();

  const MOCK_ERROR = '';


  const tree = mount(
    <Provider store={getTestStore()}>
      <BrowserRouter>
        <Main
          guitars = {mockGuitars}
          onMount={mockOnMount}
          getCommentsCount = {mockGetCommentsCount}
          isResponseReceived ={false}
          errorMsg={MOCK_ERROR}
        />
      </BrowserRouter>
    </Provider>,
  );
  expect(toJson(tree, {mode: 'deep'})).toMatchSnapshot();
});
