import React, { Fragment, ReactElement, useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useColorScheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import HeaderReadOnly from "./headerReadOnly";
import loadUser from "../utils/loadUser";
import { useLocation } from "react-router-dom";
import { userSignInByGoogle } from "../store/userAction";
import { setLanguageDefault } from "../utils/setHeaderDefault";
import { changeLanguage } from "../store/mainSlice";
import { getAllCart } from "~/cart/store/cartAction";
import { resetCart } from "~/cart/store/cartSlice";
import { type } from "../store/type.store";

// import { useColorScheme } from "@mui/material";
import { useToggle } from "~/shared/hooks/useToggle";
import { changeStatus } from "~/shared/store/status.auth";
import userAPI from "../api/user.api";
import PositionedSnackbar from "~/shared/components/SnackBar";

interface RenderLayoutProps {
    page: ReactElement;
    headerScroll?: boolean;
    position?: "absolute" | "fixed" | "relative" | "static" | "sticky";
    layout?: "default" | "readonly";
    security?: boolean;
}

const RenderLayout = ({
    page,
    headerScroll,
    position = "fixed",
    layout = "default",
    security = false,
}: RenderLayoutProps) => {
    const { modeTheme, lang } = useAppSelector(
        (state: RootState) => state.mainSlice
    );
    const { user, isLoad } = useAppSelector(
        (state: RootState) => state.userReducer
    );

    // const [CustomSnackBar] = positionedSnackbar();

    const { open } = useAppSelector((state: RootState) => state.statusAuth);

    const dispatch = useAppDispatch();
    const location = useLocation();
    const [isFirstEffectComplete, setIsFirstEffectComplete] =
        useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams(location.search);
            if (!user && params.get("verify") === "gg") {
                const res = await userAPI.verifyByGoogle();
                if (res.success === true) {
                    localStorage.setItem(type.ACESSTOKEN, res.element.tokens);
                }
            }
            setIsFirstEffectComplete(true); // Đánh dấu là useEffect thứ nhất đã hoàn thành
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (isFirstEffectComplete) {
            loadUser(dispatch);
        }
    }, [isFirstEffectComplete, localStorage[type.ACESSTOKEN]]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        if (user) dispatch(getAllCart());
        else {
            dispatch(resetCart());
        }
    }, [user]);

    const handleClose = () => {
        dispatch(changeStatus(false));
    };

    setLanguageDefault(lang);

    return (
        <Fragment>
            <PositionedSnackbar />
            {/* <Header scroll={headerScroll} position={position} /> */}
            {layout === "default" ? (
                <Header scroll={headerScroll} position={position} />
            ) : (
                <HeaderReadOnly />
            )}

            {page}
            <Footer />
        </Fragment>
    );
};

export default RenderLayout;
