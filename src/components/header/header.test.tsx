import * as renderer from 'react-test-renderer';
import * as React from 'react';


import Header from './header';
import {BrowserRouter} from 'react-router-dom';
import {getTestStore} from '../../utils/test-utils';
import {Provider} from 'react-redux';

it('Header successfully rendered', () => {
  const tree = renderer.create(<Provider store={getTestStore()}><BrowserRouter><Header/></BrowserRouter></Provider>);
  expect(tree).toMatchSnapshot();
});
