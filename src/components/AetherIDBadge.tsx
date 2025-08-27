import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function AetherIDBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      {...props}
      className={cn("text-primary", props.className)}
    >
      <title>Aether ID</title>
      <path
        d="M50 2.5L95.5 26.25V73.75L50 97.5L4.5 73.75V26.25L50 2.5Z"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path
        d="M50 28.125L77.75 43.75V75L50 90.625L22.25 75V43.75L50 28.125Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeOpacity="0.75"
      />
      <circle cx="50" cy="50" r="10" fill="currentColor" />
    </svg>
  );
}
