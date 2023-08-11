'use client';

import AlertDialogDemo from '@/components/client/Alert';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

const ReactQueryProvider = ({ children }: Props) => {
  // queryClientOptions
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AlertDialogDemo />
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
