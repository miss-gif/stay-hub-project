// 랜덤 숫자 생성 함수
export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
