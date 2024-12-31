import { Hotel, ReservationForm } from '@/types/hotel';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

interface FormProps {
  onSubmit: () => void;
  forms: Hotel['forms'];
}

const Form = ({ onSubmit, forms }: FormProps) => {
  const { register, handleSubmit } = useForm({ mode: 'onBlur' });

  const renderComponent = useCallback(
    (form: ReservationForm) => {
      if (form.type === 'TEXT_FIELD') {
        return (
          <div key={form.id}>
            <label>{form.label}</label>
            <input type="text" {...register(form.id)} />
          </div>
        );
      } else if (form.type === 'SELECT') {
        return (
          <div key={form.id}>
            <label>{form.label}</label>
            <select {...register(form.id)}>
              {form.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      } else {
        return null;
      }
    },
    [register],
  );

  return (
    <div className="px-4 py-6">
      <p className="font-bold">예약정보</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {forms.map(form => renderComponent(form))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
