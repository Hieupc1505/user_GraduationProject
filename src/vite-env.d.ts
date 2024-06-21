/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_PROD: string;
    readonly VITE_SERVER_DEV: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
