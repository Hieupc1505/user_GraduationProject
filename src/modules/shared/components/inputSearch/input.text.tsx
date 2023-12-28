export const InputTextStore = {
    inputReplaceHolder: {
        vn: "Tìm kiếm...",
        en: "Search...",
    },
};

const tooltipVn = {
    settings: "Cài Đặt",
    liked: "Đã Thích",
    cart: "Giỏ Hàng",
    mode: "Chủ Để",
    lang: "English",
};

const tooltipEn = {
    settings: "settings",
    liked: "liked",
    cart: "cart",
    mode: "Mode Theme",
    lang: "Tiếng Việt",
};

export type TooltipProps = "settings" | "liked" | "cart" | "mode" | "lang";

export function getMessageTooltip(
    code: TooltipProps,
    language: string
): string {
    const errorMessages = language === "en" ? tooltipEn : tooltipVn;

    return errorMessages[code];
}
