import * as Enzyme from 'enzyme';
import {mount} from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import {Provider} from 'react-redux';
import {getTestStore, mockGuitars} from '../../utils/test-utils';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import {Main} from './main';
import {SortDirection, SortType, SortTypeWithDirection} from '../../utils/utils';

Enzyme.configure({adapter: new EnzymeReactAdapter()});


describe('GuitarCardDetails e2e', () => {

  const mockGetCommentsCount = jest.fn();
  const mockSortDirection = jest.fn();
  const mockSetSortType = jest.fn();

  const MOCK_ERROR = '';

  it('Should GetCommentsCount successfully working', () => {
    mount(
      <Provider store={getTestStore()}>
        <BrowserRouter>
          <Main
            guitars={mockGuitars}
            sortDirection = {SortDirection.None}
            sortType={SortType.Price}
            setSortType={mockSetSortType}
            setSortDirection={mockSortDirection}
            getCommentsCount={mockGetCommentsCount}
            isResponseReceived
            errorMsg={MOCK_ERROR}
          />
        </BrowserRouter>
      </Provider>,
    );
    expect(mockGetCommentsCount).toHaveBeenCalledTimes(1);
  });

  it('Should mockSetSortType successfully working', () => {
    mount(
      <Provider store={getTestStore()}>
        <MemoryRouter initialEntries = {[`/?sort=${SortTypeWithDirection.PopularityHighToLow}`]}>
          <Main
            guitars={mockGuitars}
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
    expect(mockSetSortType).toHaveBeenCalledWith(SortType.Popularity);
  });
  it('Should SortDirection successfully working', () => {
    mount(
      <Provider store={getTestStore()}>
        <MemoryRouter initialEntries = {[`/?sort=${SortTypeWithDirection.PriceLowToHigh}`]}>
          <Main
            guitars={mockGuitars}
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
    expect(mockSortDirection).toHaveBeenCalledWith(SortDirection.LowToHigh);
  });
});
