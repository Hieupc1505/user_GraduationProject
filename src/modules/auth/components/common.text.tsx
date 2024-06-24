export interface signInItemProps {
    title: string;
    input: string[];
    nav: string[];
}

export interface singInProps {
    vn: signInItemProps;
    en: signInItemProps;
}

export const authStoreText = {
    signInText: {
        vn: {
            title: "Đăng Nhập",
            input: ["Nhập địa chỉ Email", "Mật Khẩu"],
            nav: [
                "Quên mật khẩu",
                "Đăng Nhập với SMS",
                "Đăng Nhập",
                "Hoặc",
                "Tôi chưa có tài khoản Y&M?",
                "Đăng ký",
            ],
            rem: "Lưu phiên đăng nhập",
            ask: "Chào mừng trở lại!!",
        },
        en: {
            title: "Sign In",
            input: ["Enter your Email", "Password"],
            nav: [
                "Forgot password",
                "Sign in with SMS",
                "Sing In",
                "OR",
                "I don't have an account Y&M?",
                "Sing Up",
            ],
            rem: "Remember me",
            ask: "Wellcome back!!",
        },
    },
    signUpText: {
        vn: {
            title: "Đăng ký",
            input: ["Nhập địa chỉ Email", "Mật Khẩu"],
            nav: ["Đăng ký", "Hoặc", "Bạn đã có tài khản Y&M?", "Đăng Nhập"],
            ask: "Chào mừng trở lại!!",
        },
        en: {
            title: "Sign Up",
            input: ["Enter your Email", "Password"],
            nav: [
                "Sing Up",
                "OR",
                "You already have an account with Y&M?",
                "Sing In",
            ],
            ask: "Wellcome back!!",
        },
    },
    verify: {
        vn: {
            title: "Xác thực email",
            des: "Vui lòng xác thực email của bạn để hoàn tất đăng ký. Hãy kiểm tra email của bạn.",
            ask: "Chào mừng trở lại!!",
        },
        en: {
            title: "Verify your email",
            des: "Please verify your email to complete registration. Please check your email.",
            ask: "Wellcome back!!",
        },
    },
    active: {
        vn: {
            title: "Kích hoạt tài khoản",
            des: "Đang xử lý...",
            ask: "Vui lòng chờ",
        },
        en: {
            ask: "Please waitting",
            title: "Active Account",
            des: "Processing...",
        },
    },
};
