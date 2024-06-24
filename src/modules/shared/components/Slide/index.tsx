import React, { MutableRefObject, ReactNode } from "react";
import { Box, Avatar, Container, styled, AvatarProps } from "@mui/material";
import { Rerousel } from "rerousel";

interface RerouselProps {
    children: ReactNode;
    ref: MutableRefObject<HTMLElement | null>;
    timmer: number;
}

const Slide: React.FC<RerouselProps> = ({ ref, timmer, children }) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "80vh",
            }}
        >
            <Rerousel itemRef={ref} interval={timmer}>
                {children}
            </Rerousel>
        </Box>
    );
};

export default Slide;
