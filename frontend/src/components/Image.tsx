import React from "react";
import { IKImage } from "imagekitio-react";

const VITE_IK_URL_ENDPOINT = import.meta.env.VITE_IK_URL_ENDPOINT;

interface ImageProps {
  src: string;
  className?: string;
  w?: number;
  h?: number;
  alt?: string;
}

const Image: React.FC<ImageProps> = ({ src, className, w, h, alt }) => {
  return (
    <IKImage
      urlEndpoint={VITE_IK_URL_ENDPOINT}
      path={src}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      width={w}
      height={h}
      transformation={[
        {
          width: w?.toString(),
          height: h?.toString(),
        },
      ]}
    />
  );
};

export default Image;