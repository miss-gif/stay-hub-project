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
  forms: ReservationForm[];
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

interface BaseForm {
  id: string;
  label: string;
  required: string;
  help?: boolean;
}

interface TextFieldForm extends BaseForm {
  type: 'TEXT_FIELD';
}

interface SelectFieldForm extends BaseForm {
  type: 'SELECT';
  options: Array<{ label: string; value: string }>;
}

export type ReservationForm = TextFieldForm | SelectFieldForm;
