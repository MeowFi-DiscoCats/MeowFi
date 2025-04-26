import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from '@/app/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { initAppKit } from '@/app/config/appkit';
import { PostHogProvider } from 'posthog-js/react';

initAppKit();
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        // debug: import.meta.env.MODE === 'development',
      }}
    >
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </PostHogProvider>
  </StrictMode>
);
