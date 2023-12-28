import React, { ReactElement, ReactNode, useRef } from "react";
import { Box, Avatar, Container, styled, AvatarProps } from "@mui/material";
import { Rerousel } from "rerousel";

export interface SlideProps {
    timmer: number;
    children: ReactNode;
    ref: React.MutableRefObject<null>;
}

const Slide = ({ ref, timmer, children }: SlideProps) => {
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
