import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface SelectWithLabelProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

export const SelectWithLabel: React.FC<SelectWithLabelProps> = ({
  id,
  label,
  options,
}) => {
  return (
    <div key={id}>
      <Label htmlFor={id} className="text-sm">
        {label}
      </Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="상관없음" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>옵션 선택</SelectLabel>
            {options
              .filter(option => option.value !== '')
              .map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
