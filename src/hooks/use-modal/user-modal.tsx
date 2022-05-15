import {useCallback, useEffect} from 'react';
import disableScroll from 'disable-scroll';

const ESC_KEY = 'Escape';


export const useModal =  ( closeModalHandler: () => void) => {


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
};
