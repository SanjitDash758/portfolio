// components/BrandIcons.tsx
// Lucide v1 removed all brand icons due to legal and trademark concerns.
// This file provides local SVG versions of those icons.

import React from "react";

type IconProps = {
  size?: number;
  className?: string;
};

export function Github({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.5.2 2.7.1 3a3.3 3.3 0 0 1 1.2 3.2c0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2.2v3.2c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

export function Linkedin({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.5 2h-17C2.1 2 1 3.1 1 4.5v15C1 20.9 2.1 22 3.5 22h17c1.4 0 2.5-1.1 2.5-2.5v-15C23 3.1 21.9 2 20.5 2zM8 19H5V9h3v10zM6.5 7.7C5.5 7.7 4.7 6.9 4.7 6s.8-1.7 1.8-1.7 1.8.8 1.8 1.7-.8 1.7-1.8 1.7zM19 19h-3v-5.3c0-1.3-.5-2.1-1.6-2.1-.9 0-1.4.6-1.6 1.2-.1.2-.1.5-.1.8V19h-3V9h3v1.3c.4-.6 1.1-1.5 2.7-1.5 2 0 3.5 1.3 3.5 4.1V19z" />
    </svg>
  );
}

export function Twitter({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.2 2h-3.4l-4 4.8L7.4 2H1l6.5 8.7L1 22h3.4l4.2-5.1L13.1 22H19.5l-6.8-9.2L18.2 2zm-1.5 18.2l-3.9-5.2-2.8 3.4H6.5l3.5-4.2L5 3.8h4.7l3.5 4.7 2.6-3.1h2.1l-3.2 3.9 4.5 6.1h-4.5z" />
    </svg>
  );
}
