export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface Machine {
  id: string;
  name: string;
  model: string;
  category: 'density-separator' | 'destoner' | 'vibro-sifter' | 'pre-cleaner' | 'processing-plant';
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  capacity: string; // e.g. "1500 kg/hr"
  powerHp: string; // e.g. "5 HP (3-Phase)"
  material: string; // e.g. "Stainless Steel SS304"
  efficiency: string; // e.g. "99.8% Impurity Removal"
  priceRange: string; // e.g. "₹1,85,000 - ₹2,50,000"
  usdPrice: string; // e.g. "$2,200 - $2,950"
  rating: number;
  reviewCount: number;
  inStock: boolean;
  warranty: string;
  image: string;
  galleryImages: string[];
  applications: string[]; // e.g. ['Rice', 'Pulses', 'Spices', 'Wheat', 'Seeds']
  keyFeatures: string[];
  specs: TechnicalSpec[];
  seoKeywords: string[];
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  jsonLdSchema: Record<string, any>;
}

export interface SearchFilterState {
  query: string;
  category: string;
  minCapacity: number;
  maxCapacity: number;
  material: string;
  sortBy: 'relevance' | 'rating' | 'capacity-high' | 'capacity-low';
}

export interface QuoteRequest {
  machineId: string;
  machineName: string;
  customerName: string;
  companyName: string;
  phone: string;
  email: string;
  cityState: string;
  materialToProcess: string;
  requiredCapacityKgHr: number;
  message: string;
}

export interface SeoHealthReport {
  score: number;
  titleCheck: { status: 'pass' | 'warn' | 'fail'; message: string };
  descCheck: { status: 'pass' | 'warn' | 'fail'; message: string };
  keywordsCheck: { status: 'pass' | 'warn' | 'fail'; message: string };
  schemaCheck: { status: 'pass' | 'warn' | 'fail'; message: string };
  mobileCheck: { status: 'pass' | 'warn' | 'fail'; message: string };
}
