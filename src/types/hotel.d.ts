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
}

export interface Location {
  pointGeolocation: PointGeolocation;
  directions: string;
}

export interface PointGeolocation {
  y: number;
  x: number;
}
