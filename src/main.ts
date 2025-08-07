import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const header = document.querySelector('header') as HTMLElement;
const aside = document.querySelector('aside') as HTMLElement;

const tl = gsap.timeline();

function animateHeaderAside() {
  tl.fromTo(
    header,
    { x: '-100%', opacity: 0, duration: 0.5, ease: 'power2.inOut' },
    { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.inOut' },
    'headerAside'
  ).fromTo(
    aside,
    { x: '100%', opacity: 0, duration: 0.5, ease: 'power2.inOut' },
    { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.inOut' },
    'headerAside'
  );
}

function animateContent() {
  tl.from('#intro', { opacity: 0, y: -50, duration: 0.6, ease: 'bounce.out' })
    .from('#skills', { opacity: 0, y: -50, duration: 0.6, ease: 'bounce.out' })
    .from('#projects', {
      opacity: 0,
      y: '100%',
      duration: 0.6,
      ease: 'power2.out',
    });
}

document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('loaderShown') && header && aside) {
    animateHeaderAside();
  } else {
    animateHeaderAside();
    animateContent();
    sessionStorage.setItem('loaderShown', 'true');
  }
});
