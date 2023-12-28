import React from "react";
import { Box, styled } from "@mui/material";
import { BoxProps } from "@mui/material";
import { deepOrange, blue, purple, teal, amber } from "@mui/material/colors";
const HeroComponent = () => {
    const StyledBoxWrap = styled(Box)<BoxProps>(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(2),
    }));

    const StyledBoxMedia = styled(Box)(({ theme }) => ({
        width: "50%",
        maxWidth: "50%",
        height: "500px",
        display: "flex",
        flexWrap: "wrap",
        gap: theme.spacing(2),
    }));

    const Item = styled(Box)(({ theme }) => ({
        width: `calc(50% - ${theme.spacing(1)})`,
        height: `calc(50% - ${theme.spacing(1)})`,
    }));

    return (
        <StyledBoxWrap>
            
        </StyledBoxWrap>
    );
};

export default HeroComponent;
