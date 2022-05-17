import * as renderer from 'react-test-renderer';
import * as React from 'react';


import Header from './header';
import {BrowserRouter} from 'react-router-dom';

it('Header successfully rendered', () => {
  const tree = renderer.create(<BrowserRouter><Header/></BrowserRouter>);
  expect(tree).toMatchSnapshot();
});
