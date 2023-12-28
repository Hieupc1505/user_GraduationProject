import { Button, Grid, Typography, SxProps } from "@mui/material";
import { useAppSelector } from "~app/hooks";
import { ReactElement, ReactNode } from "react";
import type { RootState } from "~app/store";
import ProductItem from "~/shared/components/ProductItem";
import BtnAction from "~/shared/components/BtnActon";

interface ProductListsProps {
    titleList?: string;
    titleButtonAction?: string;
    headerProps?: any;
    footerProps?: any;
    sx?: SxProps;
    spacing?: number;
    children: ReactNode;
}

const ProductLists = ({
    titleList,
    titleButtonAction,

    sx,
    spacing,
    children,
}: ProductListsProps) => {
    // const { modeTheme, lang } = useAppSelector(
    //     (state: RootState) => state.mainSlice
    // );

    const handleTitleList = titleList ? (
        <Grid
            item
            xs={12}
            sx={
                titleList
                    ? {
                          display: "flex",
                          justifyContent: "center",
                      }
                    : {}
            }
        >
            <Typography
                component={"div"}
                variant="h4"
                sx={{
                    textTransform: "uppercase",
                    fontWeight: "bolder",
                    mb: 4,
                    mt: 5,
                    position: "relative",
                    "&:before": {
                        content: '" "',
                        position: "absolute",
                        bottom: "10px",
                        display: "block",
                        height: "10px",
                        width: "104%",
                        background: "#e1e1e1",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: "-1",
                    },
                }}
            >
                {titleList}
            </Typography>
        </Grid>
    ) : (
        <></>
    );

    const handleBtnAction = titleButtonAction ? (
        <Grid
            item
            xs={12}
            sx={
                titleButtonAction
                    ? {
                          display: "flex",
                          justifyContent: "center",
                          mt: 5,
                      }
                    : {}
            }
        >
            <BtnAction
                sx={{
                    textTransform: "uppercase",
                    color: "info.main",
                    fontWeight: 700,
                    padding: "10px 20px",
                    minWidth: "160px",
                }}
                variant="outlined"
                content={titleButtonAction}
            />
        </Grid>
    ) : (
        <></>
    );

    return (
        <Grid
            container
            spacing={spacing}
            sx={{ ...sx, "& a": { textDecoration: "none" } }}
        >
            {handleTitleList}

            {children}

            {handleBtnAction}
        </Grid>
    );
};

export default ProductLists;
