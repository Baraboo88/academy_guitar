import * as Enzyme from 'enzyme';

import { mount } from 'enzyme';
import EnzymeReactAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from './app';

import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import {getTestStore} from '../../utils/test-utils';

Enzyme.configure({ adapter: new EnzymeReactAdapter() });

it('App successfully rendered', () => {
  const tree = mount(<Provider store={getTestStore()}><App /></Provider>);
  expect(toJson(tree, { mode: 'deep' })).toMatchSnapshot();
});
