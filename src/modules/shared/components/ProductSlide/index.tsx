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

const ProductSlide: React.FC<ProductSlideProps> = ({ products }) => {
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
                        />
                    </Link>
                </BoxStyled>
            ))}
        </Rerousel>
    );
};

export default React.memo(ProductSlide);
