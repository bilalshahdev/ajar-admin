import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

interface MyImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
  className?: string;
}
const MyImage = ({ src, alt, className, ...rest }: MyImageProps) => {
  return <Image src={src} alt={alt} className={cn("", className)} {...rest} />;
};

export default MyImage;
