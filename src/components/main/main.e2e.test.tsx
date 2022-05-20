import * as Enzyme from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import {ActiveTab } from '../guitar-card-details/guitar-card-details';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {getTestStore, mockGuitars} from '../../utils/test-utils';
import {BrowserRouter} from 'react-router-dom';
import {Main} from './main';

Enzyme.configure({adapter: new EnzymeReactAdapter()});


describe('GuitarCardDetails e2e', () => {

  const mockOnMount = jest.fn();
  const mockGetCommentsCount = jest.fn();

  const MOCK_ERROR = '';


  it('Should onMount successfully working', () => {
    mount(
      <Provider store={getTestStore()}>
        <BrowserRouter>
          <Main
            guitars={[]}
            onMount={mockOnMount}

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
