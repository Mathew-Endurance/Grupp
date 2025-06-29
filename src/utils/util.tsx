import React from "react";
import { Check } from "lucide-react";
import type { Role } from "../types/settings";

export const generateAvatars = (
  images: string[] | undefined
): React.ReactNode[] => {
  if (!images) return [];

  return images
    .slice(0, Math.min(images.length, 4))
    .map((imageUrl, i) => (
      <img
        key={i}
        src={imageUrl}
        alt={`User ${i + 1}`}
        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover -ml-2 first:ml-0 border-2 border-white"
      />
    ));
};

export const getStatusColor = (status: Role["status"]) =>
  ({
    Active: {
      color: "bg-green-100 text-green-800",
      icon: <Check size={14} className="mr-1" />,
    },
  }[status] ?? { color: "bg-orange-100 text-orange-800", icon: null });
