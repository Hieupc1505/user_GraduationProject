import React, { useState, useCallback, useEffect } from "react";
import { Box, Container, Grid, experimentalStyled } from "@mui/material";

import CalculateMoney from "../components/CalculateMoney";
import DeliveryAddress from "../components/DeliveryAddress";
import ProductLists from "../components/ProductLists";
import VoucherApply from "../components/VoucherApply";
import MyAddress from "../components/myAddress";
import { useToggle } from "~/shared/hooks/useToggle";
import { useAppDispatch, useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import { paymentStoreText } from "./payment.store";
import BoxTheme from "~/shared/components/BoxTheme";
import { useLocation, useNavigate } from "react-router-dom";
import { cartStoreItem } from "~/cart/store/cartAction";
import { useOptions } from "~/shared/hooks/useOptions";
import orderAPI from "../api/order.api";
import { changeStatus } from "~/shared/store/status.auth";

const PaymentLayout = () => {
    const [open, setOpen] = useToggle(false);
    const { modeTheme, lang } = useAppSelector(
        (state: RootState) => state.mainSlice
    );
    const { user } = useAppSelector((state: RootState) => state.userReducer);

    // console.log(user);

    const [products, setProducts] = useState<cartStoreItem[]>([]);
    const [typeExpress, setTypeExpress] = useState<"express" | "other">(
        "express"
    );
    const navigate = useNavigate();

    const [name, setName] = useState<string>(() =>
        user ? user.userInfo?.displayName : ""
    );
    const [number, setNumber] = useState<number>(() =>
        user ? user.userInfo?.number : 0
    );
    const [address, setAddress] = useState<string>(() =>
        user ? user.userInfo?.address : ""
    );
    const { cart } = useAppSelector((state: RootState) => state.cartReducer);
    const dispatch = useAppDispatch();

    const handleClickOpen = useCallback(() => {
        setOpen(true);
    }, [open]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [open]);

    const handleSelectInfo = (
        name: string,
        number: number,
        address: string
    ) => {
        setName(() => name);
        setAddress(() => address);
        setNumber(() => number);
    };

    const location = useLocation();

    useEffect(() => {
        if (location.state?.products) {
            if (location.state.from === "cart") {
                const data = location.state.products;

                setProducts(
                    cart.filter((item) => data.includes(item.productId))
                );
            } else if (location.state.from === "product") {
                setProducts(location.state.products);
            }
        } else {
            navigate("/cart");
        }
    }, []);

    const changeType = (v: "express" | "other") => {
        setTypeExpress(v);
    };
    const [getSelected, handleSelect] = useOptions(["0"]);
    const orderProduct = async () => {
        if (address) {
            let total = 0;
            const arr = products.map((item) => {
                total += item.price * item.quantity;
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                };
            });
            if (products.length === 0) {
                dispatch(
                    changeStatus({
                        open: true,
                        status: "error",
                        message: "Vui lòng chọn sản phẩm thanh toán",
                    })
                );
                return;
            }
            const data = await orderAPI.addOrderItem({
                address: address,
                number: "0" + number,
                cost: paymentStoreText["ship"][lang][typeExpress],
                notes: "Cho nhieu hanhf muoi owt",
                type: +getSelected(),
                total,
                products: JSON.stringify(arr),
            });

            if (data.success && data.element?.url)
                return window.location.assign(data.element?.url);

            navigate("/cart");
        } else {
            handleClickOpen();
        }
    };

    return (
        <BoxTheme sx={{ pt: 1.5, pb: 3 }}>
            <Container maxWidth="xl">
                <Grid
                    container
                    spacing={1.5}
                    // sx={{ gap: 1.5, display: "flex", flexWrap: "wrap" }}
                >
                    <Grid item xs={9}>
                        <DeliveryAddress
                            handleClickOpen={handleClickOpen}
                            content={paymentStoreText["address"][lang]}
                            name={name}
                            address={address}
                            number={number}
                        />
                        <ProductLists
                            content={paymentStoreText["productLists"][lang]}
                            lang={lang}
                            mode={modeTheme}
                            data={products}
                            type={typeExpress}
                            changeType={changeType}
                            handleSelect={handleSelect}
                            pay={paymentStoreText["pay"][lang]}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <VoucherApply
                            content={paymentStoreText["voucher"][lang]}
                        />
                        <CalculateMoney
                            content={paymentStoreText["count"][lang]}
                            lang={lang}
                            data={products}
                            type={typeExpress}
                            ship={paymentStoreText["ship"][lang]}
                            handleOrder={orderProduct}
                        />
                    </Grid>
                </Grid>
            </Container>
            <MyAddress
                anchor={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                handleSelectInfo={handleSelectInfo}
            />
        </BoxTheme>
    );
};

export default PaymentLayout;
