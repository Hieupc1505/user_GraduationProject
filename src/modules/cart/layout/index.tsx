import React, { useCallback, useEffect, useState } from "react";
import {
    Box,
    styled,
    Typography,
    Container,
    Checkbox,
    Divider,
    Grid,
    FormControl,
    FormGroup,
} from "@mui/material";
import ProductItemCart from "../components/productItemCart";
import PreCheck from "../components/preCheck";
import { useAppDispatch, useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import TotalCount from "../components/totalCount";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import { cartStoreText } from "./precheck.text";
import ProductLists from "~/shared/components/ProductLists";
import ProductItem from "~/shared/components/ProductItem";
import { Link, useNavigate } from "react-router-dom";
import BoxTheme from "~/shared/components/BoxTheme";
import { cartItemProps, cartStoreItem } from "../store/cartAction";
import { getAllCart } from "../store/cartAction";
import { deleteItemCart } from "~/cart/store/cartAction";

const CartPage = () => {
    const { modeTheme, lang } = useAppSelector(
        (state: RootState) => state.mainSlice
    );
    const { cart, isLoad, error } = useAppSelector(
        (state: RootState) => state.cartReducer
    );

    const [check, setCheck] = useState<boolean[]>([]);
    const [num, setNum] = useState<number[]>([]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleCheckAll = useCallback(
        (val: boolean) => {
            setCheck((prev) => prev.map((item) => val));
        },
        [check]
    );
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
            setCheck((prev) => [
                ...prev.slice(0, index),
                event.target.checked,
                ...prev.slice(index + 1),
            ]);
        },
        [check]
    );

    const checked = () => {
        if (cart.length) return check.every((item) => item === true);
        return false;
    };

    const deleteItemChecked = () => {
        const listChecked = check
            .map((item, index) => {
                if (item === true) {
                    return cart[index].productId;
                }
                return "";
            })
            .filter(Boolean);
        // alert("Bạn có thực sự muốn xóa");
        if (listChecked.length !== 0) {
            const result = confirm(cartStoreText[lang].confirm);
            if (result) dispatch(deleteItemCart(listChecked));
        }
    };

    const getMoney = useCallback(() => {
        let total = 0;
        if (cart.length > 0)
            for (let i = 0; i < check.length; i++) {
                if (check[i]) total += cart[i]["price"] * num[i];
            }
        return total;
    }, [check, num]);

    useEffect(() => {
        if (cart.length) {
            setCheck(Array.from({ length: cart.length }, () => false));
        } else {
            setCheck([]);
        }
    }, [cart.length]);

    useEffect(() => {
        if (cart.length) setNum(cart.map((item) => item.quantity));
    }, [cart.length]);

    const handleSetNum = useCallback((amount: number, index: number) => {
        setNum((prev) => {
            const arr = [...prev];
            arr[index] = arr[index] + amount === 0 ? 1 : arr[index] + amount;
            return arr;
        });
    }, []);

    const goPayment = () => {
        navigate("/payment", {
            state: { products: getProductsId(check, cart) },
        });
    };
    useEffect(() => {
        dispatch(getAllCart());
    }, []);

    return (
        <BoxTheme>
            <Container maxWidth="lg" sx={{ pt: 2.5, pb: 3 }}>
                <PreCheck
                    checkAll={handleCheckAll}
                    checked={checked()}
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        bgcolor: "background.paper",
                        px: 2.5,
                        height: "55px",
                    }}
                    content={cartStoreText[lang]["preCheck"]}
                />
                <Divider />
                <FormControl
                    required
                    // error={error}
                    component="fieldset"
                    sx={{ width: "100%" }}
                    variant="standard"
                >
                    <FormGroup>
                        {cart.map((item, index) => (
                            <ProductItemCart
                                key={index}
                                handleChange={handleChange}
                                checked={check[index]}
                                content={cartStoreText[lang]["itemCart"]}
                                repickText={cartStoreText[lang]["repickText"]}
                                data={item}
                                index={index}
                                num={num[index]}
                                handleSetNum={handleSetNum}
                                img={item.img}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    pt: 1.75,
                                    px: 2.5,
                                    pb: 2.5,
                                    bgcolor: "background.paper",
                                }}
                            />
                        ))}
                    </FormGroup>
                </FormControl>

                <TotalCount
                    checkAll={handleCheckAll}
                    checked={checked()}
                    content={cartStoreText[lang]["totalCount"]}
                    total={check.filter(Boolean).length}
                    money={getMoney()}
                    deleteItemChecked={deleteItemChecked}
                    goPayment={goPayment}
                />
                <Container
                    maxWidth="lg"
                    sx={{ bgcolor: "background.paper", pb: 2, pt: 3, mt: 2 }}
                >
                    <ProductLists
                        sx={{ pb: 6.4 }}
                        spacing={2}
                        titleButtonAction="View All"
                    >
                        <Grid item xs={12}>
                            <Typography
                                variant="body2"
                                sx={{
                                    textTransform: "uppercase",
                                    py: 1.75,
                                }}
                                component={"div"}
                            >
                                {"Có Thể Bạn Cũng Sẽ Thích"}
                            </Typography>
                        </Grid>
                        {/* {Array.from({ length: 12 }, (_, index) => (
                            <Grid key={index} item xs={12 / 4}>
                                <Link to={"/product/3535kj"}>
                                    <ProductItem
                                        lang={lang}
                                        variant="square"
                                        sale={20}
                                    />
                                </Link>
                            </Grid>
                        ))} */}
                    </ProductLists>
                </Container>
            </Container>
        </BoxTheme>
    );
};

export default CartPage;

function getProductsId(checked: boolean[], products: cartStoreItem[]) {
    return checked
        .map((item, index) => {
            if (item) return products[index].productId;
            return null;
        })
        .filter(Boolean);
}
