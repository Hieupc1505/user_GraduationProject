import React, { useEffect, useState } from "react";
import { Box, BoxProps, styled, AppBarProps, Fade } from "@mui/material";

import Toolbar from "@mui/material/Toolbar";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CustomizedInputBase from "~/shared/components/inputSearch";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Mode } from "~/shared/layout/header";

interface ContentProps {
    pages: {
        Nam?: string;
        Nữ?: string;
        Mới?: string;

        Man?: string;
        Woman?: string;
        New?: string;
        Best?: string;
        Sale?: string;
    };
    logo: {
        light: string;
        dark: string;
    };
    inputReplaceHolder: string;
}

interface HeaderContentProps {
    content: ContentProps;
    mode: Mode;
    trigger: boolean;
    setOpen: () => void;
    setClose: () => void;
}

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactElement;
    trigger?: boolean;
}

const HeaderContent = ({
    content,
    mode,
    trigger,
    setOpen,
    setClose,
}: HeaderContentProps) => {
    const { pages, logo, inputReplaceHolder } = content;
    return (
        <Toolbar
            sx={{
                justifyContent: trigger ? "center" : "flex-end",
                flex: "1",
            }}
            disableGutters
        >
            <Link to={"/"}>
                <Avatar
                    variant="square"
                    src={logo[mode]}
                    alt="Young&Modern"
                    sx={{
                        mr: 10,
                    }}
                ></Avatar>
            </Link>

            <Box
                sx={{
                    flexGrow: 1,
                    display: trigger ? "flex" : "none",

                    gap: 2,
                }}
            >
                {Object.keys(pages).map((page) => (
                    <Button
                        key={page}
                        // onClick={() => {}}
                        sx={{
                            my: 2,
                            color: "text.primary",
                            display: "block",
                            fontWeight: "bold",
                        }}
                    >
                        {page}
                    </Button>
                ))}
            </Box>

            <CustomizedInputBase
                trigger={trigger}
                mode={mode}
                inputReplaceHolder={inputReplaceHolder}
                setOpen={setOpen}
                setClose={setClose}
            />
        </Toolbar>
    );
};

export default HeaderContent;
