import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { reservationSchema } from '../../../schema/validationSchema';

type ReservationFormData = {
  name: string;
  phone: string;
  email: string;
  smokingPreference: '상관없음' | '흡연' | '비흡연';
  request: string;
};

interface ReservationFormProps {
  buttonLabel: string;
}

const ReservationForm = ({ buttonLabel }: ReservationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  const SubmitData = (data: ReservationFormData) => {
    console.log(data);
  };

  return (
    <div className="px-4 py-6 space-y-2 pb-20">
      <p className="font-bold">예약정보</p>
      <form onSubmit={handleSubmit(SubmitData)} className="space-y-2">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm">
            예약자명
          </label>
          <input
            id="name"
            {...register('name')}
            className="mt-1 p-2 w-full border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm">
            전화번호
          </label>
          <input
            id="phone"
            {...register('phone')}
            className="mt-1 p-2 w-full border rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm">
            이메일
          </label>
          <input
            id="email"
            {...register('email')}
            className="mt-1 p-2 w-full border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="smokingPreference"
            className="block text-gray-700 text-sm"
          >
            흡연 여부
          </label>
          <select
            id="smokingPreference"
            {...register('smokingPreference')}
            className="mt-1 p-2 w-full border rounded"
          >
            <option value="상관없음">상관없음</option>
            <option value="흡연">흡연</option>
            <option value="비흡연">비흡연</option>
          </select>
          {errors.smokingPreference && (
            <p className="text-red-500 text-sm">
              {errors.smokingPreference.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="request" className="block text-gray-700 text-sm">
            요청사항
          </label>
          <input
            id="request"
            {...register('request')}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <p className="text-xs">
          * 요청사항은 모두 전달되나 현지 숙소 사정에 따라 반영되지 않을 수
          있습니다.
        </p>

        <div className="fixed bottom-0 left-0 w-full p-4">
          <Button className="w-full">{buttonLabel}</Button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
