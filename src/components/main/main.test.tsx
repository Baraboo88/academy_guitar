import * as Enzyme from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {getTestStore, mockGuitars} from '../../utils/test-utils';
import {BrowserRouter} from 'react-router-dom';
import toJson from 'enzyme-to-json';
import {Main} from './main';
import {SortDirection, SortType} from '../../utils/utils';

Enzyme.configure({adapter: new EnzymeReactAdapter()});


it('Main successfully rendered', () => {

  const mockGetCommentsCount = jest.fn();

  const MOCK_ERROR = '';


  const tree = mount(
    <Provider store={getTestStore()}>
      <BrowserRouter>
        <Main
          guitarsWithoutSort = {mockGuitars}
          guitars = {mockGuitars}
          getCommentsCount = {mockGetCommentsCount}
          isResponseReceived ={false}
          errorMsg={MOCK_ERROR}
          sortDirection = {SortDirection.None}
          sortType={SortType.Price}
          setSortType={jest.fn()}
          setSortDirection={jest.fn()}
        />
      </BrowserRouter>
    </Provider>,
  );
  expect(toJson(tree, {mode: 'deep'})).toMatchSnapshot();
});
