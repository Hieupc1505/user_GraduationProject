import React, { useRef } from "react";
import { Box, Avatar, styled } from "@mui/material";
import { Rerousel } from "rerousel";

const images = [
    "https://routine.vn/media/banner/tmp/images/banner.jpg",
    "https://routine.vn/media/MAIN_KV-WEBSITE-DESKTOP.jpg",
    "https://routine.vn/media/banner/tmp/images/banner-cfl-01.jpg",
    "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
];

const Banner: React.FC = () => {
    const ref = useRef(null);
    const AvatarCustom = styled(Avatar)({
        width: "calc(100%)",
        height: "100%",
        fontFamily: "Signika",
        fontWeight: "bold",
        fontSize: "1.5em",
        border: "solid 1px black",
        backgroundColor: "red",
    });
    return (
        <Box
            sx={{
                width: "100%",
                height: "80vh",
            }}
        >
            <Rerousel itemRef={ref} interval={1800}>
                {images.map((item, index) => (
                    <AvatarCustom
                        variant="square"
                        key={index}
                        src={item}
                        ref={ref}
                    />
                ))}
            </Rerousel>
        </Box>
    );
};

export default Banner;
