import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), "");

    return {
        // vite config
        plugins: [react()],
        resolve: {
            alias: {
                "~": path.resolve(__dirname, "./src/modules/"),
                "~app": path.resolve(__dirname, "./src/"),
            },
        },
        server: {
            proxy: {
                "^/api/.*": {
                    target:
                        env.NODE_ENV === "production"
                            ? env.VITE_SERVER_PROD
                            : env.VITE_SERVER_DEV,
                    changeOrigin: true,
                },
            },
        },
        define: {
            VITE_SERVER_DEV: JSON.stringify(env.VITE_SERVER_DEV),
        },
    };
});
