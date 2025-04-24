import { usePostHog } from 'posthog-js/react';
import { AppRoutes } from './routes';
import { useEffect } from 'react';

function App() {
  const posthog = usePostHog();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (!ref) return;
    posthog.register({ ref });
    posthog.capture('landing_with_ref', { ref });
    posthog.identify();
    posthog.people.set({ ref });
  }, [posthog]);
  return <AppRoutes />;
}

export default App;
