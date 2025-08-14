"use client";

import { Small } from "@/components/Typography";
import { businessNavMenu } from "@/config/menu";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BusinessNavMenu = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const isMenuActive = (path: string) => {
    const targetPath = `/${locale}/business-settings${
      path === "/" ? "" : path
    }`;
    return pathname === targetPath
      ? "bg-gradient-to-l from-blue-500 to-aqua bg-clip-text text-transparent"
      : "hover:bg-gradient-to-l hover:from-blue hover:to-aqua hover:bg-clip-text hover:text-transparent transition";
  };

  const handleSelectChange = (value: string) => {
    router.push(`/${locale}/business-settings${value}`);
  };

  return (
    <div className="">
      {/* Web view */}
      <div className="hidden w-full md:flex justify-between p-4 bg-primary-foreground rounded-md">
        {businessNavMenu.map((item) => (
          <Link
            key={item.label}
            href={`/${locale}/business-settings${item.href}`}
          >
            <Small className={cn("", isMenuActive(item.href))}>
              {item.label}
            </Small>
          </Link>
        ))}
      </div>

      {/* Mobile view */}
      <div className="block md:hidden">
        <Select
          onValueChange={handleSelectChange}
          defaultValue={
            businessNavMenu.find((item) => pathname.endsWith(item.href))
              ?.href || "/"
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            {businessNavMenu.map((item) => (
              <SelectItem key={item.label} value={item.href}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BusinessNavMenu;
