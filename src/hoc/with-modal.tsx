import React, { useCallback, useEffect} from 'react';
import {GuitarModel} from '../types/guitar-model';
import disableScroll from 'disable-scroll';

interface WithModalProps{
    closeModalHandler: () => void;
    guitar?: GuitarModel;
  userName?: string;
  setUserNameHandler?: (name: string) => void;
  advantage?: string;
  setAdvantageHandler?: (adv: string) => void;
  disadvantage?:string;
  setDisadvantageHandler?: (disadv: string) => void;
  comment?: string;
  setCommentHandler?: (comment: string) => void;
  rating?: number;
  setRatingHandler?: (rating: number) => void;
  onSubmitHandler?: () => void;
}

const ESC_KEY = 'Escape';

// eslint-disable-next-line react/display-name
const withModal = (Component: React.ElementType) => (props: WithModalProps) => {
  const {closeModalHandler} = props;


  const escFunction = useCallback((event) => {
    if (event.key === ESC_KEY) {
      closeModalHandler();
    }
  }, [closeModalHandler]);


  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    disableScroll.on();
    return () => {
      document.removeEventListener('keydown', escFunction, false);
      disableScroll.off();
    };
  }, [escFunction]);

  return <Component {...props}/>;
};
export default withModal;
