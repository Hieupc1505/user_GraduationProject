const errorMessageVn = {
    formatEmail: "Email không hợp lệ",
    requireEmail: "Vui lòng không để trống",
    password: "Vui lòng điền mật khẩu",
    response: "Email hoặc mật khẩu không đúng, vui lòng thử lại",
};

const errorMessageEn = {
    formatEmail: "Invalid email",
    requireEmail: "Please fill in the email",
    password: "Please enter the password",
    response: "Email or password is incorrect, please try again",
};

// const responseError = {
//     notactive: 'Vui lòng kiểm tra email',
//     notsignup: 'Email hoặc mật khẩu không đúng!',

// }

export type KeyError = "formatEmail" | "requireEmail" | "password" | "response";

export function getErrorMessage(code: KeyError, language: string): string {
    const errorMessages = language === "en" ? errorMessageEn : errorMessageVn;
    const defaultMessage =
        language === "en" ? "Unknown error" : "Lỗi không xác định";
    return errorMessages[code] || defaultMessage;
}
