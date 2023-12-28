import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const VerifyEmailPage = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "calc(100vh - 550px - 104px)",
            }}
        >
            <Paper
                sx={{
                    bgcolor: "background.paper",
                    py: 2,
                    px: 3,
                }}
            >
                <Typography component={"p"} variant="body2">
                    Vui Lòng Xác Thực Email
                </Typography>
                <Typography
                    component={"p"}
                    variant="body1"
                    textAlign={"center"}
                    mt={"1.5"}
                    color={"primary.main"}
                >
                    kamenx98@gmail.com
                </Typography>
            </Paper>
        </Box>
    );
};

export default VerifyEmailPage;
