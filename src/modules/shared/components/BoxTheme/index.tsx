import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";

interface BoxThemeProps {
    children: React.ReactNode;
    className?: string;
    component?: React.ElementType;
    sx?: Record<string, unknown>;
}

const BoxTheme: React.FC<BoxThemeProps> = ({
    children,
    ...props
}: {
    children: ReactNode;
}) => {
    const { modeTheme, lang } = useAppSelector(
        (state: RootState) => state.mainSlice
    );
    return (
        <Box {...props} bgcolor={modeTheme === "light" ? "#e0e0e0" : "#191919"}>
            {children}
        </Box>
    );
};

export default BoxTheme;
