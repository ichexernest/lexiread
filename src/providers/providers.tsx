'use client';

import { SWRConfig } from 'swr';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

const swrConfig = {
  fetcher: async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  },
  dedupingInterval: 60000,
  focusThrottleInterval: 5000,
  errorRetryCount: 3, 
  errorRetryInterval: 5000, 
  onError: (error: Error) => {
    console.error('SWR Error:', error);
  },
};

export function Providers({ children }: ProvidersProps) {
  return (
    <SWRConfig value={swrConfig}>
      {children}
    </SWRConfig>
  );
}