export type ReservationFormData = {
  name: string;
  phone: string;
  email: string;
  smokingPreference: '상관없음' | '흡연' | '비흡연';
  request: string;
};

export interface Reservation {
  userId: string;
  hotelId: string;
  roomId: string;
  startDate: string;
  endDate: string;
  nights: string;
  price: number;
  data: { [key: string]: string };
}
