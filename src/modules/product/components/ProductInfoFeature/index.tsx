import React from "react";
import { Box, Typography } from "@mui/material";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import RestoreIcon from "@mui/icons-material/Restore";
const ProductInfoFeature = () => {
    const sxWrap = {
        display: "flex",
        justifyContent: "space-around",
        mt: 4,
    };
    const sxList = {
        display: "flex",
        justifyContent: "space-around",
        alignItem: "center",
    };

    const content = [
        {
            icon: <AccessAlarmsIcon fontSize={"small"} color="error" />,
            content: "Giao hàng nhah chóng",
        },
        {
            icon: <VerifiedUserIcon fontSize={"small"} color="error" />,
            content: "Hàng chính hãng 100%",
        },
        {
            icon: <RestoreIcon fontSize={"small"} color="error" />,
            content: "7 Ngày Miễn Phí Trả Hàng",
        },
    ];

    return (
        <Box sx={sxWrap}>
            {content.map((item, index) => (
                <Box sx={sxList} key={index}>
                    {item.icon}
                    <Typography
                        variant="subtitle2"
                        color={"error"}
                        sx={{ marginLeft: "8px" }}
                    >
                        {item.content}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default ProductInfoFeature;
