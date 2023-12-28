import React, { useCallback, useEffect, useState, useRef } from "react";
import {
    Box,
    Container,
    Grid,
    Button,
    Typography,
    Stack,
    ButtonProps,
    styled,
    Popover,
    Pagination,
} from "@mui/material";
import FilterOptions from "../components/filterOptions";

import NavigateBar from "../components/navigateBar";
import ProductLists from "~/shared/components/ProductLists";
import ProductItem from "~/shared/components/ProductItem";
import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import { Link, useLocation } from "react-router-dom";
import searchAPI from "../api/search.api";
import { productProps } from "~/product/store/productSlice";
import useLocalStorage from "~/shared/hooks/useLocalStorage";
import text from "../layout/search.text";
import { useOptions } from "~/shared/hooks/useOptions";
const SearchPage = () => {
    const location = useLocation();

    const [textSearch, setTextSearch] = useState<string>(() => {
        const check = location.search.indexOf("sort");
        if (check === -1) return location.search + "&sort=1";
        else return location.search;
    });

    const { modeTheme, lang } = useAppSelector(
        (state: RootState) => state.mainSlice
    );
    const [products, setProducts] = useState<productProps[]>([]);
    const category = useRef();
    const DisableBtn = styled(Button)<ButtonProps>(({ theme }) => ({
        color: `${theme.palette.text.secondary} !important`,
        textTransform: "inherit",
    }));

    const [getSelected, handleSelect] = useOptions(["0"]);

    const searchProduct = useCallback(
        async (key: string) => {
            const data = await searchAPI.searchQuery(key);

            if (data.success) {
                category.current = data.element.categories;
                setProducts(() => data.element.data);
                // setCategory(() => );
                // console.log(data.elemenet.categories);
            }
        },
        [textSearch, location.search]
    );

    useEffect(() => {
        if (textSearch) {
            searchProduct(textSearch);
        }
    }, [textSearch, location.search]);

    const handleFilter = (index: number) => {
        if (index === 1) {
            setProducts((prev) => {
                return prev.sort((a, b) => {
                    return (
                        new Date(a.release_date).getTime() -
                        new Date(b.release_date).getTime()
                    );
                });
            });
        } else if (index === 2) {
            setProducts((prev) => {
                return prev.sort((a, b) => {
                    return b.inventory.selled - a.inventory.selled;
                });
            });
        }
    };

    const sortProduct = (condition: number) => {
        setTextSearch((pre) => pre.replace(/sort=(-1|1)/, `sort=${condition}`));
    };

    const handleQueryFilter = (min = "0", max = "9999999"): void => {
        let search = location.search;

        const regex = /(min=)\d+/;
        if (min !== "")
            search = search.includes("min")
                ? search.replace(regex, `min=${min}`)
                : `${search}&min=${min}`;

        const regex2 = /(max=)\d+/;
        if (max !== "")
            search = search.includes("max")
                ? search.replace(regex2, `max=${max}`)
                : `${search}&max=${max}`;

        window.location.search = search;
    };

    return (
        <Container maxWidth="xl" sx={{ pt: 8 }}>
            <Grid container spacing={2.5}>
                <Grid item xs={3}>
                    <FilterOptions
                        handleQuerySearch={handleQueryFilter}
                        category={category.current || []}
                    />
                </Grid>
                <Grid item xs={9}>
                    <NavigateBar
                        sortProduct={sortProduct}
                        content={text["filters"][lang]}
                        handleSelect={handleSelect}
                        handleFilter={handleFilter}
                    />
                    <ProductLists spacing={2} sx={{ mt: 1 }}>
                        {products.length &&
                            products.map((item, index) => {
                                return (
                                    <Grid key={index} item xs={12 / 5}>
                                        <Link to={`/product/${item._id}`}>
                                            <ProductItem
                                                data={item}
                                                lang={lang}
                                                variant="square"
                                                sale={20}
                                            />
                                        </Link>
                                    </Grid>
                                );
                            })}
                    </ProductLists>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Pagination
                            count={10}
                            shape="rounded"
                            size="large"
                            sx={{ mt: 4, mb: 4 }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SearchPage;
