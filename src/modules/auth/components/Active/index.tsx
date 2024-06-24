import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import { authStoreText } from "../common.text";
import { useNavigate, useLocation } from "react-router-dom";
import userAPI from "~/shared/api/user.api";

export default function ActiveAccount() {
    const { lang } = useAppSelector((state: RootState) => state.mainSlice);
    const { active } = authStoreText;
    const content = active[lang];
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        const fetchData = async () => {
            await userAPI.verifyEmail(location.search);
            // console.log(location);
            navigate("/user/login");
        };
        fetchData();
    }, []);

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
        </Box>
    );
}
