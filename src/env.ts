const env: ENVTYPE = {
    NODE_ENV: import.meta.env.MODE,
    SERVER: {
        PROD: import.meta.env.VITE_SERVER_PROD,
        DEV: import.meta.env.VITE_SERVER_DEV,
    },
};

export default env;

interface ENVTYPE {
    NODE_ENV: string;
    SERVER: {
        PROD: string;
        DEV: string;
    };
}
