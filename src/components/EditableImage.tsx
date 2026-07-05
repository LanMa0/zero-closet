"use client";

import Image from "next/image";
import { useRef } from "react";
import { Camera } from "lucide-react";
import { useImages } from "@/contexts/ImageContext";

interface Props {
  imageKey: string;
  fallback: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  unoptimized?: boolean;
}

export default function EditableImage({
  imageKey,
  fallback,
  alt,
  fill,
  width,
  height,
  className = "",
  unoptimized = true,
}: Props) {
  const { getImage, setImage } = useImages();
  const inputRef = useRef<HTMLInputElement>(null);
  const src = getImage(imageKey, fallback);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(imageKey, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative group w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={className}
        unoptimized={unoptimized}
      />
      {/* Edit overlay - always visible on mobile, hover on desktop */}
      <button
        onClick={() => inputRef.current?.click()}
        className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-80 md:opacity-0 md:group-hover:opacity-80 transition-opacity z-10"
      >
        <Camera size={13} className="text-white" />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}
