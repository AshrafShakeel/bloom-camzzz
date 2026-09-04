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

/* ---- Camera details modal: gallery + description/specs ---- */
const cameraDetails = {
  'samsung-s860': {
    name: 'Samsung S860',
    meta: '8.1MP · Y2K silver body · charm included',
    description: 'A classic compact digicam for that nostalgic Y2K look ✨ Perfect for everyday snapshots, flash photos & capturing memories with a vintage feel.',
    images: [
      'images/samsung-s860-crop.jpg',
      'images/samsung-s860-crop2.jpg',
      'images/samsung-s860-crop3.jpg',
      'images/samsung-s860-crop4.jpg'
    ],
    specs: [
      '8.1MP CCD Sensor',
      '3× Optical Zoom',
      '5× Digital Zoom',
      '2.4” LCD Display',
      'Digital Image Stabilization (DIS)',
      'Face Detection',
      'Macro / Close-up Mode',
      'Built-in Flash',
      'Self-Timer',
      'ISO 80–1000',
      'Multiple Scene Modes'
    ]
  },
  'fujifilm-xp10': {
    name: 'Fujifilm FinePix XP10',
    meta: '12MP · rugged waterproof · champagne shell',
    description: 'A perfect little digicam for capturing that dreamy vintage & Y2K aesthetic ✨ Fully checked and ready to capture your memories. Perfect for everyday snaps, travel, outings, parties & that nostalgic digicam look.',
    images: [
      'images/fujifilm-xp10-crop.jpg',
      'images/fujifilm-xp10-crop2.jpg',
      'images/fujifilm-xp10-crop3.jpg',
      'images/fujifilm-xp10-crop4.jpg'
    ],
    specs: [
      '12MP CCD Sensor',
      '5× Optical Zoom',
      '36–180mm Equivalent Lens',
      '2.7” LCD Display',
      'Digital Image Stabilization',
      'Face Detection + Macro Mode',
      'ISO 100–1600',
      'Built-in Flash',
      'Self-Timer',
      'Video: HD 720p @ 30fps',
      'Storage: SD / SDHC',
      'Battery: Rechargeable Li-ion',
      'Condition: 8/10 — Pre-loved with normal signs of use'
    ]
  },
  'benq-c1020': {
    name: 'BenQ DC C1020',
    meta: '10.1MP · classic Y2K compact · charm included',
    description: 'A fun little compact digicam with a classic Y2K/vintage digital-camera feel ✨ Perfect for everyday snaps, flash photography, parties, outings and capturing nostalgic memories.',
    images: [
      'images/benq-c1020-crop.jpg',
      'images/benq-c1020-crop2.jpg',
      'images/benq-c1020-crop3.jpg',
      'images/benq-c1020-crop4.jpg'
    ],
    specs: [
      '10.1MP CCD Sensor',
      '3× Optical Zoom',
      '2.5” LCD Display',
      'Digital Image Stabilization',
      'Face Detection',
      'Smile Detection',
      'Blink Detection',
      'Built-in Flash',
      'Self-Timer',
      'Macro Mode',
      'Video: Recording with sound',
      'Storage: SD / SDHC',
      'Battery: 2× AA batteries',
      'Condition: 9/10 — Pre-loved with normal signs of use'
    ]
  }
};

const detailModal = document.getElementById('detailModal');
const detailMainImg = document.getElementById('detailMainImg');
const detailThumbs = document.getElementById('detailThumbs');
const detailModalTitle = document.getElementById('detailModalTitle');
const detailModalMeta = document.getElementById('detailModalMeta');
const detailModalDescription = document.getElementById('detailModalDescription');
const detailModalSpecs = document.getElementById('detailModalSpecs');
const detailSpecWrap = document.getElementById('detailSpecWrap');
const detailPrev = document.getElementById('detailPrev');
const detailNext = document.getElementById('detailNext');
const detailBuyBtn = document.getElementById('detailBuyBtn');

let activeDetail = null;
let activeDetailImageIndex = 0;

function renderDetailImage() {
  if (!activeDetail || !activeDetail.images.length) return;

  const src = activeDetail.images[activeDetailImageIndex];
  detailMainImg.src = src;
  detailMainImg.alt = `${activeDetail.name} photo ${activeDetailImageIndex + 1}`;

  detailThumbs.querySelectorAll('.detail-modal__thumb').forEach((thumb, index) => {
    thumb.classList.toggle('is-active', index === activeDetailImageIndex);
  });
}

function openDetailModal(detailKey) {
  const detail = cameraDetails[detailKey];
  if (!detail || !detailModal) return;

  activeDetail = detail;
  activeDetailImageIndex = 0;

  detailModalTitle.textContent = detail.name;
  detailModalMeta.textContent = detail.meta || '';
  detailModalDescription.textContent = detail.description || '';

  detailModalSpecs.innerHTML = '';
  (detail.specs || []).forEach((spec) => {
    const li = document.createElement('li');
    li.textContent = spec;
    detailModalSpecs.appendChild(li);
  });
  detailSpecWrap.hidden = !(detail.specs && detail.specs.length);

  detailThumbs.innerHTML = '';
  detail.images.forEach((src, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'detail-modal__thumb';
    btn.setAttribute('aria-label', `View ${detail.name} photo ${index + 1}`);

    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    btn.appendChild(img);

    btn.addEventListener('click', () => {
      activeDetailImageIndex = index;
      renderDetailImage();
    });

    detailThumbs.appendChild(btn);
  });

  const hasMultipleImages = detail.images.length > 1;
  detailPrev.hidden = !hasMultipleImages;
  detailNext.hidden = !hasMultipleImages;
  detailThumbs.hidden = !hasMultipleImages;

  renderDetailImage();
  detailModal.classList.add('is-open');
  detailModal.setAttribute('aria-hidden', 'false');
}

function closeDetailModal() {
  if (!detailModal) return;
  detailModal.classList.remove('is-open');
  detailModal.setAttribute('aria-hidden', 'true');
}

if (detailModal) {
  document.querySelectorAll('[data-details]').forEach((btn) => {
    btn.addEventListener('click', () => openDetailModal(btn.dataset.details));
  });

  detailModal.querySelectorAll('[data-detail-close]').forEach((el) => {
    el.addEventListener('click', closeDetailModal);
  });

  detailPrev.addEventListener('click', () => {
    if (!activeDetail) return;
    activeDetailImageIndex = (activeDetailImageIndex - 1 + activeDetail.images.length) % activeDetail.images.length;
    renderDetailImage();
  });

  detailNext.addEventListener('click', () => {
    if (!activeDetail) return;
    activeDetailImageIndex = (activeDetailImageIndex + 1) % activeDetail.images.length;
    renderDetailImage();
  });

  detailBuyBtn.addEventListener('click', () => {
    if (!activeDetail) return;
    const cameraName = activeDetail.name;
    const imageSrc = activeDetail.images[activeDetailImageIndex] || activeDetail.images[0];
    closeDetailModal();
    openBuyModal(cameraName, imageSrc);
  });

  document.addEventListener('keydown', (e) => {
    if (!detailModal.classList.contains('is-open')) return;

    if (e.key === 'Escape') closeDetailModal();
    if (e.key === 'ArrowLeft' && activeDetail?.images.length > 1) detailPrev.click();
    if (e.key === 'ArrowRight' && activeDetail?.images.length > 1) detailNext.click();
  });
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
