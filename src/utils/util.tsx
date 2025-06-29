import React, { useState } from "react";
import { Check, User } from "lucide-react";
import type { Role } from "../types/settings";

export const generateAvatars = (
  images: string[] | undefined
): React.ReactNode[] => {
  if (!images) return [];

  return images.slice(0, Math.min(images.length, 4)).map((imageUrl, i) => {
    // Use React hooks for image loading state
    const ImageWithPlaceholder = () => {
      const [isLoading, setIsLoading] = useState(true);
      const [hasError, setHasError] = useState(false);

      return (
        <div className="relative w-8 h-8 md:w-10 md:h-10 -ml-2 first:ml-0">
          {/* Placeholder shown while loading or on error */}
          {(isLoading || hasError) && (
            <div className="absolute inset-0 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
              <User size={16} className="text-gray-500" />
            </div>
          )}

          <img
            src={imageUrl}
            alt={`User ${i + 1}`}
            className={`w-full h-full rounded-full object-cover border-2 border-white ${
              isLoading || hasError ? "opacity-0" : "opacity-100"
            } transition-opacity duration-300`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        </div>
      );
    };

    return <ImageWithPlaceholder key={i} />;
  });
};

export const getStatusColor = (status: Role["status"]) =>
  ({
    Active: {
      color: "bg-green-100 text-green-800",
      icon: <Check size={14} className="mr-1" />,
    },
  }[status] ?? { color: "bg-orange-100 text-orange-800", icon: null });
