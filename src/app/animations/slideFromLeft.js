import { useEffect } from 'react';

const slideFromLeft = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slideLeft');
        } else {
          entry.target.classList.remove('slideLeft');
        }
      });
    });
    const hiddenElements = document.querySelectorAll('.slideLeftNone');
    hiddenElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      hiddenElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);
};

export default slideFromLeft;