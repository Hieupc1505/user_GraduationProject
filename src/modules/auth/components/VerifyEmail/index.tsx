import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "~app/hooks";
import userAPI from "~/shared/api/user.api";
import { RootState } from "~app/store";
import { authStoreText } from "../common.text";
import { useNavigate, useLocation } from "react-router-dom";

interface IFormInput {
    email: string;
    password: string;
}

export default function VerifyEmail() {
    const { lang } = useAppSelector((state: RootState) => state.mainSlice);
    const { verify } = authStoreText;
    const content = verify[lang];
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    // const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

    React.useEffect(() => {
        console.log(location.pathname);
    }, [location.pathname]);

    return (
        <Box
            sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Link href="/" variant="body2">
                <Avatar
                    sx={{
                        m: 1,
                        bgcolor: "secondary.main",
                        height: "60px",
                        width: "60px",
                    }}
                    src="/imgs/y-light2.png"
                    alt="logo"
                    variant="square"
                />
            </Link>
            <Box sx={{ alignSelf: "flex-start" }}>
                <Typography
                    variant="body2"
                    color={"#000000"}
                    sx={{ opacity: ".5" }}
                >
                    {content["ask"]}
                </Typography>
                <Typography
                    component="h1"
                    sx={{ color: "#000000" }}
                    fontWeight={"bold"}
                    variant="h3"
                    textAlign={"left"}
                    mt={1.6}
                >
                    {content["title"]}
                </Typography>
            </Box>
            <Box
                sx={{
                    mt: 1,
                }}
            >
                <Typography>{content["des"]}</Typography>
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
                mt={2}
            >
                <Link href="/">Trang trủ</Link>
                <Link href="/user/login">Đăng nhập</Link>
            </Box>
        </Box>
    );
}

const ArrowIcon = <Avatar src="/imgs/arrow.svg" />;
