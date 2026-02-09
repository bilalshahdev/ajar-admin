import {
  Tooltip as TooltipComponent,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  asChild?: boolean;
}

const Tooltip = ({ children, content, asChild }: TooltipProps) => {
  const t = useTranslations();
  return (
    <TooltipProvider>
      <TooltipComponent>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{t(`translation.${content}`)}</TooltipContent>
      </TooltipComponent>
    </TooltipProvider>
  );
};

export default Tooltip;
