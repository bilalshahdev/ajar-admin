"use client";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface Props {
  addBtnTitle: string;
}
const AddButton = ({ addBtnTitle }: Props) => {
  const pathname = usePathname();
  const href = `${pathname}/add`;
  return (
    <Link href={href} className="">
      <Button variant="button">
        <Plus />
        <span className="hidden sm:inline-block capitalize">{`Add ${addBtnTitle}`}</span>
      </Button>
    </Link>
  );
};

export default AddButton;
