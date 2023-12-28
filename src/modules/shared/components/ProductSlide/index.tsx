import React, { useRef } from "react";
import { Rerousel } from "rerousel";
import { productProps } from "~/product/store/productSlice";
import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import ProductItem from "../ProductItem";
import { Box, styled, BoxProps, Grid, GridProps } from "@mui/material";

import { Link } from "react-router-dom";

export interface ProductSlideProps {
    products: productProps[];
}

const ProductSlide = ({ products }: ProductSlideProps) => {
    const ref = useRef(null);
    const { lang } = useAppSelector((state: RootState) => state.mainSlice);

    const BoxStyled = styled(Box)<BoxProps>(({ theme }) => ({
        width: "calc(100%/5)",
        "& .MuiPaper-root": {
            padding: "0 8px",
        },
        // padding: "0 8px",
    }));

    return (
        <Rerousel itemRef={ref} interval={1800}>
            {products.map((item, index) => (
                <BoxStyled ref={ref} key={index}>
                    <Link to={`/product/${item._id}`}>
                        <ProductItem
                            data={item}
                            lang={lang}
                            variant="square"
                            sale={20}
                            // sx={{ px: "8px" }}
                        />
                    </Link>
                </BoxStyled>
            ))}
        </Rerousel>
    );
};

export default React.memo(ProductSlide);

// import { Box, Avatar, Container, styled, AvatarProps } from "@mui/material";

// const images = [
//     "https://routine.vn/media/banner/tmp/images/banner.jpg",

//     "https://routine.vn/media/MAIN_KV-WEBSITE-DESKTOP.jpg",

//     "https://routine.vn/media/banner/tmp/images/banner-cfl-01.jpg",

//     "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
// ];

// const Banner = () => {
//     const AvatarCustom = styled(Avatar)<AvatarProps>(({ theme }) => ({
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "calc(100%)",
//         height: "100%",
//         fontFamily: "Signika",
//         fontWeight: "bold",
//         fontSize: "1.5em",
//         border: "solid 1px black",
//         backgroundColor: "red",
//     }));
//     return (
//         <Box
//             sx={{
//                 width: "100%",
//                 height: "80vh",
//             }}
//         >
//             <Rerousel itemRef={ref} interval={1800}>
//                 {images.map((item, index) => (
//                     <AvatarCustom
//                         variant="square"
//                         key={index}
//                         src={item}
//                         ref={ref}
//                     />
//                 ))}
//             </Rerousel>
//         </Box>
//     );
// };

// export default Banner;
