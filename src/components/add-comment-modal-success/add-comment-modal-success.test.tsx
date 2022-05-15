import * as renderer from 'react-test-renderer';
import * as React from 'react';


import AddCommentModalSuccess from './add-comment-modal-success';

it('AddCommentModalSuccess successfully rendered', () => {
  const mockCloseHandler = jest.fn();
  const tree = renderer.create(<AddCommentModalSuccess closeModalHandler={mockCloseHandler}/>);
  expect(tree).toMatchSnapshot();
});
