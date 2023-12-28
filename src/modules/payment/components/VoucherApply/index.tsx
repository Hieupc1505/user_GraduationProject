import React from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";

interface VoucherProps {
    content: string[];
}

const VoucherApply = ({ content }: VoucherProps) => {
    return (
        <Box
            sx={{
                bgcolor: "background.paper",
                py: 3.75,
                px: 3,
                borderRadius: "4px",
            }}
        >
            <Typography variant="body1" fontWeight={"bold"}>
                {content[0]}
            </Typography>
            <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5 }}
            >
                <TextField
                    size="small"
                    color="secondary"
                    placeholder={content[1]}
                />
                <Button
                    variant="outlined"
                    sx={{
                        bgcolor: "orange.main",
                        color: "custom.main",
                        fontSize: "caption.fontSize",
                        textTransform: "capitalize",
                        minWidth: "90px",
                        py: 1,
                    }}
                >
                    {content[4]}
                </Button>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Typography variant="body1" fontWeight={"bold"}>
                {content[2]}
            </Typography>
            <Typography variant="caption" sx={{ textDecoration: "underline" }}>
                {content[3]}
            </Typography>
            <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5 }}
            >
                <TextField
                    size="small"
                    color="secondary"
                    placeholder={content[1]}
                />
                <Button
                    variant="outlined"
                    sx={{
                        bgcolor: "orange.main",
                        color: "custom.main",
                        fontSize: "caption.fontSize",
                        textTransform: "capitalize",
                        minWidth: "90px",
                        py: 1,
                    }}
                >
                    {content[4]}
                </Button>
            </Box>
        </Box>
    );
};

export default VoucherApply;
