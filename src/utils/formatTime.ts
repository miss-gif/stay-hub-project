// 남은 시간을 포맷팅하는 함수

export const formatTime = (ms: number) => {
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  if (days < 0) {
    return '';
  }

  const 남은시간 = Math.floor((ms - day * days) / hour);
  const 남은분 = Math.floor((ms - day * days - hour * 남은시간) / minute);
  const 남은초 = Math.floor(
    (ms - day * days - hour * 남은시간 - minute * 남은분) / 1000,
  );

  const HH = String(남은시간).padStart(2, '0');
  const MM = String(남은분).padStart(2, '0');
  const SS = String(남은초).padStart(2, '0');

  return days > 0
    ? `${days}일 ${HH}시간 ${MM}분 ${SS}초`
    : `${HH}시간 ${MM}분 ${SS}초`;
};
