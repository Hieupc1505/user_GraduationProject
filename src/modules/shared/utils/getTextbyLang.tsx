import { keyProps, storeProps } from "~/product/layout/prodDetail.text";

type keyTextProps = keyProps;
type storeVnProp = storeProps;

export function getText(
    code: keyTextProps,
    storeVn: storeVnProp,
    storeEn: storeVnProp,
    language: string
): string {
    const errorMessages = language === "vn" ? storeVn : storeEn;
    const defaultMessage =
        language === "en" ? "Unknown error" : "Lỗi không xác định";
    return errorMessages[code] || defaultMessage;
}
