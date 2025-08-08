import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const header = document.querySelector('header') as HTMLElement;
const aside = document.querySelector('aside') as HTMLElement;
const title = document.querySelector('#title') as HTMLElement;

const tl = gsap.timeline();

let split = SplitText.create(title, {
  type: 'chars',
  charsClass: 'char',
});

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
    .from(split.chars, {
      opacity: 0,
      y: 64,
      stagger: {
        amount: 0.3,
      },
      ease: 'power2.inOut',
    })
    .from('#projects', {
      opacity: 0,
      y: '100%',
      duration: 0.6,
      ease: 'power2.out',
    });
}

function handleAnimations() {
  const hasSeenLoader = sessionStorage.getItem('loaderShown');
  const isMobileViewport = window.innerWidth < 768;
  // For mobile, we only want to show content animation after first load
  if (isMobileViewport) {
    if (!hasSeenLoader) {
      animateContent();
      sessionStorage.setItem('loaderShown', 'true');
    }
    return;
  }
  // For desktop, show both animations
  animateHeaderAside();
  // Only show content animation on first load
  if (!hasSeenLoader) {
    animateContent();
    sessionStorage.setItem('loaderShown', 'true');
  }
}

document.addEventListener('DOMContentLoaded', handleAnimations);

// animateHeaderAside();
// animateContent();
