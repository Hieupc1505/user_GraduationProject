import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
import SignUpSide from "../components/signUpForm";
import SignInSide from "../components/signInForm";
import ActiveAccount from "../components/Active";
import VerifyEmail from "../components/VerifyEmail";
const defaultTheme = createTheme();

const layout = {
    signup: <SignUpSide />,
    signin: <SignInSide />,
    verify: <VerifyEmail />,
    active: <ActiveAccount />,
};

export default function AuthLayout({
    page,
}: {
    page: "signup" | "signin" | "verify" | "active";
}) {
    const RenderLayout = () => layout[page];

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    md={7}
                    sx={{
                        background: "#ffffff",
                    }}
                />

                <Grid
                    item
                    xs={false}
                    md={5}
                    sx={{
                        background: "#FFEDE1",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        top: "25%",
                        right: "9%",
                        width: "38%",
                        height: "68.4%",
                    }}
                >
                    <Avatar
                        src="/login/avatar.svg"
                        sx={{ width: "100%", height: "100%" }}
                        alt="logo-auth"
                        variant="square"
                    />
                </Box>
                <Grid
                    component={Paper}
                    elevation={2}
                    square
                    sx={{
                        position: "absolute",
                        backgroundColor: "#ffffff",
                        maxWidth: "598px",
                        width: "31%",
                        minHeight: "600px",
                        // height: "69%",
                        borderRadius: "20px",
                        left: "12.7%",
                        top: "15.4%",
                    }}
                >
                    <RenderLayout />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
