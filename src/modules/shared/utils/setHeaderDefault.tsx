import axios from "axios";

export const setHeaderDefault = (token: string | null) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export const setLanguageDefault = (lang: "en" | "vn") => {
    axios.defaults.headers.common["Accept-Language"] = lang;
};
