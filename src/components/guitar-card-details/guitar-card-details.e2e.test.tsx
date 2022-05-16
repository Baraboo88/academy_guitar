import {mount, ReactWrapper} from 'enzyme';
import {Provider} from 'react-redux';
import {getTestStore,  mockGuitars} from '../../utils/test-utils';
import {ActiveTab, GuitarCardDetails} from './guitar-card-details';
import {BrowserRouter} from 'react-router-dom';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as Enzyme from 'enzyme';

Enzyme.configure({adapter: new EnzymeReactAdapter()});


describe('GuitarCardDetails e2e', () => {

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

  let app: ReactWrapper;

  beforeEach(() => {
    app = mount(
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
});
