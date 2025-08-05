import { baseUrl } from "@/config/constants";
import { cn } from "@/lib/utils";
import Image, { ImageProps, StaticImageData } from "next/image";

interface MyImageProps extends Omit<ImageProps, "src"> {
  src: string | StaticImageData;
  alt: string;
  className?: string;
}

const MyImage = ({ src, alt, className, ...rest }: MyImageProps) => {
  let resolvedSrc: string | StaticImageData = src;

  if (typeof src === "string") {
    const isFileObjectUrl = src.startsWith("blob:");
    const isAbsoluteUrl = src.startsWith("http");

    // Force base URL even for slash-prefixed paths
    if (!isFileObjectUrl && !isAbsoluteUrl) {
      const trimmed = src.startsWith("/") ? src.slice(1) : src;
      resolvedSrc = `${baseUrl}/${trimmed}`;
    } else {
      resolvedSrc = src;
    }
  }

  console.log(resolvedSrc);

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      className={cn("", className)}
      {...rest}
    />
  );
};

export default MyImage;
