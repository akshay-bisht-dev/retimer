import { useEffect, useState } from 'react';
import { MQ } from '../animations/motionPreferences.js';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia(MQ.reduce).matches);
  useEffect(() => {
    const mq = window.matchMedia(MQ.reduce);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}
