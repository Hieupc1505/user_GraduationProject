import React, { lazy, useEffect, useState } from "react";
import {
    Avatar,
    Box,
    InputLabel,
    Typography,
    Stack,
    Dialog,
    SxProps,
} from "@mui/material";

export const renderTextField = (
    label: string,
    content: string,
    index: number,
    sx?: SxProps
) => (
    <Box key={index} component={"section"} sx={{ mb: 3 }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
            {label}
        </InputLabel>
        <Typography sx={sx} component={"span"} variant="h5">
            {content}
        </Typography>
    </Box>
);

export const renderImages = (
    { main, list }: { main: string; list: string },
    index: number
) => (
    <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ mb: 3, mt: 2.5 }}
    >
        <Avatar
            sx={{ width: "200px", height: "200px" }}
            key={index}
            src={main}
            variant="square"
        />
        {!!list.length && (
            <InputLabel
                sx={{ mt: 1.2, cursor: "pointer" }}
                // onClick={handleOpen}
            >
                {list.length} ảnh nữa
            </InputLabel>
        )}
    </Stack>
);
