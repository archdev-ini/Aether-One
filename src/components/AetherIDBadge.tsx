import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function AetherIDBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      {...props}
      className={cn("text-primary", props.className)}
    >
      <title>Aether ID</title>
      {/* Outer hexagon */}
      <path d="M50 2.5 L93.3 26.25 V 73.75 L50 97.5 L6.7 73.75 V 26.25 Z" />
      {/* Inner 'A' shape - abstract */}
      <path d="M50 25 L25 75" />
      <path d="M50 25 L75 75" />
      <path d="M37.5 50 L62.5 50" />
    </svg>
  );
}
