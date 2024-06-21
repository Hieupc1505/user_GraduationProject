import React, { ReactEventHandler, FormEvent, useState } from "react";
import { Button, Grid, Link as LinkUI } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Divider } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import userAPI from "~/shared/api/user.api";
import { changeStatus } from "~/shared/store/snackbar";
import { useAppDispatch, useAppSelector } from "~app/hooks";
import { getErrorMessageSignUp } from "./signup.text";
import { Link as LinkRoute } from "@mui/material";

//new
import handleSignInWithFireBaseGoogle from "~/shared/utils/handleSignInWithGoogle";

interface IFormInput {
    email: string;
    password: string;
}
import { signInItemProps } from "../AuthUser/auth.text";
import { RootState } from "~app/store";
interface signUpPageProps {
    lang: "en" | "vn";
    signOption: (val: number) => void;
    content: signInItemProps;
}
const SignUp = ({ lang, signOption, content }: signUpPageProps) => {
    const [verify, setVerify] = useState(false);
    const dispatch = useAppDispatch();
    const { open } = useAppSelector((state: RootState) => state.snackbar);
    // const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const validationSchema = Yup.object().shape({
        // email: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
        email: Yup.string()
            .required(getErrorMessageSignUp("requireEmail", lang))
            .email(getErrorMessageSignUp("formatEmail", lang))
            .max(64, getErrorMessageSignUp("maxLength", lang)),
        password: Yup.string()
            .required(getErrorMessageSignUp("password", lang))
            .min(6, getErrorMessageSignUp("minLength", lang))
            .max(16, getErrorMessageSignUp("maxLength", lang))
            .matches(/\d/ || /[a-zA-Z]/, getErrorMessageSignUp("match", lang)),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        // const result = await userAPI.signup(data);
        setVerify(true);
        // if (result?.success) {
        //     alert("Đăng ký thành công");
        // } else {
        //     dispatch(
        //         changeStatus({
        //             open: true,
        //             message: getErrorMessageSignUp(result, lang),
        //             status: "error",
        //         })
        //     );
        // }
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    const handleChagnePageToSignIn = () => {
        signOption(0);
    };
    // console.log(errors);
    return (
        <Box>
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    bgcolor: "background.paper",
                    pb: 3.5,
                    pt: 2.5,
                    width: "444px",
                    minHeight: "495px",
                }}
            >
                <CssBaseline />
                {!verify && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        {/* <Typography
                        component="h1"
                        variant="h5"
                        color={"text.primary"}
                    >
                        Sign in
                    </Typography> */}
                        <Box
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            sx={{ mt: 1, width: "100%" }}
                        >
                            <TextField
                                placeholder="vd: abcxyz@gmail.com"
                                label={content["input"][0]}
                                required
                                fullWidth
                                autoFocus
                                {...register("email")}
                                error={errors.email || open ? true : false}
                                helperText={errors.email?.message}
                            />
                            <FormControl
                                sx={{ mt: 1.5 }}
                                variant="outlined"
                                fullWidth
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    {content["input"][1]}
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? "text" : "password"}
                                    error={
                                        errors.password || open ? true : false
                                    }
                                    {...register("password")}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                                {errors?.password && (
                                    <Typography
                                        variant="caption"
                                        color={"error"}
                                    >
                                        {errors?.password.message}
                                    </Typography>
                                )}
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {content["nav"][0]}
                            </Button>
                        </Box>
                        <Divider
                            flexItem
                            sx={{
                                color: "text.disabled",
                                fontSize: "caption.fontSize",
                                my: 1,
                            }}
                        >
                            {content["nav"][1]}
                        </Divider>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                mt: 2,
                                width: "100%",
                            }}
                        >
                            <Button
                                startIcon={<FacebookOutlinedIcon />}
                                variant="outlined"
                                sx={{ flex: 1 }}
                            >
                                Google
                            </Button>
                            <Button
                                startIcon={<GoogleIcon />}
                                variant="outlined"
                                sx={{ flex: 1 }}
                            >
                                FaceBook
                            </Button>
                        </Box>
                        <Typography
                            variant="caption"
                            color={"text.secondary"}
                            mt={3.75}
                        >
                            {content["nav"][2]}
                            <Typography
                                variant="caption"
                                component="span"
                                color={"orange.main"}
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}
                                onClick={handleChagnePageToSignIn}
                            >
                                {content["nav"][3]}
                            </Typography>
                        </Typography>
                    </Box>
                )}
                {verify && (
                    <LinkRoute
                        href="https://www.google.com/intl/vi/gmail/about/#inbox"
                        variant="body2"
                    >
                        <Typography
                            color={"primary"}
                            sx={{
                                marginTop: "150px",
                                textAlign: "center",
                            }}
                        >
                            {getErrorMessageSignUp("verify", lang)}
                        </Typography>
                    </LinkRoute>
                )}
            </Container>
        </Box>
    );
};

export default SignUp;

// TODO remove, this demo shouldn't need to reset the theme.
