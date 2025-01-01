import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputWithLabelProps {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
}

export function InputWithLabel({
  label,
  type,
  id,
  placeholder,
}: InputWithLabelProps) {
  return (
    <div className="grid w-full gap-1">
      <Label htmlFor={id} className="text-sm">
        {label}
      </Label>
      <Input type={type} id={id} placeholder={placeholder} />
    </div>
  );
}
