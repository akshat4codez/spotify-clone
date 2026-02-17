import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn('w-full rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm outline-none placeholder:text-white/50 focus:border-spotify-accent', className)}
    {...props}
  />
));
Input.displayName = 'Input';
