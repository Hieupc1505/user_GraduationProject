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
                "Bạn Mới Biết Đến Y&M",
                "Đăng Ký",
            ],
        },
        en: {
            title: "Sign In",
            input: ["Enter your Email", "Password"],
            nav: [
                "Forgot password",
                "Sign in with SMS",
                "Sing In",
                "OR",
                "Have you just discovered Y&M?",
                "Sing Up",
            ],
        },
    },
    signUpText: {
        vn: {
            title: "Đăng Ký",
            input: ["Nhập địa chỉ Email", "Mật Khẩu"],
            nav: ["Đăng Ký", "Hoặc", "Bạn đã có tài khản Y&M?", "Đăng Nhập"],
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
        },
    },
};
