"use client";

import React from 'react';
import Image from 'next/image';

interface CustomImageProps {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, width, height, alt }) => {
  return <Image src={src} width={width} height={height} alt={alt} />;
};

export default CustomImage;