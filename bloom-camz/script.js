// ============================================
// Bloom Camz — interactions + data-driven store
// ============================================

const DATA = window.BLOOM_DATA || { settings: {}, promise: {}, messages: {}, products: [] };
const SETTINGS = DATA.settings || {};
const MESSAGES = DATA.messages || {};
const PRODUCTS = Array.isArray(DATA.products) ? DATA.products : [];

const WHATSAPP_NUMBER = SETTINGS.whatsappNumber || '923094440016';
const INSTAGRAM_URL = SETTINGS.instagramUrl || 'https://www.instagram.com/bloomcamzzz/';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function safeDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isProductLive(product, now = new Date()) {
  if (!product || product.isActive === false) return false;
  const launch = safeDate(product.launchAt);
  return !launch || launch <= now;
}

function isProductUpcoming(product, now = new Date()) {
  if (!product || product.isActive === false) return false;
  const launch = safeDate(product.launchAt);
  return !!launch && launch > now;
}

function getLiveProducts(now = new Date()) {
  return PRODUCTS
    .filter((product) => isProductLive(product, now))
    .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999));
}

function getUpcomingProducts(now = new Date()) {
  return PRODUCTS
    .filter((product) => isProductUpcoming(product, now))
    .sort((a, b) => {
      const dateDiff = safeDate(a.launchAt) - safeDate(b.launchAt);
      return dateDiff || ((a.sortOrder ?? 9999) - (b.sortOrder ?? 9999));
    });
}

function getProductById(id) {
  return PRODUCTS.find((product) => product.id === id) || null;
}

function formatMessage(template, replacements = {}) {
  let text = template || '';
  Object.entries(replacements).forEach(([key, value]) => {
    text = text.replaceAll(`{${key}}`, value ?? '');
  });
  return text;
}

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
}

/* ---- Site-config items from data.js ---- */
const heroImg = document.getElementById('heroImg');
if (heroImg && SETTINGS.heroImage) heroImg.src = SETTINGS.heroImage;

document.querySelectorAll('.brand__mark').forEach((img) => {
  if (SETTINGS.logoImage) img.src = SETTINGS.logoImage;
});

const promiseTitle = document.getElementById('promiseTitle');
const promiseBody = document.getElementById('promiseBody');
const promiseWhatsappText = document.getElementById('promiseWhatsappText');

if (promiseTitle && DATA.promise?.title) promiseTitle.textContent = DATA.promise.title;
if (promiseBody) {
  promiseBody.innerHTML = '';
  (DATA.promise?.paragraphs || []).forEach((text) => {
    const p = document.createElement('p');
    if (/^Heads up:/i.test(text)) {
      const strong = document.createElement('strong');
      strong.textContent = 'Heads up:';
      p.appendChild(strong);
      p.appendChild(document.createTextNode(text.replace(/^Heads up:\s*/i, ' ')));
    } else {
      p.textContent = text;
    }
    promiseBody.appendChild(p);
  });
}
if (promiseWhatsappText && DATA.promise?.whatsappButtonText) {
  promiseWhatsappText.textContent = DATA.promise.whatsappButtonText;
}

/* ---- Loader: camera-shutter reveal on first paint ---- */
const loader = document.getElementById('loader');

if (loader) {
  if (prefersReducedMotion) {
    loader.classList.add('is-done');
  } else {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('is-closing');
        loader.addEventListener('transitionend', () => loader.classList.add('is-done'), { once: true });
      }, 500);
    });
    setTimeout(() => loader.classList.add('is-closing'), 3000);
    setTimeout(() => loader.classList.add('is-done'), 4000);
  }
}

/* ---- Scroll progress bar ---- */
const progressBar = document.getElementById('progressBar');
if (progressBar) {
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${pct}%`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
}

/* ---- Cursor sparkle trail (desktop only) ---- */
if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
  const sparkleChars = ['✨', '·', '✦', '✧'];
  let lastSparkle = 0;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkle < 80) return;
    lastSparkle = now;

    const sparkle = document.createElement('span');
    sparkle.className = 'cursor-sparkle';
    sparkle.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;
    sparkle.style.setProperty('--dx', `${(Math.random() - 0.5) * 30}px`);
    document.body.appendChild(sparkle);

    sparkle.addEventListener('animationend', () => sparkle.remove());
    setTimeout(() => sparkle.remove(), 1000);
  });
}

/* ---- Reusable camera-flash click effect ---- */
function triggerFlash() {
  if (prefersReducedMotion) return;
  const flash = document.createElement('div');
  flash.className = 'flash-overlay';
  document.body.appendChild(flash);
  flash.addEventListener('animationend', () => flash.remove());
  setTimeout(() => flash.remove(), 700);
}

/* ============================================
   Dynamic product collection
============================================ */
const productCards = document.getElementById('productCards');
const polaroidGallery = document.getElementById('polaroidGallery');
const polaroidGalleryRow = document.getElementById('polaroidGalleryRow');

function getRecentLaunch(product, now = new Date()) {
  if (!product.announceOnLaunch) return false;
  const launch = safeDate(product.launchAt);
  if (!launch || launch > now) return false;
  const hours = Number(SETTINGS.newDropAlertHours ?? 168);
  return now - launch <= hours * 60 * 60 * 1000;
}

function createProductCard(product) {
  const article = document.createElement('article');
  article.className = 'card reveal';
  article.dataset.tilt = '';
  article.dataset.productId = product.id;

  const frame = document.createElement('div');
  frame.className = 'card__frame';

  const image = document.createElement('img');
  image.src = product.cardImage || product.images?.[0] || '';
  image.alt = `${product.name} digital camera`;
  image.loading = 'lazy';
  frame.appendChild(image);

  let badgeText = product.badge || '';
  let badgeClass = '';
  if ((product.status || '').toLowerCase() === 'sold') {
    badgeText = 'Sold';
  } else if (!badgeText && getRecentLaunch(product)) {
    badgeText = 'New Drop';
    badgeClass = ' card__tag--new';
  }

  if (badgeText) {
    const tag = document.createElement('span');
    tag.className = `card__tag${badgeClass}`;
    tag.textContent = badgeText;
    frame.appendChild(tag);
  }

  const body = document.createElement('div');
  body.className = 'card__body';

  const name = document.createElement('h3');
  name.className = 'card__name script';
  name.textContent = product.name;

  const meta = document.createElement('p');
  meta.className = 'card__meta';
  meta.textContent = product.meta || '';

  const desc = document.createElement('p');
  desc.className = 'card__desc';
  desc.textContent = product.shortDescription || product.description || '';

  const actions = document.createElement('div');
  actions.className = 'card__row card__row--buy card__actions';

  const details = document.createElement('button');
  details.type = 'button';
  details.className = 'btn btn--details';
  details.dataset.details = product.id;
  details.textContent = 'Details';

  const buy = document.createElement('button');
  buy.type = 'button';
  buy.className = 'btn btn--buy';
  buy.dataset.buy = '';
  buy.dataset.productId = product.id;

  if ((product.status || '').toLowerCase() === 'sold') {
    buy.textContent = 'Sold Out';
    buy.disabled = true;
    buy.classList.add('is-disabled');
  } else {
    buy.textContent = 'Buy it';
  }

  actions.append(details, buy);
  body.append(name, meta, desc, actions);
  article.append(frame, body);
  return article;
}

function renderProducts() {
  if (!productCards) return;
  const liveProducts = getLiveProducts();
  productCards.innerHTML = '';

  if (!liveProducts.length) {
    const empty = document.createElement('div');
    empty.className = 'collection-empty';
    empty.innerHTML = '<span>📷</span><h3>Fresh stock is on the way</h3><p>Check back soon for the next little Bloom Camz drop.</p>';
    productCards.appendChild(empty);
    return;
  }

  liveProducts.forEach((product) => productCards.appendChild(createProductCard(product)));
  initTiltCards(productCards);
  observeRevealElements(productCards);
}

function renderPolaroids() {
  if (!polaroidGalleryRow || !polaroidGallery) return;
  const liveProducts = getLiveProducts();
  const images = [];

  liveProducts.forEach((product) => {
    (product.images || []).slice(1).forEach((src) => {
      images.push({ src, name: product.name });
    });
  });

  const maxImages = Number(SETTINGS.polaroidMaxImages ?? 8);
  const selected = images.slice(0, maxImages);
  const rotations = [
    { rot: -6, ty: 10 }, { rot: 4, ty: -16 }, { rot: -3, ty: 6 }, { rot: 7, ty: -8 },
    { rot: -8, ty: 12 }, { rot: 3, ty: -10 }, { rot: 5, ty: 4 }, { rot: -4, ty: -6 }
  ];

  polaroidGalleryRow.innerHTML = '';
  polaroidGallery.hidden = !selected.length;

  selected.forEach((item, index) => {
    const style = rotations[index % rotations.length];
    const wrap = document.createElement('div');
    wrap.className = 'polaroid-wrap reveal';

    const figure = document.createElement('figure');
    figure.className = 'polaroid';
    figure.style.setProperty('--rot', `${style.rot}deg`);
    figure.style.setProperty('--ty', `${style.ty}px`);

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = `${item.name} detail`;
    img.loading = 'lazy';

    figure.appendChild(img);
    wrap.appendChild(figure);
    polaroidGalleryRow.appendChild(wrap);
  });

  observeRevealElements(polaroidGalleryRow);
}

/* ============================================
   Coming Soon — fully driven by product launchAt
============================================ */
const comingSoonSection = document.getElementById('coming-soon');
const cdDays = document.getElementById('cdDays');
const cdHours = document.getElementById('cdHours');
const cdMins = document.getElementById('cdMins');
const cdSecs = document.getElementById('cdSecs');
const comingSoonHeading = document.getElementById('comingSoonHeading');
const comingSoonSub = document.getElementById('comingSoonSub');
const countdownEl = document.getElementById('countdown');
const mysteryRow = document.getElementById('mysteryRow');
const notifyBtn = document.getElementById('notifyBtn');

let activeCountdownTarget = null;
let countdownRefreshLock = false;

function renderComingSoon() {
  if (!comingSoonSection) return;
  const upcoming = getUpcomingProducts();
  const comingSoonNavLink = document.querySelector('.nav__links a[href="#coming-soon"]');

  if (!upcoming.length) {
    comingSoonSection.hidden = true;
    if (comingSoonNavLink) comingSoonNavLink.hidden = true;
    activeCountdownTarget = null;
    return;
  }

  comingSoonSection.hidden = false;
  if (comingSoonNavLink) comingSoonNavLink.hidden = false;
  const count = upcoming.length;
  const noun = count === 1 ? 'camera' : 'cameras';
  comingSoonHeading.textContent = `${count} new ${noun} dropping soon 👀`;
  comingSoonSub.textContent = `We're cleaning, testing and charming up ${count === 1 ? 'a fresh find' : `${count} fresh finds`}. Check back — or get notified the second ${count === 1 ? 'it lands' : 'they land'}.`;

  activeCountdownTarget = safeDate(upcoming[0].launchAt);
  countdownEl?.classList.remove('is-done');

  if (mysteryRow) {
    mysteryRow.innerHTML = '';
    upcoming.slice(0, 8).forEach(() => {
      const card = document.createElement('div');
      card.className = 'mystery-card reveal';
      card.innerHTML = `
        <div class="mystery-card__glow"></div>
        <span class="mystery-card__mark">?</span>
        <span class="mystery-card__ribbon">Coming Soon</span>`;
      mysteryRow.appendChild(card);
    });
    observeRevealElements(mysteryRow);
  }

  updateCountdown();
}

function updateCountdown() {
  if (!activeCountdownTarget || !cdDays || !cdHours || !cdMins || !cdSecs) return;
  const diff = activeCountdownTarget - new Date();

  if (diff <= 0) {
    cdDays.textContent = '00';
    cdHours.textContent = '00';
    cdMins.textContent = '00';
    cdSecs.textContent = '00';

    if (!countdownRefreshLock) {
      countdownRefreshLock = true;
      setTimeout(() => {
        renderProductAreas();
        maybeShowDropAlert();
        countdownRefreshLock = false;
      }, 650);
    }
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  cdDays.textContent = String(days).padStart(2, '0');
  cdHours.textContent = String(hours).padStart(2, '0');
  cdMins.textContent = String(mins).padStart(2, '0');
  cdSecs.textContent = String(secs).padStart(2, '0');
}

setInterval(updateCountdown, 1000);

notifyBtn?.addEventListener('click', () => {
  triggerFlash();
  openWhatsApp(MESSAGES.notify || 'Hi Bloom Camz! 🔔 Please notify me when the new cameras drop!');
});

/* ============================================
   The Wall — auto-load numbered images
============================================ */
const wallCfg = SETTINGS.wall || {};
const WALL_FOLDER = wallCfg.folder || 'images/TheWall';
const WALL_PREFIX = wallCfg.prefix || 'image';
const WALL_EXTENSION = wallCfg.extension || 'jpeg';
const WALL_MAX_IMAGES = Number(wallCfg.maxImages || 100);
const wallItemsEl = document.getElementById('wallItems');

const wallPattern = [
  { tilt: -4, string: 26 }, { tilt: 3, string: 46 }, { tilt: -2, string: 18 },
  { tilt: 5, string: 36 }, { tilt: -5, string: 24 }, { tilt: 2, string: 40 }
];

function imageExists(src) {
  return new Promise((resolve) => {
    const testImg = new Image();
    testImg.onload = () => resolve(true);
    testImg.onerror = () => resolve(false);
    testImg.src = src;
  });
}

function appendWallPhoto(src, index) {
  if (!wallItemsEl) return;
  const p = wallPattern[index % wallPattern.length];
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
  img.src = src;
  img.alt = `Bloom Camz wall photo ${index + 1}`;
  img.loading = 'lazy';

  photoBox.appendChild(img);
  item.append(string, clip, photoBox);
  wallItemsEl.appendChild(item);
}

async function loadWallPhotos() {
  if (!wallItemsEl) return;
  wallItemsEl.innerHTML = '';
  for (let i = 1; i <= WALL_MAX_IMAGES; i += 1) {
    const src = `${WALL_FOLDER}/${WALL_PREFIX}${i}.${WALL_EXTENSION}`;
    if (!(await imageExists(src))) break;
    appendWallPhoto(src, i - 1);
  }
}

loadWallPhotos();

/* ---- Wall drag / swipe ---- */
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

  wallScroll.addEventListener('mousedown', (e) => { startDrag(e.clientX); e.preventDefault(); });
  window.addEventListener('mousemove', (e) => duringDrag(e.clientX));
  window.addEventListener('mouseup', endDrag);
  wallScroll.addEventListener('click', (e) => {
    if (moved) { e.preventDefault(); e.stopPropagation(); }
  }, true);
  wallScroll.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      wallScroll.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });
}

/* ============================================
   Feedback — auto-load Feedback_1.jpeg, Feedback_2.jpeg...
============================================ */
const feedbackCfg = SETTINGS.feedback || {};
const FEEDBACK_FOLDER = feedbackCfg.folder || 'images/feedback';
const FEEDBACK_PREFIX = feedbackCfg.prefix || 'Feedback_';
const FEEDBACK_EXTENSION = feedbackCfg.extension || 'jpeg';
const FEEDBACK_MAX_IMAGES = Number(feedbackCfg.maxImages || 100);
const feedbackTilts = [-3, 2, -2, 4, -4, 3, -1, 2];
const feedbackGridEl = document.getElementById('feedbackGrid');
const feedbackPhotos = [];

async function loadFeedbackPhotos() {
  if (!feedbackGridEl) return;
  feedbackGridEl.innerHTML = '';
  feedbackPhotos.length = 0;

  for (let i = 1; i <= FEEDBACK_MAX_IMAGES; i += 1) {
    const src = `${FEEDBACK_FOLDER}/${FEEDBACK_PREFIX}${i}.${FEEDBACK_EXTENSION}`;
    if (!(await imageExists(src))) break;
    feedbackPhotos.push({ src, alt: `Customer feedback screenshot ${i}` });
  }

  feedbackPhotos.forEach((photo, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'feedback__wrap reveal';

    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'feedback__card';
    card.style.setProperty('--tilt', `${feedbackTilts[i % feedbackTilts.length]}deg`);
    card.setAttribute('aria-label', `View feedback screenshot ${i + 1} full size`);

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = 'lazy';

    const heart = document.createElement('span');
    heart.className = 'feedback__heart';
    heart.innerHTML = '<i class="bi bi-heart-fill"></i>';

    card.append(img, heart);
    card.addEventListener('click', () => openFeedbackLightbox(i));
    wrap.appendChild(card);
    feedbackGridEl.appendChild(wrap);
  });

  observeRevealElements(feedbackGridEl);
}

loadFeedbackPhotos();

/* ---- Feedback lightbox ---- */
const feedbackLightbox = document.getElementById('feedbackLightbox');
const feedbackLightboxImg = document.getElementById('feedbackLightboxImg');
const feedbackPrev = document.getElementById('feedbackPrev');
const feedbackNext = document.getElementById('feedbackNext');
let activeFeedbackIndex = 0;

function renderFeedbackLightbox() {
  const photo = feedbackPhotos[activeFeedbackIndex];
  if (!photo || !feedbackLightboxImg) return;
  feedbackLightboxImg.src = photo.src;
  feedbackLightboxImg.alt = photo.alt;
}

function openFeedbackLightbox(index) {
  if (!feedbackLightbox || !feedbackPhotos.length) return;
  activeFeedbackIndex = index;
  renderFeedbackLightbox();
  const hasMultiple = feedbackPhotos.length > 1;
  feedbackPrev.hidden = !hasMultiple;
  feedbackNext.hidden = !hasMultiple;
  feedbackLightbox.classList.add('is-open');
  feedbackLightbox.setAttribute('aria-hidden', 'false');
}

function closeFeedbackLightbox() {
  if (!feedbackLightbox) return;
  feedbackLightbox.classList.remove('is-open');
  feedbackLightbox.setAttribute('aria-hidden', 'true');
}

if (feedbackLightbox) {
  feedbackLightbox.querySelectorAll('[data-feedback-close]').forEach((el) => el.addEventListener('click', closeFeedbackLightbox));
  feedbackPrev?.addEventListener('click', () => {
    activeFeedbackIndex = (activeFeedbackIndex - 1 + feedbackPhotos.length) % feedbackPhotos.length;
    renderFeedbackLightbox();
  });
  feedbackNext?.addEventListener('click', () => {
    activeFeedbackIndex = (activeFeedbackIndex + 1) % feedbackPhotos.length;
    renderFeedbackLightbox();
  });
}

/* ============================================
   Camera details modal — product data comes from data.js
============================================ */
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
  if (!activeDetail || !activeDetail.images?.length) return;
  const src = activeDetail.images[activeDetailImageIndex];
  detailMainImg.src = src;
  detailMainImg.alt = `${activeDetail.name} photo ${activeDetailImageIndex + 1}`;
  detailThumbs.querySelectorAll('.detail-modal__thumb').forEach((thumb, index) => {
    thumb.classList.toggle('is-active', index === activeDetailImageIndex);
  });
}

function openDetailModal(productId) {
  const product = getProductById(productId);
  if (!product || !isProductLive(product) || !detailModal) return;

  activeDetail = product;
  activeDetailImageIndex = 0;
  const images = product.images?.length ? product.images : [product.cardImage].filter(Boolean);
  activeDetail.images = images;

  detailModalTitle.textContent = product.name;
  detailModalMeta.textContent = product.meta || '';
  detailModalDescription.textContent = product.description || product.shortDescription || '';

  detailModalSpecs.innerHTML = '';
  (product.specs || []).forEach((spec) => {
    const li = document.createElement('li');
    li.textContent = spec;
    detailModalSpecs.appendChild(li);
  });
  detailSpecWrap.hidden = !(product.specs && product.specs.length);

  detailThumbs.innerHTML = '';
  images.forEach((src, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'detail-modal__thumb';
    btn.setAttribute('aria-label', `View ${product.name} photo ${index + 1}`);
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    btn.appendChild(img);
    btn.addEventListener('click', () => { activeDetailImageIndex = index; renderDetailImage(); });
    detailThumbs.appendChild(btn);
  });

  const multiple = images.length > 1;
  detailPrev.hidden = !multiple;
  detailNext.hidden = !multiple;
  detailThumbs.hidden = !multiple;

  const sold = (product.status || '').toLowerCase() === 'sold';
  detailBuyBtn.disabled = sold;
  detailBuyBtn.classList.toggle('is-disabled', sold);
  detailBuyBtn.textContent = sold ? 'Sold Out' : 'Buy it';

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
  detailModal.querySelectorAll('[data-detail-close]').forEach((el) => el.addEventListener('click', closeDetailModal));
  detailPrev.addEventListener('click', () => {
    if (!activeDetail?.images?.length) return;
    activeDetailImageIndex = (activeDetailImageIndex - 1 + activeDetail.images.length) % activeDetail.images.length;
    renderDetailImage();
  });
  detailNext.addEventListener('click', () => {
    if (!activeDetail?.images?.length) return;
    activeDetailImageIndex = (activeDetailImageIndex + 1) % activeDetail.images.length;
    renderDetailImage();
  });
  detailBuyBtn.addEventListener('click', () => {
    if (!activeDetail || detailBuyBtn.disabled) return;
    const imageSrc = activeDetail.images[activeDetailImageIndex] || activeDetail.cardImage;
    const name = activeDetail.name;
    closeDetailModal();
    triggerFlash();
    openBuyModal(name, imageSrc);
  });
}

/* ---- Product event delegation (works for future launches too) ---- */
productCards?.addEventListener('click', (e) => {
  const detailsBtn = e.target.closest('[data-details]');
  if (detailsBtn) {
    openDetailModal(detailsBtn.dataset.details);
    return;
  }

  const buyBtn = e.target.closest('[data-buy]');
  if (buyBtn && !buyBtn.disabled) {
    const product = getProductById(buyBtn.dataset.productId);
    if (!product) return;
    triggerFlash();
    openBuyModal(product.name, product.cardImage || product.images?.[0] || '');
  }
});

/* ============================================
   Buy modal
============================================ */
const buyModal = document.getElementById('buyModal');
const buyModalImg = document.getElementById('buyModalImg');
const buyModalCamera = document.getElementById('buyModalCamera');
const buyWhatsappBtn = document.getElementById('buyWhatsapp');
const buyInstagramLink = document.getElementById('buyInstagram');
let currentCameraName = '';

function openBuyModal(cameraName, imageSrc) {
  if (!buyModal) return;
  currentCameraName = cameraName;
  buyModalCamera.textContent = cameraName;
  buyModalImg.src = imageSrc;
  buyModalImg.alt = cameraName;
  buyModal.classList.add('is-open');
  buyModal.setAttribute('aria-hidden', 'false');
}

function closeBuyModal() {
  if (!buyModal) return;
  buyModal.classList.remove('is-open');
  buyModal.setAttribute('aria-hidden', 'true');
}

if (buyModal) {
  buyModal.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeBuyModal));
  buyWhatsappBtn.addEventListener('click', () => {
    const template = MESSAGES.buy || "Hi Bloom Camz! I'd like to buy the {camera} 📷";
    triggerFlash();
    openWhatsApp(formatMessage(template, { camera: currentCameraName }));
  });
  buyInstagramLink.href = INSTAGRAM_URL;
}

/* ---- Promise WhatsApp button ---- */
const promiseWhatsappBtn = document.getElementById('promiseWhatsapp');
promiseWhatsappBtn?.addEventListener('click', () => {
  openWhatsApp(DATA.promise?.whatsappMessage || 'Hi Bloom Camz! I need help with a camera I received.');
});

/* ---- General Message to Order ---- */
const messageOrderBtn = document.getElementById('messageOrderBtn');
messageOrderBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  triggerFlash();
  openWhatsApp(MESSAGES.generalOrder || "Hi Bloom Camz! 📷 I'd like to place an order.");
});

/* ============================================
   Request-a-camera modal
============================================ */
const requestModal = document.getElementById('requestModal');
const openRequestBtn = document.getElementById('openRequestModal');
const reqModelInput = document.getElementById('reqModel');
const reqBudgetFrom = document.getElementById('reqBudgetFrom');
const reqBudgetTo = document.getElementById('reqBudgetTo');
const reqNoBudget = document.getElementById('reqNoBudget');
const requestBudgetRow = document.getElementById('requestBudgetRow');
const reqSeenPrice = document.getElementById('reqSeenPrice');
const reqCustom = document.getElementById('reqCustom');
const requestCount = document.getElementById('requestCount');
const requestSendBtn = document.getElementById('requestSendBtn');

function openRequestModal() {
  if (!requestModal) return;
  requestModal.classList.add('is-open');
  requestModal.setAttribute('aria-hidden', 'false');
  setTimeout(() => reqModelInput?.focus(), 250);
}

function closeRequestModal() {
  if (!requestModal) return;
  requestModal.classList.remove('is-open');
  requestModal.setAttribute('aria-hidden', 'true');
}

function shakeField(el) {
  if (!el) return;
  el.classList.add('is-shaking');
  el.focus();
  setTimeout(() => el.classList.remove('is-shaking'), 400);
}

if (requestModal) {
  openRequestBtn?.addEventListener('click', openRequestModal);
  requestModal.querySelectorAll('[data-request-close]').forEach((el) => el.addEventListener('click', closeRequestModal));
  reqCustom?.addEventListener('input', () => { requestCount.textContent = reqCustom.value.length; });
  reqNoBudget?.addEventListener('change', () => {
    const disabled = reqNoBudget.checked;
    requestBudgetRow.classList.toggle('is-disabled', disabled);
    reqBudgetFrom.disabled = disabled;
    reqBudgetTo.disabled = disabled;
    if (disabled) { reqBudgetFrom.value = ''; reqBudgetTo.value = ''; }
  });

  requestSendBtn?.addEventListener('click', () => {
    const model = reqModelInput.value.trim();
    const from = reqBudgetFrom.value.trim();
    const to = reqBudgetTo.value.trim();
    const noBudget = reqNoBudget.checked;
    const seenPrice = reqSeenPrice.value.trim();
    const custom = reqCustom.value.trim();

    if (!model && !custom) { shakeField(reqModelInput); return; }

    const lines = ["Hi Bloom Camz! ✨ I'm looking for a camera:", ''];
    lines.push(`Model: ${model || 'Not sure yet — open to suggestions'}`);
    if (noBudget) lines.push('Budget: No budget in mind, any range works');
    else if (from || to) lines.push(`Budget: ${from ? `Rs. ${from}` : 'Rs. 0'} to ${to ? `Rs. ${to}` : 'open'}`);
    if (seenPrice) lines.push(`Seen it elsewhere for: ${seenPrice}`);
    if (custom) lines.push(`Notes: ${custom}`);

    triggerFlash();
    openWhatsApp(lines.join('\n'));

    reqModelInput.value = '';
    reqBudgetFrom.value = '';
    reqBudgetTo.value = '';
    reqNoBudget.checked = false;
    requestBudgetRow.classList.remove('is-disabled');
    reqBudgetFrom.disabled = false;
    reqBudgetTo.disabled = false;
    reqSeenPrice.value = '';
    reqCustom.value = '';
    requestCount.textContent = '0';
    closeRequestModal();
  });
}

/* ============================================
   New Drop alert — once per browser per fresh launch
============================================ */
const dropModal = document.getElementById('dropModal');
const dropModalTitle = document.getElementById('dropModalTitle');
const dropModalSub = document.getElementById('dropModalSub');
const dropModalProducts = document.getElementById('dropModalProducts');
const dropViewBtn = document.getElementById('dropViewBtn');

function dropStorageKey(product) {
  return `bloomcamz_seen_drop_${product.id}_${product.launchAt || 'launch'}`;
}

function wasDropSeen(product) {
  try { return localStorage.getItem(dropStorageKey(product)) === '1'; }
  catch { return false; }
}

function markDropSeen(product) {
  try { localStorage.setItem(dropStorageKey(product), '1'); }
  catch { /* storage can be unavailable in strict/private modes */ }
}

function getFreshUnseenDrops() {
  const now = new Date();
  return getLiveProducts(now).filter((product) => getRecentLaunch(product, now) && !wasDropSeen(product));
}

function openDropModal(products) {
  if (!dropModal || !products.length) return;
  dropModalTitle.textContent = MESSAGES.newDropTitle || 'New cameras are live ✨';
  dropModalSub.textContent = MESSAGES.newDropSubtitle || 'Fresh Bloom Camz finds just landed.';
  dropModalProducts.innerHTML = '';

  products.slice(0, 4).forEach((product, index) => {
    const item = document.createElement('div');
    item.className = 'drop-modal__product';
    item.style.setProperty('--drop-delay', `${index * 90}ms`);

    const img = document.createElement('img');
    img.src = product.cardImage || product.images?.[0] || '';
    img.alt = product.name;

    const name = document.createElement('span');
    name.textContent = product.name;
    item.append(img, name);
    dropModalProducts.appendChild(item);
  });

  products.forEach(markDropSeen);
  dropModal.classList.add('is-open');
  dropModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-lock');
}

function closeDropModal() {
  if (!dropModal) return;
  dropModal.classList.remove('is-open');
  dropModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-lock');
}

function maybeShowDropAlert() {
  const fresh = getFreshUnseenDrops();
  if (!fresh.length) return;
  setTimeout(() => openDropModal(fresh), loader && !loader.classList.contains('is-done') ? 1600 : 450);
}

if (dropModal) {
  dropModal.querySelectorAll('[data-drop-close]').forEach((el) => el.addEventListener('click', closeDropModal));
  dropViewBtn?.addEventListener('click', () => {
    closeDropModal();
    document.getElementById('collection')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}

/* ============================================
   Hero 3D tilt
============================================ */
const heroStage = document.getElementById('heroStage');
const heroCharm = document.getElementById('heroCharm');
if (heroStage && heroCharm && window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    heroCharm.style.animation = 'none';
    heroCharm.style.transform = `rotateX(${8 + (-dy * 10)}deg) rotateY(${-10 + (dx * 16)}deg)`;
  });
  document.addEventListener('mouseleave', () => { heroCharm.style.animation = 'float 6s ease-in-out infinite'; });
}

/* ============================================
   Product card tilt — reusable after dynamic renders
============================================ */
function initTiltCards(root = document) {
  if (!window.matchMedia('(hover: hover)').matches) return;
  root.querySelectorAll('[data-tilt]').forEach((card) => {
    if (card.dataset.tiltReady === '1') return;
    card.dataset.tiltReady = '1';
    const maxTilt = 9;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * maxTilt * 2;
      const rotateX = -(py - 0.5) * maxTilt * 2;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ============================================
   Scroll reveal — reusable for dynamic content
============================================ */
let revealObserver = null;
if ('IntersectionObserver' in window) {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
}

function observeRevealElements(root = document) {
  root.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add('is-visible');
  });
}

/* ---- Global Escape key for open dialogs ---- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (dropModal?.classList.contains('is-open')) closeDropModal();
    if (detailModal?.classList.contains('is-open')) closeDetailModal();
    if (buyModal?.classList.contains('is-open')) closeBuyModal();
    if (requestModal?.classList.contains('is-open')) closeRequestModal();
    if (feedbackLightbox?.classList.contains('is-open')) closeFeedbackLightbox();
  }

  if (detailModal?.classList.contains('is-open') && activeDetail?.images?.length > 1) {
    if (e.key === 'ArrowLeft') detailPrev.click();
    if (e.key === 'ArrowRight') detailNext.click();
  }

  if (feedbackLightbox?.classList.contains('is-open') && feedbackPhotos.length > 1) {
    if (e.key === 'ArrowLeft') feedbackPrev.click();
    if (e.key === 'ArrowRight') feedbackNext.click();
  }
});

/* ---- Mobile nav ---- */
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('nav__links--open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('nav__links--open'));
  });
}

/* ---- Nav background ---- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.style.boxShadow = window.scrollY > 40 ? '0 4px 20px rgba(43,38,34,.08)' : 'none';
}, { passive: true });

/* ---- Render all data-driven areas ---- */
function renderProductAreas() {
  renderProducts();
  renderPolaroids();
  renderComingSoon();
}

renderProductAreas();
observeRevealElements(document);
initTiltCards(document);

window.addEventListener('load', maybeShowDropAlert);
