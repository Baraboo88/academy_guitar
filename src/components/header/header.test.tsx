import * as renderer from 'react-test-renderer';
import * as React from 'react';


import Header from './header';

it('Header successfully rendered', () => {
  const tree = renderer.create(<Header/>);
  expect(tree).toMatchSnapshot();
});
