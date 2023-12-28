import React from "react";

const lib = {
    en: ["en-US", "USD"],
    vn: ["vi-VN", "VND"],
};

export const convertMoney = (number: number, unit: "en" | "vn") => {
    const store = lib[unit];
    return number.toLocaleString(store[0], {
        style: "currency",
        currency: store[1],
    });
};
