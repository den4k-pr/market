import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Loading: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline();

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
      tl.to('.loading-page', {
        opacity: 0,
        duration: 1.5,
        display: 'none',
      }).fromTo(
        '.logo-name',
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          delay: 0.5,
        }
      );
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  return(
    <section className='loader'>
      {loading === true ? 
      <nav className='loader-spiner'></nav>
      :
      children
      }
    </section>
  )
};

export default Loading;
