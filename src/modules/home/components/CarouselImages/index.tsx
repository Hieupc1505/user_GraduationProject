import React from "react";
import Carousel from "~/shared/components/Carousel";
import { Box, styled, Avatar } from "@mui/material";

const images = [
    "https://routine.vn/media/banner/tmp/images/banner.jpg",
    "https://routine.vn/media/MAIN_KV-WEBSITE-DESKTOP.jpg",
    "https://routine.vn/media/banner/tmp/images/banner-cfl-01.jpg",
    "https://routine.vn/media/amasty/webp/banner/tmp/images/Polo_Pemium__jpg.webp",
    "https://routine.vn/media/amasty/webp/banner/tmp/images/Active_Wear_Banner_dt_jpg.webp",
    "https://routine.vn/media/amasty/webp/banner/tmp/images/Coffee_Lovers_3_-_desktop_jpg.webp",
];

const CarouselImages = () => {
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
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Carousel timmer={2500}>
                <AvatarCustom variant="square" src={images[0]} />
                <AvatarCustom variant="square" src={images[1]} />
                <AvatarCustom variant="square" src={images[2]} />
                <AvatarCustom variant="square" src={images[3]} />
            </Carousel>
        </Box>
    );
};

export default CarouselImages;
