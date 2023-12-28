import { Container, Box, Grid } from "@mui/material";
import React from "react";
import NavigateSetting from "../components/Navigate";
import BasicCard from "../components/BasicCard";
import { Outlet } from "react-router-dom";
const Setting = () => {
    return (
        <Container maxWidth={"lg"} sx={{ py: 4, px: 0 }}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <NavigateSetting />
                </Grid>
                <Grid item xs={9}>
                    <Outlet />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Setting;
