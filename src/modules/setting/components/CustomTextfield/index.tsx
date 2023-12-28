import React, { ReactNode } from "react";
import {
    FormControl,
    FormHelperText,
    Typography,
    TextField,
    InputAdornment,
    SxProps,
} from "@mui/material";
import { IFormInput } from "../Info";
import { FieldErrors } from "react-hook-form";

interface CustomTextField {
    label?: string;
    name: string;
    helperText?: string;
    required?: boolean;
    endIcon?: ReactNode;
    startIcon?: ReactNode;
    register?: any;
    disabled?: boolean;
    sx?: SxProps;
    value?: string;
    errors?: FieldErrors<IFormInput>;
}

const CustomTextField = ({
    label,
    helperText,
    required = false,
    name,
    endIcon,
    startIcon,
    register = () => {
        return;
    },
    disabled,
    sx,
    value,
    errors,
}: // errors,
CustomTextField) => {
    const handelInputProps = () => {
        if (endIcon)
            return {
                endAdornment: (
                    <InputAdornment position="end">{endIcon}</InputAdornment>
                ),
            };
        if (startIcon)
            return {
                startAdornment: (
                    <InputAdornment position="end">{endIcon}</InputAdornment>
                ),
            };
        return {};
    };

    return (
        <FormControl sx={{ width: "100%", ...sx }}>
            {!label && (
                <FormHelperText id={label} sx={{ mx: 0 }}>
                    {helperText}{" "}
                    {required && (
                        <Typography component={"span"} color={"red"}>
                            *
                        </Typography>
                    )}
                </FormHelperText>
            )}

            <TextField
                required
                id="outlined-required"
                label={label}
                // name={name}
                defaultValue={value}
                InputProps={handelInputProps()}
                disabled={disabled}
                {...register(name)}
                error={
                    errors && errors[name as keyof IFormInput] ? true : false
                }
                helperText={errors && errors[name as keyof IFormInput]?.message}
            />
        </FormControl>
    );
};

export default React.memo(CustomTextField);
