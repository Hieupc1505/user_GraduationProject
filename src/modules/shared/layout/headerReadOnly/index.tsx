import React from "react";
import { Paper, Box, Avatar, Container, Button } from "@mui/material";

import { logo } from "./header.text";
import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import { useColorScheme } from "@mui/material";
import { Link } from "react-router-dom";
const HeaderReadOnly = () => {
    const { modeTheme, lang } = useAppSelector(
        (state: RootState) => state.mainSlice
    );

    return (
        <Paper elevation={2} sx={{ display: "flex" }}>
            <Container maxWidth="xl" sx={{}}>
                <Box sx={{ display: "flex", gap: 1.2, py: 4 }}>
                    <Link to={"/"}>
                        <Avatar
                            variant="square"
                            src={logo[modeTheme]}
                            alt="Young&Modern"
                        ></Avatar>
                    </Link>
                    <Button
                        endIcon={<KeyboardReturnIcon />}
                        sx={{
                            "&:hover": {
                                textDecoration: "underline",
                                textDecorationThickness: ".2px",
                            },
                        }}
                    >
                        Trang chủ
                    </Button>
                </Box>
            </Container>
        </Paper>
    );
};

export default HeaderReadOnly;
