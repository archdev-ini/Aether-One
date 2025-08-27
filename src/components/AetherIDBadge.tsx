import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function AetherIDBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...props}
      className={cn('fill-current', props.className)}
    >
      <title>Aether ID Badge</title>
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g>
        <path
          d="M50,5 L95,27.5 L95,72.5 L50,95 L5,72.5 L5,27.5 Z"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M50,28 L72.5,40.25 L72.5,64.75 L50,77 L27.5,64.75 L27.5,40.25 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="50" cy="52.5" r="8" fill="currentColor" />
      </g>
    </svg>
  );
}
