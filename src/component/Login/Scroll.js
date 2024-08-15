import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make ScrollTrigger available to GSAP
gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerComponent = () => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    // Check if element exists
    if (!element) return;

    // GSAP Animation
    gsap.to(element, {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%', // start the animation when 80% of the element is in view
        end: 'bottom 20%', // end the animation when 20% of the element is in view
        toggleActions: 'play none none reverse', // play the animation when scrolling down, reverse when scrolling up
        markers: true // Optional: Show markers for debug
      }
    });
  }, []);

  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(50px)' }}>
      {/* Content here */}
      <h1>ScrollTrigger Demo</h1>
      <p>This element will animate when it comes into view.</p>
    </div>
  );
};

export default ScrollTriggerComponent;
