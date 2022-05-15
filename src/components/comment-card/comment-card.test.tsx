import * as renderer from 'react-test-renderer';
import * as React from 'react';


import CommentCard from './comment-card';
import {mockComment} from '../../utils/test-utils';

it('CommentCard successfully rendered', () => {
  const tree = renderer.create(<CommentCard comment={mockComment}/>);
  expect(tree).toMatchSnapshot();
});
