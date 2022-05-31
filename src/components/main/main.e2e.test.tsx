import * as Enzyme from 'enzyme';
import {mount} from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import {Provider} from 'react-redux';
import {getTestStore, mockGuitars} from '../../utils/test-utils';
import { MemoryRouter} from 'react-router-dom';
import {Main} from './main';
import {SortDirection, SortType, SortTypeWithDirection} from '../../utils/utils';

Enzyme.configure({adapter: new EnzymeReactAdapter()});


describe('GuitarCardDetails e2e', () => {

  const mockOnMount = jest.fn();
  const mockGetCommentsCount = jest.fn();
  const mockSortDirection = jest.fn();
  const mockSetSortType = jest.fn();

  const MOCK_ERROR = '';

  it('Should onMount successfully working', () => {
    mount(
      <Provider store={getTestStore()}>
        <MemoryRouter initialEntries = {[`/?sort${SortTypeWithDirection.PriceHighToLow}`]}>
          <Main
            guitars={[]}
            onMount={mockOnMount}
            sortDirection = {SortDirection.None}
            sortType={SortType.Price}
            setSortType={mockSetSortType}
            setSortDirection={mockSortDirection}
            getCommentsCount={mockGetCommentsCount}
            isResponseReceived={false}
            errorMsg={MOCK_ERROR}
          />
        </MemoryRouter>
      </Provider>,
    );
    expect(mockOnMount).toHaveBeenCalledTimes(1);
  });

  it('Should GetCommentsCount successfully working', () => {
    mount(
      <Provider store={getTestStore()}>
        <MemoryRouter>
          <Main
            guitars={mockGuitars}
            onMount={mockOnMount}
            sortDirection = {SortDirection.None}
            sortType={SortType.Price}
            setSortType={mockSetSortType}
            setSortDirection={mockSortDirection}
            getCommentsCount={mockGetCommentsCount}
            isResponseReceived={false}
            errorMsg={MOCK_ERROR}
          />
        </MemoryRouter>
      </Provider>,
    );
    expect(mockGetCommentsCount).toHaveBeenCalledTimes(1);
  });

  it('Should mockSetSortType successfully working', () => {
    mount(
      <Provider store={getTestStore()}>
        <MemoryRouter initialEntries = {[`/?sort=${SortTypeWithDirection.PriceHighToLow}`]}>
          <Main
            guitars={mockGuitars}
            onMount={mockOnMount}
            sortDirection = {SortDirection.None}
            sortType={SortType.Price}
            setSortType={mockSetSortType}
            setSortDirection={mockSortDirection}
            getCommentsCount={mockGetCommentsCount}
            isResponseReceived={false}
            errorMsg={MOCK_ERROR}
          />
        </MemoryRouter>
      </Provider>,
    );
    expect(mockSetSortType).toHaveBeenCalledTimes(1);
    expect(mockSetSortType).toHaveBeenCalledWith(SortType.Price);
  });
  it('Should SortDirection successfully working', () => {
    mount(
      <Provider store={getTestStore()}>
        <MemoryRouter initialEntries = {[`/?sort=${SortTypeWithDirection.PriceHighToLow}`]}>
          <Main
            guitars={mockGuitars}
            onMount={mockOnMount}
            sortDirection = {SortDirection.None}
            sortType={SortType.Price}
            setSortType={mockSetSortType}
            setSortDirection={mockSortDirection}
            getCommentsCount={mockGetCommentsCount}
            isResponseReceived={false}
            errorMsg={MOCK_ERROR}
          />
        </MemoryRouter>
      </Provider>,
    );
    expect(mockSortDirection).toHaveBeenCalledTimes(1);
    expect(mockSortDirection).toHaveBeenCalledWith(SortDirection.HighToLow);
  });
});
