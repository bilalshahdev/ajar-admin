// ReusableSelect.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

interface BxSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function BxSelect({
  options,
  value,
  onChange,
  placeholder = "Select option",
  className = "w-[180px] capitalize",
}: BxSelectProps) {
  const t = useTranslations();
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="capitalize">
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {t(`translation.${option}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
