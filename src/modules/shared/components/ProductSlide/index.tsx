import React, { useRef } from "react";
import { productProps } from "~/product/store/productSlice";
import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import ProductItem from "../ProductItem";
import { Box, styled, BoxProps } from "@mui/material";
import Carousel from "~/shared/components/Carousel";
import { Link } from "react-router-dom";

export interface ProductSlideProps {
    products: productProps[];
}

const ProductSlide = ({ products }: ProductSlideProps) => {
    const ref = useRef(null);
    const { lang } = useAppSelector((state: RootState) => state.mainSlice);
    const BoxStyled = styled(Box)<BoxProps>(({ theme }) => ({
        width: "calc(100%)",
        "& .MuiPaper-root": {
            padding: "0 8px",
        },
        // padding: "0 8px",
    }));

    return (
        <Box
            sx={{
                width: "100%",

                position: "relative",
                overflow: "hidden",
            }}
        >
            <Carousel timmer={2000} item={5}>
                {products.map((item, index) => (
                    <BoxStyled ref={ref} key={index}>
                        <Link to={`/product/${item._id}`}>
                            <ProductItem
                                data={item}
                                lang={lang}
                                variant="square"
                                sale={20}
                            />
                        </Link>
                    </BoxStyled>
                ))}
            </Carousel>
        </Box>
    );
};

export default React.memo(ProductSlide);
