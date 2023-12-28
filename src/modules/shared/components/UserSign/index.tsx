import React, { FormEvent, useEffect } from "react";
import { Button, Backdrop } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "~app/hooks";
import { userSignIn } from "~/shared/store/userAction";
import { Navigate, useNavigate } from "react-router-dom";
import { changeStatusLoad } from "~/shared/store/userSlice";
import { signInItemProps } from "../AuthUser/auth.text";
import userAPI from "~/shared/api/user.api";
import { type } from "~/shared/store/type.store";
import { RootState } from "~app/store";
import { userError } from "~/shared/store/userSlice";
import { changeStatus } from "~/shared/store/snackbar";

import { getErrorMessage } from "./userSign.text";

interface IFormInput {
    email: string;
    password: string;
}

interface signInPageProps {
    lang: "en" | "vn";
    content: signInItemProps;
    signOption: (val: number) => void;
}

const UserSign = ({ lang, content, signOption }: signInPageProps) => {
    // const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();
    // const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(getErrorMessage("formatEmail", lang))
            .required(getErrorMessage("requireEmail", lang)),
        password: Yup.string().required(getErrorMessage("password", lang)),
    });

    const { open } = useAppSelector((state: RootState) => state.snackbar);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        // dispatch(changeStatusLoad(true));
        const res = await userAPI.login(data);

        if (res && res.success === true) {
            console.log("login success");
            localStorage.setItem(type.ACESSTOKEN, res.element.tokens);
            dispatch(changeStatusLoad(false));
        } else {
            // dispatch(userError({ error: res }));
            dispatch(
                changeStatus({
                    open: true,
                    status: "error",
                    message: getErrorMessage("response", lang),
                })
            );
        }
    };

    const googleAuth = () => {
        window.open(`http://localhost:8080/api/v1/gg/google/callback`, "_self");
    };

    const handleClickChangeToSignUp = () => {
        signOption(1);
    };

    return (
        <Box>
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    bgcolor: "background.paper",
                    pb: 3.5,
                    pt: 1.5,
                }}
            >
                <CssBaseline />
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

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label={content["input"][0]}
                            autoComplete="email"
                            autoFocus
                            {...register("email")}
                            error={errors.email || open ? true : false}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label={content["input"][1]}
                            type="password"
                            autoComplete="current-password"
                            {...register("password")}
                            error={errors.password || open ? true : false}
                            helperText={errors.password?.message}
                        />
                        {/* {error && (
                            <Typography
                                sx={sxError}
                                color="error"
                                variant={"caption"}
                            >
                                {error}
                            </Typography>
                        )} */}

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="caption">
                                    {content["nav"][0]}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="caption">
                                    {content["nav"][1]}
                                </Link>
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {content["nav"][2]}
                        </Button>
                    </Box>
                    <Divider
                        flexItem
                        sx={{
                            color: "text.disabled",
                            fontSize: "caption.fontSize",
                        }}
                    >
                        {content["nav"][3]}
                    </Divider>
                    <Box sx={{ display: "flex", gap: 1, mt: 2, width: "100%" }}>
                        <Button
                            startIcon={<FacebookOutlinedIcon />}
                            variant="outlined"
                            sx={{ flex: 1 }}
                            onClick={googleAuth}
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
                        {content["nav"][4]}
                        <Typography
                            variant="caption"
                            component="span"
                            color={"orange.main"}
                            onClick={handleClickChangeToSignUp}
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            {content["nav"][5]}
                        </Typography>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default UserSign;

// TODO remove, this demo shouldn't need to reset the theme.
