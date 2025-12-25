"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image, { ImageProps, StaticImageData } from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";

interface MyImageProps extends Omit<ImageProps, "src"> {
  src?: string | StaticImageData | File | null;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  fallbackText?: string;
}

const MyImage = ({
  src,
  alt,
  className,
  fallbackSrc = "/images/fallback.png",
  fallbackText,
  ...rest
}: MyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(!src);

  const resolvedSrc = getImageUrl(src as string | File | null);

  if (isError || !resolvedSrc) {
    if (fallbackText) {
      return (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-medium",
            className
          )}
        >
          {fallbackText}
        </div>
      );
    }

    return (
      <Image
        src={fallbackSrc}
        alt={alt}
        className={cn("object-cover rounded-full", className)}
        {...rest}
      />
    );
  }

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      className={cn("object-cover rounded-full", className)}
      onLoadingComplete={() => setIsLoading(false)}
      onError={() => {
        setIsError(true);
        setIsLoading(false);
      }}
      {...rest}
    />
  );
};

export default MyImage;
