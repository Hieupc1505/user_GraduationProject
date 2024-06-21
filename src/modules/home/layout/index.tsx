import { useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import { mainTextStore } from "./main.store";
import BennerList from "~/home/components/BannerList";
import { useAppDispatch, useAppSelector } from "~app/hooks";
import type { RootState } from "~app/store";
import ProductLists from "~/shared/components/ProductLists";
import ProductItem from "~/shared/components/ProductItem";
import { Link } from "react-router-dom";
import BannerAvatar from "../components/BannerAvatar";
import FashionType from "../components/FashionType";

import { homeData } from "../store/homeAction";
import ProductSlide from "~/shared/components/ProductSlide";
const MainLayout = () => {
    const { productListContent, paperContent, btnActionContent } =
        mainTextStore;
    const dispatch = useAppDispatch();
    const { modeTheme, lang } = useAppSelector(
        (state: RootState) => state.mainSlice
    );

    const { home } = useAppSelector((state: RootState) => state.homeReducer);

    useEffect(() => {
        dispatch(homeData());
    }, []);

    const ref = useRef(null);

    return (
        <main>
            <BannerAvatar />
            <BennerList
                mode={modeTheme}
                content={mainTextStore.bannerList}
                lang={lang}
            />

            <ProductLists
                titleButtonAction={btnActionContent[lang]}
                spacing={2}
                sx={{ p: 6.4 }}
            >
                {home?.latest && <ProductSlide products={home.latest} />}
            </ProductLists>

            <ProductLists
                titleList={productListContent[lang]["title"]}
                titleButtonAction={btnActionContent[lang]}
                spacing={2}
                sx={{ p: 6.4 }}
            >
                {home &&
                    home.selled.map((item, index) => (
                        <Grid key={index} item xs={12 / 4}>
                            <Link to={`/product/${item._id}`}>
                                <ProductItem
                                    data={item}
                                    lang={lang}
                                    variant="square"
                                    sale={20}
                                />
                            </Link>
                        </Grid>
                    ))}
            </ProductLists>
            <FashionType
                content={paperContent[lang]}
                btnContent={btnActionContent[lang]}
            />
        </main>
    );
};

export default MainLayout;
