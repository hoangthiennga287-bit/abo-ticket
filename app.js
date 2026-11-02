'use strict';

/* ---------- Header elevation on scroll ---------- */

const topbar = document.getElementById('topbar');
let scrollFrame = 0;

function syncScrollState() {
  if (topbar) topbar.classList.toggle('is-scrolled', window.scrollY > 4);
  scrollFrame = 0;
}

window.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(syncScrollState);
}, { passive: true });

syncScrollState();

/* ---------- Minimal interactions (no invented screens) ---------- */

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    if (tab.classList.contains('is-active') || typeof tab.animate !== 'function') return;
    tab.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(.94)' }, { transform: 'scale(1)' }],
      { duration: 170, easing: 'ease-out' }
    );
  });
});
