// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_REOWN_PROJECT_ID: string;
  readonly VITE_ALCHEMY_URL: string;
  readonly VITE_PUBLIC_POSTHOG_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
