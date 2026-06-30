export type Product = {
  id: string;
  name: string;
  image: any;
  price: number;
  originalPrice?: number;
  discount?: string;
  inStock: boolean;
};

export type ShopDetails = {
  image: any;
  rating: number;
  address: string;
  phone: string;
  timings: string;
  collections: string[];
  offers: string[];
  products: Record<string, Product[]>;
};

export type CityConfig = {
  marketplaces: any;
  categories: any;
  shops: any;
  shopDetails: Record<string, ShopDetails>;
};