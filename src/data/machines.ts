import { Machine } from '../types';

export const HERO_BANNER_IMG = '/src/assets/images/industrial_hero_banner_1785826624907.jpg';
export const DENSITY_SEPARATOR_IMG = '/src/assets/images/density_separator_machine_1785826640962.jpg';

export const MACHINES_DATA: Machine[] = [
  {
    id: '1500kg-density-separator',
    name: '1500 Kg Density Separator Machine',
    model: 'AI-DS-1500',
    category: 'density-separator',
    tagline: 'High-Efficiency Specific Gravity Separation for Grains, Seeds & Pulses',
    shortDescription: 'Engineered for high-volume grain processing up to 1500 kg/hr. Effectively separates materials of identical size but different specific gravities with 99.8% precision.',
    fullDescription: 'The Amitas Industry 1500 Kg Density Separator Machine (Model AI-DS-1500) is a state-of-the-art agro-industrial gravity separator designed to process grains, seeds, pulses, spices, and plastic granules. Constructed with premium food-grade SS304 contact parts and a heavy-duty mild steel structural frame, this machine uses air fluidization and eccentric deck vibration to achieve superior specific gravity classification.',
    capacity: '1500 kg/hr (1.5 Tons/hr)',
    powerHp: '5 HP (3-Phase 415V / 50Hz)',
    material: 'Contact Parts: SS304 Stainless Steel / Heavy MS Base',
    efficiency: '99.8% Specific Gravity Separation',
    priceRange: '₹1,85,000 - ₹2,45,000',
    usdPrice: '$2,200 - $2,900',
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    warranty: '1 Year Manufacturer Warranty + On-Site Support',
    image: DENSITY_SEPARATOR_IMG,
    galleryImages: [
      DENSITY_SEPARATOR_IMG,
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    ],
    applications: ['Rice Milling', 'Pulses & Dal Processing', 'Spice Processing', 'Seed Cleaning', 'Plastic Granule Sorting', 'Coffee Beans', 'Wheat & Maize'],
    keyFeatures: [
      'Variable Speed Drive (VFD) deck frequency adjustment',
      'High-precision multi-fan air volume control damper',
      'SS304 Stainless Steel food-grade contact wire mesh deck',
      'Integrated dust suction hood for zero-pollution operation',
      'Heavy-duty vibration dampening rubber mounts for silent performance',
      'Low power consumption with high throughput capacity'
    ],
    specs: [
      { label: 'Processing Capacity', value: '1200 - 1500 Kg/Hour' },
      { label: 'Electric Motor Power', value: '5.0 HP (3.7 kW), 1440 RPM' },
      { label: 'Power Supply', value: '415V, 3-Phase, 50 Hz AC' },
      { label: 'Deck Dimensions', value: '1200 mm x 900 mm' },
      { label: 'Air Blower Fans', value: '3 High-Output Centrifugal Fans' },
      { label: 'Material Grade', value: 'SS304 Food Grade Contact / MS Frame' },
      { label: 'Impurity Separation Rate', value: '99.8% Gravity Accuracy' },
      { label: 'Overall Dimensions (L x W x H)', value: '1850 x 1200 x 1650 mm' },
      { label: 'Machine Weight', value: '620 Kg' },
      { label: 'Manufacturing Origin', value: 'Kolhapur, Maharashtra, India' }
    ],
    seoKeywords: [
      '1500 kg density separator machine',
      'gravity separator machine manufacturer kolhapur',
      'density separator price india',
      'amitas industry density separator',
      'grain density separator machine 1.5 ton',
      'seed gravity separator machine',
      'spice density separator stainless steel'
    ],
    seoTitle: '1500 Kg Density Separator Machine Manufacturer | Amitas Industry Kolhapur',
    seoDescription: 'Buy 1500 Kg Density Separator Machine (AI-DS-1500) directly from manufacturer Amitas Industry in Kolhapur. 99.8% separation accuracy, SS304 build, 5 HP motor, best price & warranty.',
    canonicalUrl: 'https://amitasindustry.com/machines/1500kg-density-separator',
    jsonLdSchema: {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      'name': '1500 Kg Density Separator Machine (AI-DS-1500)',
      'image': [DENSITY_SEPARATOR_IMG],
      'description': 'High-performance 1500 Kg/hr Density Separator Machine manufactured by Amitas Industry, Kolhapur. Stainless steel construction for grain, seed, and spice separation.',
      'sku': 'AI-DS-1500',
      'mpn': 'AIDS1500',
      'brand': {
        '@type': 'Brand',
        'name': 'Amitas Industry'
      },
      'offers': {
        '@type': 'AggregateOffer',
        'url': 'https://amitasindustry.com/machines/1500kg-density-separator',
        'priceCurrency': 'INR',
        'lowPrice': '185000',
        'highPrice': '245000',
        'offerCount': '12',
        'priceValidUntil': '2027-12-31',
        'itemCondition': 'https://schema.org/NewCondition',
        'availability': 'https://schema.org/InStock'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'reviewCount': '142'
      }
    }
  },
  {
    id: 'heavy-duty-industrial-destoner',
    name: 'Industrial Heavy-Duty Destoner Machine',
    model: 'AI-DST-2000',
    category: 'destoner',
    tagline: 'Precision Stones & Heavy Impurity Removal for Grains and Agro Crops',
    shortDescription: 'Capable of removing stones, mud balls, glass, and heavy impurities from grains at rates up to 2500 kg/hr with dual-stage screen deck technology.',
    fullDescription: 'The Industrial Heavy-Duty Destoner Machine (AI-DST-2000) by Amitas Industry is engineered for heavy commercial flour mills, rice mills, and grain export processing facilities. It works on the principle of fluidization and deck inclination to separate high-density stones from lighter grains cleanly without product loss.',
    capacity: '2000 - 2500 kg/hr (2.5 Tons/hr)',
    powerHp: '4.5 HP Total (3 HP Blower + 1.5 HP Vibrator)',
    material: 'Mild Steel Heavy Frame with SS304 Perforated Screens',
    efficiency: '99.9% Stone & Glass Removal',
    priceRange: '₹1,45,000 - ₹1,95,000',
    usdPrice: '$1,750 - $2,350',
    rating: 4.8,
    reviewCount: 98,
    inStock: true,
    warranty: '1 Year Full Warranty + Free Installation Guide',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      DENSITY_SEPARATOR_IMG,
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    ],
    applications: ['Rice Milling', 'Wheat Cleaning', 'Paddy Processing', 'Dal Mills', 'Millets & Quinoa', 'Sesame & Sunflower Seeds'],
    keyFeatures: [
      'Dual-deck deck layout for rough and fine destoning',
      'Adjustable stroke amplitude and screen angle inclination',
      'Built-in transparent inspection window for real-time monitoring',
      'Negative pressure suction hood prevents dust blowout',
      'Heavy-duty eccentric shaft with Japanese SKF bearings',
      'Zero grain damage and minimal residual waste'
    ],
    specs: [
      { label: 'Processing Capacity', value: '2000 - 2500 Kg/Hour' },
      { label: 'Main Blower Motor', value: '3.0 HP (3-Phase)' },
      { label: 'Vibratory Deck Motor', value: '1.5 HP Heavy Duty' },
      { label: 'Deck Inclination Range', value: '5° to 12° Adjustable' },
      { label: 'Air Velocity Control', value: 'Micrometer Gauge Damper' },
      { label: 'Stone Removal Rate', value: '99.9% Efficiency' },
      { label: 'Machine Weight', value: '480 Kg' },
      { label: 'Dimensions', value: '1600 x 1100 x 1550 mm' },
      { label: 'Origin', value: 'Kolhapur, Maharashtra' }
    ],
    seoKeywords: [
      'industrial destoner machine',
      'heavy duty grain destoner machine',
      'rice destoner machine manufacturer',
      'destoner machine price kolhapur',
      'amitas industry destoner',
      '2 ton per hour destoner machine'
    ],
    seoTitle: 'Industrial Heavy-Duty Destoner Machine | Amitas Industry',
    seoDescription: 'High-capacity Industrial Destoner Machine (AI-DST-2000) by Amitas Industry Kolhapur. Removes 99.9% stones from grains at 2.5 Tons/hr. Request a quote today.',
    canonicalUrl: 'https://amitasindustry.com/machines/heavy-duty-industrial-destoner',
    jsonLdSchema: {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      'name': 'Industrial Heavy-Duty Destoner Machine (AI-DST-2000)',
      'image': ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
      'description': 'Heavy-duty 2.5 Ton/hr Industrial Grain Destoner Machine manufactured by Amitas Industry. Dual-deck stone remover for rice, wheat, and pulses.',
      'sku': 'AI-DST-2000',
      'brand': {
        '@type': 'Brand',
        'name': 'Amitas Industry'
      },
      'offers': {
        '@type': 'AggregateOffer',
        'url': 'https://amitasindustry.com/machines/heavy-duty-industrial-destoner',
        'priceCurrency': 'INR',
        'lowPrice': '145000',
        'highPrice': '195000',
        'availability': 'https://schema.org/InStock'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.8',
        'reviewCount': '98'
      }
    }
  },
  {
    id: 'semi-automatic-destoner-machine',
    name: 'Semi-Automatic Rice & Grain Destoner',
    model: 'AI-DST-1000',
    category: 'destoner',
    tagline: 'Compact & Energy-Efficient Impurity Removal for Small & Medium Enterprises',
    shortDescription: 'Ideal for small flour mills, spice processors, and seed suppliers requiring 1000 kg/hr stone cleaning with low power draw.',
    fullDescription: 'The Semi-Automatic Rice & Grain Destoner Machine (AI-DST-1000) brings enterprise-grade destoning technology into a compact footprint. Designed for high operational simplicity, it operates efficiently on single-phase or three-phase power.',
    capacity: '1000 kg/hr (1 Ton/hr)',
    powerHp: '2 HP (Single or 3-Phase)',
    material: 'Mild Steel Structure with Stainless Steel Contact Deck',
    efficiency: '99.5% Stone Removal',
    priceRange: '₹85,000 - ₹1,20,000',
    usdPrice: '$1,020 - $1,440',
    rating: 4.8,
    reviewCount: 76,
    inStock: true,
    warranty: '1 Year Manufacturer Warranty',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      DENSITY_SEPARATOR_IMG
    ],
    applications: ['Small Flour Mills', 'Organic Grain Outlets', 'Spice Powder Units', 'Grain Packaging Plants', 'Pulses Processing'],
    keyFeatures: [
      'Compact space-saving layout (fits under standard hoppers)',
      'Single-phase 230V option for local flour mill compatibility',
      'Easy deck mesh replacement system',
      'Low noise and vibration operation',
      'Heavy-duty castor wheels for easy mobility in workshop'
    ],
    specs: [
      { label: 'Capacity', value: '800 - 1000 Kg/Hour' },
      { label: 'Power Consumption', value: '2 HP (1.5 kW)' },
      { label: 'Voltage Options', value: '230V Single Phase / 415V 3-Phase' },
      { label: 'Deck Mesh', value: 'SS304 Interchangeable Screen' },
      { label: 'Weight', value: '290 Kg' },
      { label: 'Dimensions', value: '1250 x 850 x 1350 mm' }
    ],
    seoKeywords: [
      'semi automatic destoner machine',
      'small rice destoner machine price',
      '1 ton destoner machine kolhapur',
      'amitas industry semi automatic destoner',
      'single phase destoner machine'
    ],
    seoTitle: 'Semi-Automatic Rice & Grain Destoner Machine | Amitas Industry',
    seoDescription: 'Compact Semi-Automatic Grain Destoner (AI-DST-1000) by Amitas Industry. 1 Ton/hr capacity, single or 3-phase option, 99.5% efficiency.',
    canonicalUrl: 'https://amitasindustry.com/machines/semi-automatic-destoner-machine',
    jsonLdSchema: {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      'name': 'Semi-Automatic Rice & Grain Destoner Machine (AI-DST-1000)',
      'image': ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'],
      'description': '1 Ton/hr Semi-Automatic Grain Destoner Machine manufactured by Amitas Industry Kolhapur.',
      'sku': 'AI-DST-1000',
      'brand': { '@type': 'Brand', 'name': 'Amitas Industry' },
      'offers': {
        '@type': 'AggregateOffer',
        'url': 'https://amitasindustry.com/machines/semi-automatic-destoner-machine',
        'priceCurrency': 'INR',
        'lowPrice': '85000',
        'highPrice': '120000',
        'availability': 'https://schema.org/InStock'
      }
    }
  },
  {
    id: 'vibro-sifter-grading-machine',
    name: 'Multi-Deck Vibro Sifter Machine',
    model: 'AI-VS-800',
    category: 'vibro-sifter',
    tagline: 'High-Precision Circular Vibratory Screen for Grading & Size Classification',
    shortDescription: 'Multi-deck circular vibro sifter for exact particle sizing, dust removal, and mesh grading of powders, grains, granules, and spices.',
    fullDescription: 'The Multi-Deck Vibro Sifter Machine (AI-VS-800) by Amitas Industry utilizes 3D gyratory vibration motion to achieve high-throughput screening and size classification. Available in single, double, or triple deck configurations with food-grade SS304 mesh screens.',
    capacity: '800 - 1200 kg/hr',
    powerHp: '2 HP Heavy Duty Flange Motor',
    material: 'All SS304 Stainless Steel Construction',
    efficiency: '99.7% Sieve Precision',
    priceRange: '₹1,10,000 - ₹1,65,000',
    usdPrice: '$1,320 - $1,980',
    rating: 4.9,
    reviewCount: 64,
    inStock: true,
    warranty: '1 Year Warranty',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      DENSITY_SEPARATOR_IMG
    ],
    applications: ['Spices & Herb Powders', 'Grain Grading', 'Pharmaceutical Granules', 'Chemical Processing', 'Plastic Pellets', 'Flour Sifting'],
    keyFeatures: [
      'Unique 3D gyratory vibration movement (horizontal, vertical, elliptical)',
      'Quick-release clamp ring system for 2-minute screen changes',
      'Anti-blinding bouncing ball system prevents mesh clogging',
      'Dust-tight silicone seal gasket prevents leakages',
      'Mirror polished interior finish meeting cGMP standards'
    ],
    specs: [
      { label: 'Screen Diameter', value: '30 inch (800 mm)' },
      { label: 'Number of Decks', value: '1 to 3 Decks Available' },
      { label: 'Vibration Motor', value: '2 HP Unbalance Weight Motor' },
      { label: 'Mesh Range', value: '10 Mesh to 300 Mesh SS304' },
      { label: 'Construction', value: 'SS304 Contact Parts / SS Frame' },
      { label: 'Machine Weight', value: '340 Kg' }
    ],
    seoKeywords: [
      'vibro sifter machine manufacturer',
      'vibro sifter price kolhapur',
      'amitas industry vibro sifter',
      'circular vibrating screen for spices',
      'grain sifter machine 3 deck'
    ],
    seoTitle: 'Multi-Deck Vibro Sifter Machine | Amitas Industry Kolhapur',
    seoDescription: 'Buy Multi-Deck Vibro Sifter Machine (AI-VS-800) from Amitas Industry Kolhapur. Food grade SS304 build, 3D gyratory motion, anti-blinding system.',
    canonicalUrl: 'https://amitasindustry.com/machines/vibro-sifter-grading-machine',
    jsonLdSchema: {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      'name': 'Multi-Deck Vibro Sifter Machine (AI-VS-800)',
      'image': ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
      'description': 'Multi-deck Vibro Sifter for grain and powder grading by Amitas Industry Kolhapur.',
      'sku': 'AI-VS-800',
      'brand': { '@type': 'Brand', 'name': 'Amitas Industry' },
      'offers': {
        '@type': 'AggregateOffer',
        'url': 'https://amitasindustry.com/machines/vibro-sifter-grading-machine',
        'priceCurrency': 'INR',
        'lowPrice': '110000',
        'highPrice': '165000',
        'availability': 'https://schema.org/InStock'
      }
    }
  },
  {
    id: 'industrial-spice-seed-pre-cleaner',
    name: 'Industrial Spice & Seed Pre-Cleaner',
    model: 'AI-PC-1200',
    category: 'pre-cleaner',
    tagline: 'Aspiration & Screening Pre-Cleaner for Turmeric, Cumin, Pepper & Seeds',
    shortDescription: 'High-speed pre-cleaning machine designed to remove light dust, chaff, stems, and oversized debris before fine processing.',
    fullDescription: 'The Industrial Spice & Seed Pre-Cleaner (AI-PC-1200) by Amitas Industry combines air aspiration with oscillating screen beds to purify spices, seeds, and commercial grains right after harvesting or intake.',
    capacity: '1200 - 1800 kg/hr',
    powerHp: '3 HP (3-Phase)',
    material: 'SS304 Food Grade Contact Parts',
    efficiency: '99.0% Initial Impurity Extraction',
    priceRange: '₹1,30,000 - ₹1,75,000',
    usdPrice: '$1,560 - $2,100',
    rating: 4.9,
    reviewCount: 45,
    inStock: true,
    warranty: '1 Year Warranty',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      DENSITY_SEPARATOR_IMG
    ],
    applications: ['Turmeric Processing', 'Cumin & Coriander Seeds', 'Black Pepper Cleaning', 'Mustard & Sesame', 'Fenugreek & Herbs'],
    keyFeatures: [
      'Dual aspiration air channel for chaff and dust removal',
      'Interchangeable punch perforated sieve screens',
      'Integrated cyclone dust collector',
      'Smooth eccentric shaft drive mechanism'
    ],
    specs: [
      { label: 'Capacity', value: '1200 - 1800 Kg/Hour' },
      { label: 'Motor Power', value: '3.0 HP (3-Phase)' },
      { label: 'Dust Collector', value: 'High Efficiency Cyclone System Included' },
      { label: 'Construction', value: 'SS304 Contact Parts' },
      { label: 'Weight', value: '410 Kg' }
    ],
    seoKeywords: [
      'spice pre cleaner machine',
      'seed pre cleaner manufacturer kolhapur',
      'turmeric cleaning machine amitas industry',
      'grain pre cleaner machine price'
    ],
    seoTitle: 'Industrial Spice & Seed Pre-Cleaner | Amitas Industry',
    seoDescription: 'Industrial Spice & Seed Pre-Cleaner (AI-PC-1200) by Amitas Industry. 1.8 Ton/hr capacity, cyclone dust collector, SS304 build.',
    canonicalUrl: 'https://amitasindustry.com/machines/industrial-spice-seed-pre-cleaner',
    jsonLdSchema: {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      'name': 'Industrial Spice & Seed Pre-Cleaner (AI-PC-1200)',
      'image': ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'],
      'description': 'Spice and Seed Pre-Cleaner Machine manufactured by Amitas Industry Kolhapur.',
      'sku': 'AI-PC-1200',
      'brand': { '@type': 'Brand', 'name': 'Amitas Industry' },
      'offers': {
        '@type': 'AggregateOffer',
        'url': 'https://amitasindustry.com/machines/industrial-spice-seed-pre-cleaner',
        'priceCurrency': 'INR',
        'lowPrice': '130000',
        'highPrice': '175000',
        'availability': 'https://schema.org/InStock'
      }
    }
  },
  {
    id: 'rotary-drum-grain-cleaner',
    name: 'Rotary Drum Screen Grain Cleaner',
    model: 'AI-RDC-3000',
    category: 'processing-plant',
    tagline: 'High-Volume Scalping & Fine Cleaning for Grain Elevators & Commercial Processing',
    shortDescription: 'Continuous rotary cylinder screen cleaner capable of handling 3000 to 5000 kg/hr of bulk grain with minimal maintenance.',
    fullDescription: 'The Rotary Drum Screen Grain Cleaner (AI-RDC-3000) by Amitas Industry is engineered for high-tonnage primary grain intake lines. It eliminates strings, leaves, sticks, mud clods, and undersized grains before storage in silos or processing lines.',
    capacity: '3000 - 5000 kg/hr (3 to 5 Tons/hr)',
    powerHp: '7.5 HP Total',
    material: 'Heavy Duty Structural Steel Base & SS Drum Mesh',
    efficiency: '99.2% Bulk Scalping Accuracy',
    priceRange: '₹2,60,000 - ₹3,40,000',
    usdPrice: '$3,120 - $4,080',
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    warranty: '1 Year Heavy Duty Warranty',
    image: HERO_BANNER_IMG,
    galleryImages: [
      HERO_BANNER_IMG,
      DENSITY_SEPARATOR_IMG
    ],
    applications: ['Bulk Grain Elevators', 'Commercial Rice Mills', 'Silo Intake Terminals', 'Seed Processing Plants', 'Animal Feed Mills'],
    keyFeatures: [
      'Self-cleaning brush roller system prevents mesh clogging',
      'Variable speed drum rotation control',
      'Heavy-duty internal Archimedes screw conveyor',
      'Dust-sealed enclosure casing with inspection doors'
    ],
    specs: [
      { label: 'Capacity', value: '3000 - 5000 Kg/Hour' },
      { label: 'Drum Size', value: 'Diameter 900 mm x Length 2200 mm' },
      { label: 'Motor Power', value: '7.5 HP (5.5 kW) 3-Phase' },
      { label: 'Material', value: 'Heavy MS Casing / SS Drum Sieve' },
      { label: 'Weight', value: '890 Kg' }
    ],
    seoKeywords: [
      'rotary drum screen grain cleaner',
      'rotary grain cleaner manufacturer',
      '5 ton grain cleaning machine',
      'amitas industry rotary drum cleaner'
    ],
    seoTitle: 'Rotary Drum Screen Grain Cleaner 5 Ton/hr | Amitas Industry',
    seoDescription: 'Rotary Drum Screen Grain Cleaner (AI-RDC-3000) by Amitas Industry Kolhapur. Handles 5 Tons/hr bulk grain cleaning with self-cleaning brush.',
    canonicalUrl: 'https://amitasindustry.com/machines/rotary-drum-grain-cleaner',
    jsonLdSchema: {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      'name': 'Rotary Drum Screen Grain Cleaner (AI-RDC-3000)',
      'image': [HERO_BANNER_IMG],
      'description': 'Bulk 5 Ton/hr Rotary Drum Grain Cleaner manufactured by Amitas Industry Kolhapur.',
      'sku': 'AI-RDC-3000',
      'brand': { '@type': 'Brand', 'name': 'Amitas Industry' },
      'offers': {
        '@type': 'AggregateOffer',
        'url': 'https://amitasindustry.com/machines/rotary-drum-grain-cleaner',
        'priceCurrency': 'INR',
        'lowPrice': '260000',
        'highPrice': '340000',
        'availability': 'https://schema.org/InStock'
      }
    }
  }
];

export const COMPANY_INFO = {
  name: 'Amitas Industry',
  legalName: 'Amitas Industry Machinery Manufacturers',
  establishedYear: 2022,
  city: 'Kolhapur',
  state: 'Maharashtra',
  country: 'India',
  pincode: '416012',
  address: 'Plot No. C-42, Gokul Shirgaon MIDC Industrial Area, Kolhapur, Maharashtra 416012, India',
  phone1: '+91 91455 46639',
  phone2: '+91 91455 46639',
  whatsapp: '919145546639',
  email: 'ankitakhot015@gmail.com',
  website: 'https://amitasindustry.com',
  renderDemoUrl: 'https://amitasindustry.onrender.com',
  isoCertification: 'ISO 9001:2015 Certified Manufacturing Facility',
  stats: [
    { label: 'Machines Manufactured', value: '650+' },
    { label: 'Separation Accuracy', value: '99.8%' },
    { label: 'States & Countries Exported', value: '24+' },
    { label: 'Customer Satisfaction', value: '4.9/5' }
  ]
};
