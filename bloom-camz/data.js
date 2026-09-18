// ============================================================
// Bloom Camz — EDITABLE DATA FILE
// ============================================================
// Most day-to-day website updates can now be done from this file only.
//
// PRODUCT RULES
// 1) Put product images inside: images/products/
// 2) Add / duplicate a product object inside "products" below.
// 3) launchAt controls when the camera becomes visible on the website.
//    Example Pakistan time: "2026-09-15T18:00:00+05:00"
// 4) If launchAt is in the future, it stays hidden from Collection and is
//    automatically shown in Coming Soon.
// 5) At/after launchAt it automatically appears in Collection.
// 6) announceOnLaunch: true = first visit after launch shows the New Drop popup.
// 7) isActive: false = completely hidden (useful while preparing a draft).
// 8) status can be: "available" or "sold".
// 9) "compare" powers the Compare section. Keep unknown values as null
//    instead of guessing. Numeric fields are used only for factual highlights.
// ============================================================

window.BLOOM_DATA = {
  settings: {
    whatsappNumber: '923172117112',
    instagramUrl: 'https://www.instagram.com/bloomcamzzz/',
    heroImage: 'images/FirstView/image.jpg',
    logoImage: 'images/logos/logo.jpg',

    // New-drop popup is only considered "fresh" for this many hours.
    // 168 = 7 days. Change this if you want the popup window longer/shorter.
    newDropAlertHours: 168,
    polaroidMaxImages: 8,

    // Comparison section defaults. Leave IDs blank to auto-pick live cameras.
    comparison: {
      includeSold: true,
      defaultLeft: 'casio-exilim-ex-z1',
      defaultRight: 'samsung-es70'
    },

    wall: {
      folder: 'images/TheWall',
      prefix: 'image',
      extension: 'jpeg',
      maxImages: 100
    },

    feedback: {
      folder: 'images/feedback',
      prefix: 'Feedback_',
      extension: 'jpeg',
      maxImages: 100
    }
  },

  promise: {
    title: '🛡 Bloom Camz Promise',
    paragraphs: [
      'Every camera from Bloomcamzz is real, pre-owned, and tested by us before it goes out. We personally check lens, zoom, flash, screen and battery on each piece.',
      "What you see in the listing photos is exactly what you'll get, so please check them well.",
      "Heads up: Because these are used items, we can't accept returns just for change of mind. But if there's any fault on arrival, contact us within 48 hours + an unboxing video and we'll replace it or refund you 100%."
    ],
    whatsappButtonText: 'Contact us on WhatsApp',
    whatsappMessage: "Hi Bloom Camz! I have an issue with the camera I received and I'd like to contact you regarding the 48-hour replacement/refund policy."
  },

  messages: {
    buy: "Hi Bloom Camz! I'd like to buy the {camera} 📷",
    notify: 'Hi Bloom Camz! 🔔 Please notify me the moment the new cameras drop!',
    generalOrder: "Hi Bloom Camz! 📷 I'd like to place an order.",
    newDropTitle: 'New cameras are live ✨',
    newDropSubtitle: 'Fresh Bloom Camz finds just landed. Take a look before they’re gone.'
  },

  products: [
    {
      id: 'samsung-s860',
      name: 'Samsung S860',
      meta: '8.1MP · Y2K silver body · charm included',
      shortDescription: 'Compact and pocketable with that unmistakable early-2000s point-and-shoot glow. Comes with its own little beaded dangle.',
      description: 'A classic compact digicam for that nostalgic Y2K look ✨ Perfect for everyday snapshots, flash photos & capturing memories with a vintage feel.',
      cardImage: 'images/products/samsung-s860-crop.jpg',
      images: [
        'images/products/samsung-s860-crop.jpg',
        'images/products/samsung-s860-crop2.jpg',
        'images/products/samsung-s860-crop3.jpg',
        'images/products/samsung-s860-crop4.jpg'
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
      ],
      compare: {
        megapixels: 8.1,
        opticalZoom: 3,
        screenSize: 2.4,
        stabilization: { value: 'Digital Image Stabilization (DIS)', score: 1 },
        video: null,
        storage: null,
        battery: null,
        condition: null,
        boxIncluded: null,
        accessories: null,
        bestFor: ['Compact carry', 'Flash photos', 'Classic Y2K look']
      },

      status: 'sold',
      isActive: true,
      launchAt: null,
      announceOnLaunch: false,
      sortOrder: 1
    },

    {
      id: 'fujifilm-xp10',
      name: 'Fujifilm FinePix XP10',
      meta: '12MP · rugged waterproof · champagne shell',
      shortDescription: 'The tough little one — take it to the beach, the rain, wherever. Soft grain, dreamy flash shots.',
      description: 'A perfect little digicam for capturing that dreamy vintage & Y2K aesthetic ✨ Fully checked and ready to capture your memories. Perfect for everyday snaps, travel, outings, parties & that nostalgic digicam look.',
      cardImage: 'images/products/fujifilm-xp10-crop.jpg',
      images: [
        'images/products/fujifilm-xp10-crop.jpg',
        'images/products/fujifilm-xp10-crop2.jpg',
        'images/products/fujifilm-xp10-crop3.jpg',
        'images/products/fujifilm-xp10-crop4.jpg'
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
      ],
      compare: {
        megapixels: 12,
        opticalZoom: 5,
        screenSize: 2.7,
        stabilization: { value: 'Digital Image Stabilization', score: 1 },
        video: { value: 'HD 720p @ 30fps', score: 921600 },
        storage: 'SD / SDHC',
        battery: 'Rechargeable Li-ion',
        condition: 8,
        boxIncluded: null,
        accessories: null,
        bestFor: ['Travel', 'Everyday snaps', 'Outdoor use']
      },

      status: 'available',
      isActive: true,
      launchAt: null,
      announceOnLaunch: false,
      sortOrder: 2
    },

    {
      id: 'benq-c1020',
      name: 'BenQ DC C1020',
      meta: '10.1MP · classic Y2K compact · charm included',
      shortDescription: 'An underrated favourite — soft-focus edges and warm indoor flash that makes everyone look like a memory already.',
      description: 'A fun little compact digicam with a classic Y2K/vintage digital-camera feel ✨ Perfect for everyday snaps, flash photography, parties, outings and capturing nostalgic memories.',
      cardImage: 'images/products/benq-c1020-crop.jpg',
      images: [
        'images/products/benq-c1020-crop.jpg',
        'images/products/benq-c1020-crop2.jpg',
        'images/products/benq-c1020-crop3.jpg',
        'images/products/benq-c1020-crop4.jpg'
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
      ],
      compare: {
        megapixels: 10.1,
        opticalZoom: 3,
        screenSize: 2.5,
        stabilization: { value: 'Digital Image Stabilization', score: 1 },
        video: { value: 'Video recording with sound', score: null },
        storage: 'SD / SDHC',
        battery: '2× AA batteries',
        condition: 9,
        boxIncluded: null,
        accessories: null,
        bestFor: ['Indoor flash', 'Parties', 'Warm nostalgic look']
      },

      status: 'available',
      isActive: true,
      launchAt: null,
      announceOnLaunch: false,
      sortOrder: 3
    },

    // --------------------------------------------------------
    // UPCOMING CAMERA SLOT 1
    // --------------------------------------------------------
    {
      id: 'casio-exilim-ex-z1',
      name: 'Casio Exilim EX-Z1',
      meta: '10.1MP CCD · 3× Optical Zoom · 2.7″ LCD · With Box',
      shortDescription: 'Super slim and pocket-friendly vintage digicam with a cute Y2K aesthetic. Perfect for everyday moments and flash photography.',
      description: 'A cute vintage digicam with a slim, pocket-friendly design and classic Y2K digital-camera aesthetic. Perfect for everyday moments, flash photography and nostalgic photos. Minor signs of use and scratches. Fully tested and working.',
      
      cardImage: 'images/products/casio-exz1-1.jpeg',

      images: [
        'images/products/casio-exz1-1.jpeg',
        'images/products/casio-exz1-2.jpeg',
        'images/products/casio-exz1-3.jpeg',
        'images/products/casio-exz1-4.jpeg',
        'images/products/casio-exz1-5.jpeg',
        'images/products/casio-exz1-6.jpeg'
      ],

      specs: [
        '10.1 MP CCD Sensor',
        '3× Optical Zoom',
        '2.7″ LCD Screen',
        'Digital Anti-Shake',
        '848×480 Video',
        'SD / SDHC Compatible',
        'Super Slim & Pocket-Friendly Design',
        'Cute Vintage Digital-Camera Aesthetic',
        'With Box',
        'Condition: 9/10',
        'Minor signs of use and scratches',
        'Includes: Battery',
        'Includes: Charger',
        'Includes: SD Card',
        'Fully Tested & Working'
      ],

      compare: {
        megapixels: 10.1,
        opticalZoom: 3,
        screenSize: 2.7,
        stabilization: { value: 'Digital Anti-Shake', score: 1 },
        video: { value: '848×480', score: 407040 },
        storage: 'SD / SDHC',
        battery: 'Battery included',
        condition: 9,
        boxIncluded: true,
        accessories: ['Battery', 'Charger', 'SD Card'],
        bestFor: ['Pocket carry', 'Flash photography', 'Cute Y2K photos']
      },

      status: 'available',
      isActive: true,
      launchAt: '2026-09-10T18:07:00+05:00',
      announceOnLaunch: true,
      sortOrder: 4
    },

    // --------------------------------------------------------
    // UPCOMING CAMERA SLOT 2
    // --------------------------------------------------------
    {
      id: 'samsung-es70',
      name: 'Samsung ES70',
      meta: '14.2MP CCD · 5× Optical Zoom · 27mm Wide Angle · With Box',
      shortDescription: 'Slim vintage Samsung digicam with a wide-angle lens and nostalgic early-digital look. Perfect for everyday photography and group shots.',
      description: 'A slim and pocket-friendly vintage digicam with a classic early-digital aesthetic. Great for everyday photography, group shots and nostalgic Y2K-style photos. Minor signs of use and scratches. Fully tested and working.',
      
      cardImage: 'images/products/samsung-es70-1.jpeg',

      images: [
        'images/products/samsung-es70-1.jpeg',
        'images/products/samsung-es70-2.jpeg',
        'images/products/samsung-es70-3.jpeg',
        'images/products/samsung-es70-4.jpeg',
        'images/products/samsung-es70-5.jpeg',
        'images/products/samsung-es70-6.jpeg',
        'images/products/samsung-es70-7.jpeg'
      ],

      specs: [
        '14.2 MP CCD Sensor',
        '5× Optical Zoom',
        '27mm Wide-Angle Lens',
        '2.7″ LCD Screen',
        'Digital Image Stabilization',
        '640×480 Video',
        'SD / SDHC Compatible',
        'Slim & Pocket-Friendly Design',
        'With Box',
        'Condition: 8.5/10',
        'Minor signs of use and scratches',
        'Fully Tested & Working'
      ],

      compare: {
        megapixels: 14.2,
        opticalZoom: 5,
        screenSize: 2.7,
        stabilization: { value: 'Digital Image Stabilization', score: 1 },
        video: { value: '640×480', score: 307200 },
        storage: 'SD / SDHC',
        battery: null,
        condition: 8.5,
        boxIncluded: true,
        accessories: null,
        bestFor: ['Group shots', 'Wide-angle photos', 'Everyday photography']
      },

      status: 'available',
      isActive: true,
      launchAt: '2026-09-10T18:07:00+05:00',
      announceOnLaunch: true,
      sortOrder: 5
    },

    // --------------------------------------------------------
    // UPCOMING CAMERA SLOT 3
    // --------------------------------------------------------
    {
      id: 'canon-ixy-powershot-25is',
      name: 'Canon IXY PowerShot 25IS',
      meta: '10MP CCD · 3× Optical Zoom · Optical IS · With Box',
      shortDescription: 'Compact Canon vintage digicam with optical stabilization and a gorgeous CCD look. Perfect for flash photos and nostalgic everyday snaps.',
      description: 'A compact and pocket-friendly vintage Canon digicam with a gorgeous CCD look. Perfect for everyday snaps, flash photography and nostalgic memories. Minor signs of use and scratches. Fully tested and working.',
      
      cardImage: 'images/products/Canon-Powershot-1.jpeg',

      images: [
        'images/products/Canon-Powershot-1.jpeg',
        'images/products/Canon-Powershot-2.jpeg',
        'images/products/Canon-Powershot-3.jpeg',
        'images/products/Canon-Powershot-4.jpeg',
        'images/products/Canon-Powershot-5.jpeg',
        'images/products/Canon-Powershot-6.jpeg',
        'images/products/Canon-Powershot-7.jpeg'
      ],

      specs: [
        '10.0 MP CCD Sensor',
        '3× Optical Zoom',
        'Optical Image Stabilizer (IS)',
        '2.5″ LCD Screen',
        '640×480 Video',
        'SD / SDHC Compatible',
        'Compact & Pocket-Friendly',
        'Gorgeous Vintage CCD Look',
        'With Box',
        'Condition: 9/10',
        'Minor signs of use and scratches',
        'Includes: Battery',
        'Includes: Charger',
        'Includes: SD Card',
        'Fully Tested & Working'
      ],

      compare: {
        megapixels: 10,
        opticalZoom: 3,
        screenSize: 2.5,
        stabilization: { value: 'Optical Image Stabilizer (IS)', score: 2 },
        video: { value: '640×480', score: 307200 },
        storage: 'SD / SDHC',
        battery: 'Battery included',
        condition: 9,
        boxIncluded: true,
        accessories: ['Battery', 'Charger', 'SD Card'],
        bestFor: ['Flash photos', 'Steadier handheld shots', 'Classic CCD look']
      },

      status: 'available',
      isActive: true,
      launchAt: '2026-09-10T18:07:00+05:00',
      announceOnLaunch: true,
      sortOrder: 6
    }
  ]
};
