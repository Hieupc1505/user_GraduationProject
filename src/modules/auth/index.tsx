import AuthLayout from "./layout";
import { useParams } from "react-router-dom";
const AuthPage = () => {
    const { action } = useParams();
    return <AuthLayout action={action} />;
};

export default AuthPage;
