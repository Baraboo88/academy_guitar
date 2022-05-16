import {useEffect, useState} from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function useOnScreen(ref) {

  const [isIntersecting, setIntersecting] = useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
    );
    if(ref && ref.current){
      observer.observe(ref.current);
    }
    return () => { observer.disconnect(); };
  }, [ref]);

  return isIntersecting;
}
