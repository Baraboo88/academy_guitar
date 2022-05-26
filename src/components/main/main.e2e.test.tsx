import * as Enzyme from 'enzyme';
import {mount} from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import {Provider} from 'react-redux';
import {getTestStore, mockGuitars} from '../../utils/test-utils';
import {BrowserRouter} from 'react-router-dom';
import {Main} from './main';
import {SortDirection, SortType} from "../../utils/utils";

Enzyme.configure({adapter: new EnzymeReactAdapter()});


describe('GuitarCardDetails e2e', () => {

  const mockOnMount = jest.fn();
  const mockGetCommentsCount = jest.fn();

  const MOCK_ERROR = '';

  //TODO
  it('Should onMount successfully working', () => {
    mount(
      <Provider store={getTestStore()}>
        <BrowserRouter>
          <Main
            guitars={[]}
            onMount={mockOnMount}
            sortDirection = {SortDirection.None}
            sortType={SortType.Price}
            setSortType={jest.fn()}
            setSortDirection={jest.fn()}
            getCommentsCount={mockGetCommentsCount}
            isResponseReceived={false}
            errorMsg={MOCK_ERROR}
          />
        </BrowserRouter>
      </Provider>,
    );
    expect(mockOnMount).toHaveBeenCalledTimes(1);
  });

  it('Should GetCommentsCount successfully working', () => {
    mount(
      <Provider store={getTestStore()}>
        <BrowserRouter>
          <Main
            guitars={mockGuitars}
            onMount={mockOnMount}
            sortDirection = {SortDirection.None}
            sortType={SortType.Price}
            setSortType={jest.fn()}
            setSortDirection={jest.fn()}
            getCommentsCount={mockGetCommentsCount}
            isResponseReceived={false}
            errorMsg={MOCK_ERROR}
          />
        </BrowserRouter>
      </Provider>,
    );
    expect(mockGetCommentsCount).toHaveBeenCalledTimes(1);
  });

});
