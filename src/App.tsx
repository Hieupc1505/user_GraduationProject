import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./modules/home";
import { CssBaseline } from "@mui/material";
import theme from "~/shared/theme/index";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
// import AuthPage from "~/auth";
import ProductPage from "~/product";
import RenderLayout from "~/shared/layout/index.layout";
import SearchPage from "~/search/layout";
import CartPage from "~/cart/layout";
import PaymentPage from "~/payment";
import VerifyEmailPage from "~/verifyEmail";
import Setting from "~/setting/layout";
import Info from "~/setting/components/Info";
import LikedProduct from "~/setting/scenes/liked";
import Ordered from "~/setting/scenes/buyed";
import OrderDetail from "~/setting/scenes/orderDetail";

import AuthLayout from "~/auth/layout";

function App() {
    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RenderLayout
                                headerScroll={true}
                                page={<HomePage />}
                            />
                        }
                    />
                    {/* <Route path="/user/:action" element={<AuthPage />} /> */}
                    <Route
                        path="/product/:id"
                        element={
                            <RenderLayout
                                headerScroll={false}
                                page={<ProductPage />}
                                position="static"
                            />
                        }
                    />
                    <Route
                        path="/user/login"
                        element={<AuthLayout page={"signin"} />}
                    />
                    <Route
                        path="/user/register"
                        element={<AuthLayout page={"signup"} />}
                    />
                    <Route
                        path="/user/register/next"
                        element={<AuthLayout page={"verify"} />}
                    />
                    <Route
                        path="/activate"
                        element={<AuthLayout page={"active"} />}
                    />

                    <Route
                        path="/search"
                        element={
                            <RenderLayout
                                headerScroll={false}
                                page={<SearchPage />}
                                position="static"
                            />
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <RenderLayout
                                headerScroll={false}
                                page={<CartPage />}
                                position="static"
                            />
                        }
                    />
                    <Route
                        path="/payment"
                        element={
                            <RenderLayout
                                headerScroll={false}
                                page={<PaymentPage />}
                                position="static"
                            />
                        }
                    />
                    <Route
                        path="/user/verify_email"
                        element={
                            <RenderLayout
                                layout="readonly"
                                page={<VerifyEmailPage />}
                            />
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <RenderLayout
                                position="static"
                                page={<Setting />}
                            />
                        }
                    >
                        <Route path="info" element={<Info />} />
                        <Route path="liked" element={<LikedProduct />} />
                        <Route path="order" element={<Ordered />} />
                        <Route
                            path="order/detail/:id"
                            element={<OrderDetail />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </CssVarsProvider>
        // </ColorModeContext.Provider>
    );
}

export default App;
