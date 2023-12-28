import { getText } from "~/shared/utils/getTextbyLang";

const announcementVn = {
    required: "Vui lòng không để trống.",
    maxLength: "Không nhập quá 64 kí tự.",
    format: "Không đúng định dạng.",
    match: "Không hợp lệ vui lòng nhập lại.",
};
const announcementEn = {
    required: "Please do not leave this field empty.",
    maxLength: "Please do not exceed 64 characters.",
    format: "Invalid format.",
    match: "Invalid input, please try again.",
};

export type keyProps = "required" | "maxLength" | "format" | "match";
export interface storeProps {
    addLike: string;
    success: string;
    maxLength: string;
    format: string;
    match: string;
}

export function getTextInfo(code: keyProps, language: string): string {
    const errorMessages = language === "vn" ? announcementVn : announcementEn;
    const defaultMessage =
        language === "en" ? "Unknown error" : "Lỗi không xác định";
    return errorMessages[code] || defaultMessage;
}
