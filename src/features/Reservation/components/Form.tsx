import { InputWithLabel } from '@/components/InputWithLabel';
import { SelectWithLabel } from '@/components/SelectWithLabel';
import { Button } from '@/components/ui/button';
import { Hotel, ReservationForm } from '@/types/hotel';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormProps {
  onSubmit: () => void;
  forms: Hotel['forms'];
  buttonLabel: string;
}

const schema = z.object({
  name: z.string().min(1, '숫자 입력'),
  email: z.string().email('이메일 입력'),
  phone: z.string().min(10, '전화번호 입력'),
});

const Form = ({ onSubmit, forms, buttonLabel }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const renderComponent = useCallback(
    (form: ReservationForm) => {
      if (form.type === 'TEXT_FIELD') {
        return (
          <div key={form.id}>
            <InputWithLabel
              label={form.label}
              type="text"
              id={form.id}
              {...register(form.id)}
            />
            {errors[form.id] && <p>{String(errors[form.id]?.message)}</p>}
          </div>
        );
      } else if (form.type === 'SELECT') {
        return (
          <div key={form.id}>
            <SelectWithLabel
              id={form.id}
              label={form.label}
              options={form.options}
              {...register(form.id)}
            />
            {errors[form.id] && <p>{String(errors[form.id]?.message)}</p>}
          </div>
        );
      } else {
        return null;
      }
    },
    [register, errors],
  );

  return (
    <div className="px-4 py-6 space-y-2 pb-20">
      <p className="font-bold">예약정보</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {forms.map(form => renderComponent(form))}
        <p className="text-xs">
          요청사항은 모두 전달되나 현지 숙소 사정에 따라 반영되지 않을 수
          있습니다.
        </p>

        <div className="fixed bottom-0 left-0 w-full p-4">
          <Button className="w-full">{buttonLabel}</Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
