import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface InfoButtonProps {
  content?: React.ReactNode;
}

export function InfoButton({ content }: InfoButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
        }}
        className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 transition-colors"
      >
        <span className="sr-only">Info</span>
        <Info className="h-6 w-6" aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white text-slate-900 text-sm rounded-md shadow-lg p-3 z-50">
          {content ?? (
            <div>
              <p className="font-semibold">Quick Info</p>
              <p className="text-sm mt-1">Email: info@mox.org</p>
              <p className="text-sm">Phone: +32 123 456 789</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default InfoButton;
