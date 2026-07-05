"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ImageContextType {
  getImage: (key: string, fallback: string) => string;
  setImage: (key: string, src: string) => void;
  clearImage: (key: string) => void;
}

const ImageContext = createContext<ImageContextType>({
  getImage: (_, fallback) => fallback,
  setImage: () => {},
  clearImage: () => {},
});

export function ImageProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<Record<string, string>>({});

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("custom-images");
      if (stored) setImages(JSON.parse(stored));
    } catch {}
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("custom-images", JSON.stringify(images));
    } catch {}
  }, [images]);

  const getImage = (key: string, fallback: string) => images[key] || fallback;

  const setImage = (key: string, src: string) => {
    setImages((prev) => ({ ...prev, [key]: src }));
  };

  const clearImage = (key: string) => {
    setImages((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  return (
    <ImageContext.Provider value={{ getImage, setImage, clearImage }}>
      {children}
    </ImageContext.Provider>
  );
}

export const useImages = () => useContext(ImageContext);
