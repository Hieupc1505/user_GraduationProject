const errorMessageVn = {
    formatEmail: "Định dạng email không hợp lệ.",
    requireEmail: "Vui lòng không để trống.",
    password: "Vui lòng điền mật khẩu.",
    maxLength: "Email không vượt quá 64 kí tự.",
    minLength: "Mật khẩu ít nhất 6 kí tự.",
    match: "Mật khẩu phải có ít nhất một chữ và 1 số.",
    response: "Email hoặc mật khẩu không đúng, vui lòng thử lại.",
    emailAlready: "Email đã được sử dụng.",
    verify: "Vui lòng kiểm tra địa chỉ email để kích hoặt tài khoản...",
};
const errorMessageEn = {
    formatEmail: "Invalid email.",
    requireEmail: "Please do not leave it empty.",
    password: "Please enter a password.",
    maxLength: "Email cannot exceed 64 characters.",
    minLength: "Password must be at least 6 characters.",
    match: "Password must contain at least one letter and one number.",
    response: "Email or password is incorrect, please try again.",
    emailAlready: "Email is already use.",
    verify: "Please check your email address to activate your account...",
};

// const responseError = {
//     notactive: 'Vui lòng kiểm tra email',
//     notsignup: 'Email hoặc mật khẩu không đúng!',

// }

export type KeyError =
    | "formatEmail"
    | "requireEmail"
    | "password"
    | "response"
    | "maxLength"
    | "minLength"
    | "match"
    | "verify";

export function getErrorMessageSignUp(
    code: KeyError,
    language: string
): string {
    const errorMessages = language === "en" ? errorMessageEn : errorMessageVn;
    const defaultMessage =
        language === "en" ? "Unknown error" : "Lỗi không xác định";
    return errorMessages[code] || defaultMessage;
}
