'use client';

import AlertDialogDemo from '@/components/client/Alert';
import { queryClientOptions } from '@/utils/constatns';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

const ReactQueryProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));
  return (
    <QueryClientProvider client={queryClient}>
      <AlertDialogDemo />
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
