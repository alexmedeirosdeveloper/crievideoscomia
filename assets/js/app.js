'use strict';
(() => {
  const config = window.LANDING_CONFIG || {};
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const behavior = () => reducedMotion.matches ? 'instant' : 'smooth';

  // Horizontal galleries work with native touch scrolling, keyboard and arrows.
  document.querySelectorAll('[data-rail]').forEach(button => {
    button.addEventListener('click', () => {
      const rail = document.getElementById(button.dataset.rail);
      if (rail) rail.scrollBy({left: Number(button.dataset.direction) * Math.max(240, rail.clientWidth * .8), behavior: behavior()});
    });
  });
  document.querySelectorAll('.media-rail').forEach(rail => {
    rail.addEventListener('keydown', event => {
      if (event.target !== rail || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      rail.scrollBy({left: event.key === 'ArrowRight' ? 260 : -260, behavior: behavior()});
    });
  });

  // Native modal dialogs provide Escape, focus containment and restoration.
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelectorAll('.dialog-close, [data-close-dialog]').forEach(button => button.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
  });
  const lightbox = document.getElementById('image-dialog');
  document.querySelectorAll('[data-lightbox]').forEach(button => {
    button.addEventListener('click', () => {
      lightbox.querySelector('img').src = button.dataset.lightbox;
      lightbox.showModal();
    });
  });

  // Demos are local and requested only when the visitor presses play.
  const demos = [...document.querySelectorAll('.demo-frame video')];
  demos.forEach(video => video.addEventListener('play', () => demos.forEach(other => {if (other !== video) other.pause();})));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {if (!entry.isIntersecting) entry.target.pause();}), {threshold: .05});
    demos.forEach(video => observer.observe(video));
  }

  // Original presentation streamed on demand using native HLS or Hls.js.
  const playButton = document.getElementById('load-player');
  playButton?.addEventListener('click', () => {
    demos.forEach(video => video.pause());
    const host = document.getElementById('hero-player');
    const status = document.getElementById('player-status');
    const video = document.createElement('video');

    video.poster = 'assets/img/hero-cover.jpg';
    video.controls = true;
    video.playsInline = true;
    video.setAttribute('aria-label', 'Apresentação original da IA Academy');
    host.replaceChildren(video);
    host.classList.add('player-active');
    const fail = () => {
      status.textContent = 'Não foi possível carregar o vídeo. Tente novamente.';
      host.replaceChildren(playButton);
      host.classList.remove('player-active');
    };
    let hls;
    video.addEventListener('error', () => {if(hls) hls.destroy(); fail();}, {once: true});
    video.addEventListener('playing', () => {status.textContent = '';});
    const url = 'https://cdn.converteai.net/4c00b079-2ae9-46b7-b111-a0b4e06e709e/6a8650d840801af9c22c9c33/main.m3u8';
    const start = () => video.play().catch(() => {status.textContent = 'Toque no botão de reprodução para assistir.';});
    if (video.canPlayType('application/vnd.apple.mpegurl')) {video.src = url;start();}
    else if (window.Hls && Hls.isSupported()) {
      hls = new Hls(); hls.loadSource(url); hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, start);
      hls.on(Hls.Events.ERROR, (_, data) => {if (data.fatal) {hls.destroy();fail();}});
    } else {fail();}
  });

  document.querySelectorAll('[data-checkout]').forEach(button => {
    button.addEventListener('click', () => {
      let destination;
      try {destination = new URL(config.affiliateUrl);} catch {destination = null;}
      if (!destination || destination.protocol !== 'https:') {
        document.getElementById('checkout-dialog').showModal();
        return;
      }
      // Preserve the affiliate URL exactly; no unrequested parameter rewriting.
      window.location.assign(destination.href);
    });
  });

  // Mobile offer link appears only after the opening and hides over the offer itself.
  const mobileBar = document.getElementById('mobile-offer');
  const hero = document.getElementById('inicio');
  const offer = document.getElementById('oferta');
  let scheduled = false;
  const updateMobileBar = () => {
    const offerRect = offer.getBoundingClientRect();
    mobileBar.hidden = window.innerWidth >= 992 || hero.getBoundingClientRect().bottom > 90 || (offerRect.top < window.innerHeight && offerRect.bottom > 0);
    scheduled = false;
  };
  const schedule = () => {if (!scheduled) {scheduled = true; requestAnimationFrame(updateMobileBar);}};
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule, {passive: true});
  updateMobileBar();
})();
