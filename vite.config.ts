import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    const SERVER_LINK =
        process.env.MODE === "production"
            ? process.env.VITE_SERVER_PROD
            : process.env.VITE_SERVER_DEV;
    return defineConfig({
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
                    target: SERVER_LINK,
                    changeOrigin: true,
                },
            },
        },
    });
};
