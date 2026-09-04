// ============================================
// Bloom Camz — interactions
// ============================================

/* ---- The Wall: dynamic hanging gallery ----
   EDIT THIS ARRAY to change what's on the wall — add, remove, or
   swap any entry. Each item just needs a src (image path or URL)
   and an alt/caption. Nothing else in the code needs to change. */
const wallPhotos = [
  { src: 'https://picsum.photos/seed/bloomcamz1/300/380', caption: 'Sunday find' },
  { src: 'https://picsum.photos/seed/bloomcamz2/300/380', caption: 'Charm detail' },
  { src: 'https://picsum.photos/seed/bloomcamz3/300/380', caption: 'Fresh in' },
  { src: 'https://picsum.photos/seed/bloomcamz4/300/380', caption: 'Test shot' },
  { src: 'https://picsum.photos/seed/bloomcamz5/300/380', caption: 'Packed up' },
  { src: 'https://picsum.photos/seed/bloomcamz6/300/380', caption: 'On the shelf' },

  { src: 'https://picsum.photos/seed/bloomcamz7/300/380', caption: 'New arrival' },
  { src: 'https://picsum.photos/seed/bloomcamz8/300/380', caption: 'Daily pick' },
  { src: 'https://picsum.photos/seed/bloomcamz9/300/380', caption: 'Little detail' },
  { src: 'https://picsum.photos/seed/bloomcamz10/300/380', caption: 'Captured moment' },
  { src: 'https://picsum.photos/seed/bloomcamz11/300/380', caption: 'Shelf story' },
  { src: 'https://picsum.photos/seed/bloomcamz12/300/380', caption: 'Today’s favorite' },
  { src: 'https://picsum.photos/seed/bloomcamz13/300/380', caption: 'Just found' },
  { src: 'https://picsum.photos/seed/bloomcamz14/300/380', caption: 'New piece' },
  { src: 'https://picsum.photos/seed/bloomcamz15/300/380', caption: 'Packed with care' },
  { src: 'https://picsum.photos/seed/bloomcamz16/300/380', caption: 'Behind the scenes' },
  { src: 'https://picsum.photos/seed/bloomcamz17/300/380', caption: 'Small moments' },
  { src: 'https://picsum.photos/seed/bloomcamz18/300/380', caption: 'Fresh capture' },
  { src: 'https://picsum.photos/seed/bloomcamz19/300/380', caption: 'Weekend mood' },
  { src: 'https://picsum.photos/seed/bloomcamz20/300/380', caption: 'Camera roll' },
  { src: 'https://picsum.photos/seed/bloomcamz21/300/380', caption: 'Found today' },
  { src: 'https://picsum.photos/seed/bloomcamz22/300/380', caption: 'A closer look' },
  { src: 'https://picsum.photos/seed/bloomcamz23/300/380', caption: 'From the shelf' },
  { src: 'https://picsum.photos/seed/bloomcamz24/300/380', caption: 'Just in' },
  { src: 'https://picsum.photos/seed/bloomcamz25/300/380', caption: 'Bloom moment' },
  { src: 'https://picsum.photos/seed/bloomcamz26/300/380', caption: 'Latest find' }
];

const wallItemsEl = document.getElementById('wallItems');

if (wallItemsEl) {
  // A fixed pattern of tilts/string-lengths so the wall looks hand-hung
  // but stays the same on every reload (nicer than fully random jitter).
  const pattern = [
    { tilt: -4, string: 26 },
    { tilt: 3,  string: 46 },
    { tilt: -2, string: 18 },
    { tilt: 5,  string: 36 },
    { tilt: -5, string: 24 },
    { tilt: 2,  string: 40 },
  ];

  wallPhotos.forEach((photo, i) => {
    const p = pattern[i % pattern.length];

    const item = document.createElement('div');
    item.className = 'wall__item';

    const string = document.createElement('div');
    string.className = 'wall__string';
    string.style.height = `${p.string}px`;

    const clip = document.createElement('div');
    clip.className = 'wall__clip';

    const photoBox = document.createElement('div');
    photoBox.className = 'wall__photo';
    photoBox.style.transform = `rotate(${p.tilt}deg)`;

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.caption || 'Camera from the Bloom Camz wall';
    img.loading = 'lazy';

    photoBox.appendChild(img);
    item.appendChild(string);
    item.appendChild(clip);
    item.appendChild(photoBox);

    if (photo.caption) {
      const caption = document.createElement('p');
      caption.className = 'wall__caption';
      caption.textContent = photo.caption;
      item.appendChild(caption);
    }

    wallItemsEl.appendChild(item);
  });
}

/* ---- Wall: click-and-drag horizontal scroll (no arrows — just drag or swipe) ---- */
const wallScroll = document.getElementById('wallScroll');

if (wallScroll) {
  let isDown = false;
  let startX = 0;
  let startScroll = 0;
  let moved = false;

  const startDrag = (clientX) => {
    isDown = true;
    moved = false;
    startX = clientX;
    startScroll = wallScroll.scrollLeft;
    wallScroll.classList.add('is-dragging');
  };
  const duringDrag = (clientX) => {
    if (!isDown) return;
    const delta = clientX - startX;
    if (Math.abs(delta) > 4) moved = true;
    wallScroll.scrollLeft = startScroll - delta;
  };
  const endDrag = () => {
    isDown = false;
    wallScroll.classList.remove('is-dragging');
  };

  wallScroll.addEventListener('mousedown', (e) => {
    startDrag(e.clientX);
    e.preventDefault();
  });
  window.addEventListener('mousemove', (e) => duringDrag(e.clientX));
  window.addEventListener('mouseup', endDrag);

  // Prevent link/image click firing right after a real drag
  wallScroll.addEventListener('click', (e) => {
    if (moved) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  // Trackpads/mice with horizontal wheel already scroll natively;
  // this lets a plain vertical wheel over the wall also move it sideways.
  wallScroll.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      wallScroll.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });
}

/* ---- Buy modal: choose WhatsApp or Instagram ---- */
const WHATSAPP_NUMBER = '923094440016'; // +92 309 4440016, no leading zero/plus
const INSTAGRAM_URL = 'https://www.instagram.com/bloomcamzzz/';

const buyModal = document.getElementById('buyModal');
const buyModalImg = document.getElementById('buyModalImg');
const buyModalCamera = document.getElementById('buyModalCamera');
const buyWhatsappBtn = document.getElementById('buyWhatsapp');
const buyInstagramLink = document.getElementById('buyInstagram');

let currentCameraName = '';

function openBuyModal(cameraName, imageSrc) {
  currentCameraName = cameraName;
  buyModalCamera.textContent = cameraName;
  buyModalImg.src = imageSrc;
  buyModalImg.alt = cameraName;
  buyModal.classList.add('is-open');
  buyModal.setAttribute('aria-hidden', 'false');
}

function closeBuyModal() {
  buyModal.classList.remove('is-open');
  buyModal.setAttribute('aria-hidden', 'true');
}

if (buyModal) {
  document.querySelectorAll('[data-buy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openBuyModal(btn.dataset.camera, btn.dataset.image);
    });
  });

  buyModal.querySelectorAll('[data-close]').forEach((el) => {
    el.addEventListener('click', closeBuyModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBuyModal();
  });

  buyWhatsappBtn.addEventListener('click', () => {
    const message = `Hi Bloom Camz! I'd like to buy the ${currentCameraName} 📷`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  });

  // Instagram just opens the profile — no per-message prefill is possible
  // through a plain link, so the person DMs however they like.
  buyInstagramLink.href = INSTAGRAM_URL;
}

/* ---- Hero: mouse-driven 3D tilt on the floating camera ---- */
const heroStage = document.getElementById('heroStage');
const heroCharm = document.getElementById('heroCharm');

if (heroStage && heroCharm && window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    const rect = heroStage.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // distance from viewport center, normalized
    const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

    const rotateY = dx * 16;   // left/right tilt
    const rotateX = -dy * 10;  // up/down tilt

    heroCharm.style.animation = 'none';
    heroCharm.style.transform = `rotateX(${8 + rotateX}deg) rotateY(${-10 + rotateY}deg)`;
  });

  document.addEventListener('mouseleave', () => {
    heroCharm.style.animation = 'float 6s ease-in-out infinite';
  });
}

/* ---- Product cards: 3D tilt that follows the cursor ---- */
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach((card) => {
  const maxTilt = 9;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0 -> 1
    const py = (e.clientY - rect.top) / rect.height;    // 0 -> 1

    const rotateY = (px - 0.5) * maxTilt * 2;
    const rotateX = -(py - 0.5) * maxTilt * 2;

    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});

/* ---- Scroll reveal ---- */
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

/* ---- Mobile nav toggle (simple show/hide of the links list) ---- */
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('nav__links--open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav__links--open');
    });
  });
}

/* ---- Nav background strengthens after scrolling past hero ---- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.boxShadow = '0 4px 20px rgba(43,38,34,.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
});
