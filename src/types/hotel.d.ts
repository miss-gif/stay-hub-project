export interface Hotel {
  id: string;
  mainImage: string;
  price: number;
  contents: string;
  image: string[];
  comment: string;
  location: Location;
  name: string;
  starRating: number;
  events?: events;
  recommendHotelList?: string[];
}

export interface Location {
  pointGeolocation: PointGeolocation;
  directions: string;
}

export interface PointGeolocation {
  y: number;
  x: number;
}

export interface events {
  name: string;
  promoEndTime?: string;
  tagThemeStyle: { backgroundColor: string; fontColor: string };
  promotionTime?: string;
}
