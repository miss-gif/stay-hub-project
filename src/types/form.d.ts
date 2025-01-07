export type ReservationFormData = {
  name: string;
  phone: string;
  email: string;
  smokingPreference: '상관없음' | '흡연' | '비흡연';
  request: string;
};
