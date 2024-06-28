import { useState, useCallback, useEffect } from "react";
import {
    Box,
    Divider,
    FormGroup,
    Typography,
    Checkbox,
    FormControlLabel,
    FormControl,
    Button,
    Grid,
    Slider,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormLabel from "@mui/material/FormLabel";
import React from "react";
import CustomTextField from "../CustomTextfield";
import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import CustomAutoplete from "../CustomAutoplete";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { getTextInfo } from "./info.text";
// import Upload from "../UploadImage/upload";
import UploadImage from "../UploadImage/upload";
import axios, { AxiosError } from "axios";

export interface IFormInput {
    name: string;
    email?: string;
    number: string;
    // gender: string;
    // birthday: string;
    address: string;
    height?: number;
    weight?: number;
    // otp?: number;
}

// interface IFormInput2 {
//     name: string;
//     email: string;
//     gender: number;
//     number: ;
//     birthday: string;
//     height: number | undefined;
//     weight: number | undefined;
// }

const Info = () => {
    const [value, setValue] = React.useState("male");
    const [height, setHeight] = React.useState<number>(60);
    const [weight, setWeight] = React.useState<number>(50);
    const [image, setImage] = React.useState<string>("");

    const { lang } = useAppSelector((state: RootState) => state.mainSlice);

    const phoneRegExp = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required(getTextInfo("required", lang))
            .max(64, getTextInfo("maxLength", lang)),
        email: Yup.string().max(64, getTextInfo("maxLength", lang)),

        number: Yup.string()
            .required(getTextInfo("required", lang))
            .matches(phoneRegExp, getTextInfo("match", lang)),
        height: Yup.number(),
        weight: Yup.number(),
        address: Yup.string().required(getTextInfo("required", lang)),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { user } = useAppSelector((state: RootState) => state.userReducer);

    const handleImage = (file: string) => {
        setImage(file);
    };

    const onSubmit: SubmitHandler<IFormInput> = async (form) => {
        const { data } = await axios.post("/api/v1/auth/user/update", {
            data: {
                address: form["address"],
                number: +form["number"],
                displayName: form["name"],
            },
            avatar: image,
            now: user?.userInfo.avatar,
        });
        if (data && data.success) {
            console.log(data);
        }
    };

    const handleChangeR = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const handleSliderChange = (event: Event, newheight: number | number[]) => {
        setHeight(newheight as number);
    };

    const handleSlider2Change = (
        event: Event,
        newheight: number | number[]
    ) => {
        setWeight(newheight as number);
    };
    const [date, setDate] = useState<string[]>(["", "", ""]);
    const handleDate = useCallback((label: string, val: string | null) => {
        setDate((prevDate) => {
            if (label === "day" && val) {
                return [val, ...prevDate.slice(1)];
            }
            if (label === "month" && val) {
                return [...prevDate.slice(0, 1), val, ...prevDate.slice(2)];
            }
            if (label === "year" && val) {
                return [...prevDate.slice(0, 2), val];
            }
            return prevDate;
        });
    }, []);

    return (
        <Box>
            <Box sx={{}}>
                <Typography variant="h6">Thông tin tài khoản</Typography>
                <Typography>
                    Bạn có thể thay đổi thông tin tài khoản ở đây.
                </Typography>
            </Box>
            <Divider sx={{ my: 3.75 }} />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box width={"50%"}>
                    <Typography>Thông tin đăng nhập</Typography>
                    <Typography
                        component="span"
                        variant="subtitle1"
                        sx={{ mt: "8px" }}
                    >
                        Email:{" "}
                    </Typography>
                    <Typography component={"span"} sx={{ fontWeight: "bold" }}>
                        {user?.email}
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Thay đổi mật khẩu"
                        />
                    </FormGroup>
                </Box>
                <Box width={"50%"}>
                    <Typography>Thông tin cá nhân</Typography>
                    {user && (
                        <UploadImage
                            url={user.userInfo.avatar}
                            changeImage={handleImage}
                        />
                    )}

                    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                        {/* <Box
                                sx={{
                                    display: "flex",
                                    gap: "6px",
                                    justifyContent: "space-around",
                                }}
                            >
                                
                                <CustomTextField
                                    helperText="Họ"
                                    required
                                    name={"firstname"}
                                    register={register}
                                    errors={errors}
                                />
                                <CustomTextField
                                    helperText="Tên"
                                    required
                                    name={"lastname"}
                                    register={register}
                                    errors={errors}
                                />
                            </Box> */}
                        {user && (
                            <>
                                <CustomTextField
                                    helperText="name"
                                    required
                                    name={"name"}
                                    register={register}
                                    errors={errors}
                                    value={user.userInfo?.displayName}
                                />

                                <CustomTextField
                                    // required
                                    helperText="Email"
                                    name="email"
                                    register={register}
                                    errors={errors}
                                    disabled
                                    value={user.email}
                                />
                                <CustomTextField
                                    required
                                    helperText="Số điện thoại"
                                    name="number"
                                    register={register}
                                    errors={errors}
                                    value={
                                        user?.userInfo?.number
                                            ? "0" + user.userInfo.number
                                            : ""
                                    }
                                />
                                <CustomTextField
                                    required
                                    helperText="Địa chỉ"
                                    name="address"
                                    register={register}
                                    errors={errors}
                                    value={user?.userInfo?.address}
                                />
                            </>
                        )}

                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">
                                Gender
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChangeR}
                                row
                            >
                                <FormControlLabel
                                    value="male"
                                    control={<Radio />}
                                    label="Male"
                                />
                                <FormControlLabel
                                    value="female"
                                    control={<Radio />}
                                    label="Female"
                                />
                            </RadioGroup>
                        </FormControl>
                        <FormGroup row>
                            <CustomAutoplete
                                data={Array.from({ length: 31 }).map(
                                    (i, d) => d + 1 + ""
                                )}
                                sx={{ mr: "20px" }}
                                label="Ngày"
                                id={"day"}
                                callback={handleDate}
                            />
                            <CustomAutoplete
                                data={Array.from({ length: 12 }).map(
                                    (i, d) => d + 1 + ""
                                )}
                                sx={{ mr: "20px", minWidth: "100px" }}
                                label="Tháng"
                                id={"month"}
                                callback={handleDate}
                            />
                            <CustomAutoplete
                                data={Array.from({ length: 100 }).map(
                                    (i, d) => 2024 - d + ""
                                )}
                                sx={{ mr: "20px", minWidth: "130px" }}
                                label="Năm"
                                id={"year"}
                                callback={handleDate}
                            />
                            {/* <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={Array.from({ length: 31 }).map(
                                    (i, d) => ({ label: d + 1 + "" })
                                )}
                                sx={{ mr: "20px" }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Ngày" />
                                )}
                            /> */}
                            {/* <Autocomplete
                                disablePortal
                                id="combo-box-month"
                                options={Array.from({ length: 12 }).map(
                                    (i, d) => ({ label: d + 1 + "" })
                                )}
                                sx={{ mr: "20px", minWidth: "100px" }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Tháng" />
                                )}
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box-yearr"
                                options={Array.from({ length: 100 }).map(
                                    (i, d) => ({ label: 2024 - d + "" })
                                )}
                                sx={{ mr: "20px", minWidth: "140px" }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Năm" />
                                )}
                            /> */}
                        </FormGroup>
                        <FormGroup>
                            <Typography id="input-slider" gutterBottom>
                                Chiều cao
                            </Typography>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs>
                                    <Slider
                                        value={
                                            typeof height === "number"
                                                ? height
                                                : 0
                                        }
                                        onChange={handleSliderChange}
                                        aria-labelledby="input-slider"
                                    />
                                </Grid>
                                <Grid item sx={{ mb: "10px" }}>
                                    <Typography>{height + 100} cm</Typography>
                                </Grid>
                            </Grid>
                        </FormGroup>
                        <FormGroup>
                            <Typography id="input-slider" gutterBottom>
                                Cân Nặng
                            </Typography>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs>
                                    <Slider
                                        value={
                                            typeof weight === "number"
                                                ? weight
                                                : 0
                                        }
                                        onChange={handleSlider2Change}
                                        aria-labelledby="input-slider"
                                    />
                                </Grid>
                                <Grid item sx={{ mb: "10px" }}>
                                    <Typography>{weight} kg</Typography>
                                </Grid>
                            </Grid>
                        </FormGroup>
                        <Box>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ width: "100%", mt: "34px", py: 2 }}
                            >
                                Cập nhập thông tin
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Info;
