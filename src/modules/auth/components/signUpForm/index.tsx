import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

// import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "~app/hooks";
import { changeStatusLoad } from "~/shared/store/userSlice";
import userAPI from "~/shared/api/user.api";
import { type } from "~/shared/store/type.store";
import { RootState } from "~app/store";
import { changeStatus } from "~/shared/store/snackbar";
import { getErrorMessageSignUp } from "./signup.text";
import { authStoreText } from "../common.text";
import { useNavigate, useLocation } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormControl } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";

import { grey } from "@mui/material/colors";

interface IFormInput {
    email: string;
    password: string;
}

export default function SignUpSide() {
    const { lang } = useAppSelector((state: RootState) => state.mainSlice);
    const { signUpText } = authStoreText;
    const content = signUpText[lang];
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();
    // const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(getErrorMessageSignUp("formatEmail", lang))
            .required(getErrorMessageSignUp("requireEmail", lang)),
        password: Yup.string().required(
            getErrorMessageSignUp("password", lang)
        ),
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
        setLoading(true);
        const res = await userAPI.signup(data);

        if (res && res.success === true) {
            console.log("login success");
            setLoading(false);
            navigate("/user/register/next");
        } else {
            // dispatch(userError({ error: res }));
            setLoading(false);
            dispatch(
                changeStatus({
                    open: true,
                    status: "error",
                    message: getErrorMessageSignUp("response", lang),
                })
            );
        }
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

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
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    mt: 1,
                }}
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
                    sx={{
                        mb: 2.5,
                        "& input": { bgcolor: "#FFF6F4" },
                    }}
                />
                <FormControl fullWidth variant="outlined">
                    <InputLabel
                        htmlFor="outlined-adornment-password"
                        error={errors.password || open ? true : false}
                    >
                        {content["input"][1]}
                    </InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        error={errors.password || open ? true : false}
                        {...register("password")}
                        sx={{ bgcolor: "#FFF6F4" }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
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
                    {errors.password && (
                        <FormHelperText error id="accountId-error">
                            {errors.password?.message}
                        </FormHelperText>
                    )}
                </FormControl>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                    mt={2.5}
                    mb={2}
                >
                    <Button
                        disabled={loading ? true : false}
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 2.5,
                            mb: 2,
                            bgcolor: "#F47458",
                            borderRadius: "23px",
                            p: "8px 16px",
                            "&:hover": {
                                opacity: 0.9,
                                bgcolor: "#F47458",
                            },
                        }}
                        endIcon={
                            <Avatar
                                src="/imgs/arrow.svg"
                                alt="signup"
                                sx={{
                                    width: "24px",
                                    height: "24px",
                                }}
                            />
                        }
                    >
                        {content["title"]}
                    </Button>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="body2" color={grey[500]}>
                        {content["nav"][2]}
                    </Typography>
                    <Link href="/user/login" variant="body2">
                        {content["nav"][3]}
                    </Link>
                </Box>

                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
        </Box>
    );
}

const ArrowIcon = <Avatar src="/imgs/arrow.svg" />;
