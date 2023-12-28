import React from "react";
import SignInForm from "../components/signInForm";
import SignUpForm from "../components/signUpForm";
type AuthPageProps = {
    action: string | undefined;
};

const AuthLayout = ({ action }: AuthPageProps) => {
    return (
        <div>
            {action === "sign-in" && <SignInForm />}
            {action === "sign-up" && <SignUpForm />}
        </div>
    );
};

export default AuthLayout;
