import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputWithLabelProps {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
}

export const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  type,
  id,
  placeholder,
}) => {
  return (
    <div className="grid w-full gap-1">
      <Label htmlFor={id} className="text-sm">
        {label}
      </Label>
      <Input type={type} id={id} placeholder={placeholder} />
    </div>
  );
};
