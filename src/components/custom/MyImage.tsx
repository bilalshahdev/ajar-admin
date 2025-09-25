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
    const fileUrl = src.startsWith("/uploads");
    const isPublicPath = src.startsWith("/");

    if (fileUrl) {
      resolvedSrc = `${baseUrl}/${src}`;
    } else if (isPublicPath) {
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
