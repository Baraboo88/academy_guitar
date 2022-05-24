import {useCallback, useEffect, useState} from 'react';

export const useActiveElement = () => {
  const [active, setActive] = useState(document.activeElement);


  const handleFocusIn =  useCallback((e) => {
    setActive(document.activeElement);
  },[setActive]);

  useEffect(() => {
    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [handleFocusIn]);

  return active;
};
