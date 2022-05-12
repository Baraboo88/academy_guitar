import React from 'react';
import {GuitarCommentModel} from '../../types/guitar-model';
import {getCyrillicRating, monthNames} from '../../utils/utils';
import {renderStars, StarSize} from '../guitar-card/guitar-card';

interface CommentCardProps{
    comment: GuitarCommentModel
}


function CommentCard(props: CommentCardProps) {
  const {comment} = props;

  const date = comment.createAt ? new Date(comment.createAt) : new Date();


  return (
    <div className="review">

      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{comment.userName}</h4>
        <span className="review__date">{`${date.getUTCDate()} ${monthNames[date.getUTCMonth()]}`}</span>
      </div>
      <div className="rate review__rating-panel">
        {renderStars(comment.rating, StarSize.Comments)}
        <p className="visually-hidden">Оценка: {getCyrillicRating(comment.rating)}</p>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{comment.advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{comment.disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment.comment}
      </p>
    </div>
  );
}

export default CommentCard;
