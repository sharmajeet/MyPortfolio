/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base origin of the backend API. Empty in dev — requests go to /api via the Vite proxy. */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
