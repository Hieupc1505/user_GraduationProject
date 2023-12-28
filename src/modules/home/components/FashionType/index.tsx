import React from "react";

import { Box, Paper, Typography } from "@mui/material";
import BtnAction from "~/shared/components/BtnActon";

interface FashionTypeProps {
    content: {
        item1: string;
        item2: string;
    };
    btnContent: string;
}

const FashionType = ({ content, btnContent }: FashionTypeProps) => {
    return (
        <Box
            sx={{
                padding: 6.5,
                display: "flex",
                justifyContent: "space-between",
                gap: 4,
            }}
        >
            <Paper
                sx={{
                    width: "50%",
                    paddingTop: "calc( 45% - 15px)",
                    backgroundSize: "cover",
                    backgroundImage:
                        'url("https://wallpaperaccess.com/full/2563134.jpg")',
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                }}
            >
                <Typography
                    sx={{
                        position: "absolute",
                        top: "22%",
                        left: "85px",
                        width: "231px",
                        fontWeight: "bolder",
                        fontSize: "42px",
                        textAlign: "center",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    {content["item1"]}
                </Typography>
                <BtnAction
                    variant="contained"
                    sx={{
                        color: "custom.main",
                        fontWeight: "bold",
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        bottom: "54px",
                        minWidth: "140px",
                    }}
                    content={btnContent}
                />
            </Paper>
            <Paper
                sx={{
                    width: "50%",
                    paddingTop: "calc( 45% - 15px)",
                    backgroundSize: "cover",
                    backgroundImage:
                        'url("https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                }}
            >
                <Typography
                    sx={{
                        position: "absolute",
                        top: "22%",
                        left: "85px",
                        width: "231px",
                        fontWeight: "bolder",
                        fontSize: "42px",
                        textAlign: "center",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    {content["item2"]}
                </Typography>
                <BtnAction
                    variant="contained"
                    sx={{
                        color: "custom.main",
                        fontWeight: "bold",
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        bottom: "54px",
                        minWidth: "140px",
                    }}
                    content={btnContent}
                />
            </Paper>
        </Box>
    );
};

export default React.memo(FashionType);
