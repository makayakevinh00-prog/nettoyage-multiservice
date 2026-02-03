import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "scale-down";
}

/**
 * OptimizedImage Component
 * 
 * Fournit :
 * - Lazy loading automatique
 * - Format WebP avec fallback
 * - Placeholder blur pendant le chargement
 * - Optimisation automatique des dimensions
 */
export default function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  objectFit = "cover",
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Générer l'URL WebP si possible
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");

  return (
    <picture>
      {/* WebP format (plus léger) */}
      <source srcSet={webpSrc} type="image/webp" />
      
      {/* Fallback JPG/PNG */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        style={{
          objectFit: objectFit,
        }}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setIsLoaded(true);
          setHasError(true);
        }}
      />

      {/* Placeholder blur pendant le chargement */}
      {!isLoaded && !hasError && (
        <div
          className={cn(
            "absolute inset-0 bg-gray-200 animate-pulse",
            className
          )}
          style={{
            width: width,
            height: height,
          }}
        />
      )}
    </picture>
  );
}
