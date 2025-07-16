import { cn } from "@/lib/utils";
import Image, { ImageProps, StaticImageData } from "next/image";

interface MyImageProps extends Omit<ImageProps, "src"> {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  remoteUrl?: boolean;
}
const MyImage = ({ src, alt, className, remoteUrl, ...rest }: MyImageProps) => {
  return <Image src={src} alt={alt} className={cn("", className)} {...rest} />;
};

export default MyImage;
