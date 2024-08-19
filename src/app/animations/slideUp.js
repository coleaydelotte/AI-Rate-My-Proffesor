import { useEffect } from 'react';

const slideUp = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slideUp');
        } else {
          entry.target.classList.remove('slideUp');
        }
      });
    });
    const hiddenElements = document.querySelectorAll('.slideUpNone');
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

export default slideUp;