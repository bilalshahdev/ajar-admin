import { baseUrl } from "@/config/constants";
import { cn } from "@/lib/utils";
import Image, { ImageProps, StaticImageData } from "next/image";

interface MyImageProps extends Omit<ImageProps, "src"> {
  src: string | StaticImageData | File;
  alt: string;
  className?: string;
}

const MyImage = ({ src, alt, className, ...rest }: MyImageProps) => {
  let resolvedSrc: string | StaticImageData = src as any;

  if (typeof src === "string") {
    const isFileObjectUrl = src.startsWith("blob:");
    const isAbsoluteUrl = src.startsWith("http");
    const isPublicPath = src.startsWith("/");

    if (isPublicPath) {
      // It's in the public folder, don't modify
      resolvedSrc = src;
    } else if (!isFileObjectUrl && !isAbsoluteUrl) {
      // Relative path like 'uploads/image.jpg'
      resolvedSrc = `${baseUrl}/${src}`;
    } else {
      // Already full URL
      resolvedSrc = src;
    }
  } else if (src instanceof File) {
    resolvedSrc = URL.createObjectURL(src);
  }

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
