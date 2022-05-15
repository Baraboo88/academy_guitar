import * as renderer from 'react-test-renderer';
import * as React from 'react';


import Footer from './footer';

it('Footer successfully rendered', () => {
  const tree = renderer.create(<Footer/>);
  expect(tree).toMatchSnapshot();
});
