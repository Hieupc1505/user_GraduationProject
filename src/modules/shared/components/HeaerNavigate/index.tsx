import React from "react";
import {
    Box,
    styled,
    BoxProps,
    Toolbar,
    Typography,
    TypographyProps,
    Button,
    MenuList,
    MenuItem,
    Drawer,
    Container,
    AppBar,
    Stack,
    StackProps,
    Divider,
    Fade,
    Grow,
} from "@mui/material";
import { Mode } from "~/shared/layout/header";
import { headerTextContent } from "~/shared/layout/header/header.text";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

interface HeaderNavProps {
    trigger: boolean;
    mode: Mode;
    content: ContentHeaderNavProps;
}

interface ContentHeaderNavProps {
    main: string[];
    listNav: { key: string; link: string }[];
    extends: { key: string; link: string }[];
    account: { add: string; in: string; out: string };
}

type Anchor = "top" | "left" | "bottom" | "right";

const HeaderNavigate = ({ content, mode, trigger }: HeaderNavProps) => {
    const { headerNavigate } = headerTextContent;

    const BoxWrap = styled(Box)<BoxProps>(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(4),
    }));

    const [state, setState] = React.useState({
        left: false,
    });
    const TypographyCustom = styled(Typography)<TypographyProps>(
        ({ theme }) => ({
            fontWeight: "bold",
            fontSize: "22px",
            color: state.left
                ? theme.palette.text.primary
                : theme.palette.custom.main,
            textTransform: "uppercase",
            cursor: "pointer",
        })
    );

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }

            if (open == true && state["left"]) return;

            setState({ ...state, [anchor]: open });
        };

    const StyledStack = styled(Stack)<StackProps>(({ theme }) => ({
        position: "absolute",
        paddingBottom: "20px",
        paddingTop: theme.spacing(3),
        gap: theme.spacing(3),
        // marginLeft: "68px",
        bottom: 0,
        backgroundColor: theme.palette.background.paper,
        backgroundImage:
            "linear-gradient(rgba(255 255 255 / 0.15), rgba(255 255 255 / 0.15))",
    }));

    const list = (anchor: Anchor) => (
        <Box
            sx={{
                width: "40vw",
                padding: "60px 68px",
                position: "relative",
                minHeight: "100%",
            }}
            className="close-box"
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            // onMouseLeave={toggleDrawer("left", false)}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <BoxWrap>
                    {content.main.map((item, index) => (
                        <TypographyCustom key={index}>{item}</TypographyCustom>
                    ))}
                </BoxWrap>
                <MenuList sx={{ mt: 3 }}>
                    {content.listNav.map((item, index) => (
                        <MenuItem key={index} sx={{ ml: -2 }}>
                            <TypographyCustom
                                color={state.left ? "info.main" : "custom.main"}
                                py={0.5}
                            >
                                {item.key}
                            </TypographyCustom>
                        </MenuItem>
                    ))}
                </MenuList>
            </Box>
            <StyledStack direction={"row"}>
                <Stack
                    direction={"row"}
                    sx={{ alignItems: "center", gap: 0.8 }}
                >
                    <PermIdentityOutlinedIcon />
                    <TypographyCustom>{content.account.add}</TypographyCustom>
                </Stack>

                <Divider
                    orientation="vertical"
                    // variant="middle"
                    flexItem
                    sx={{
                        borderColor: "info.dark",
                        borderWidth: "1.5px",
                    }}
                />

                <TypographyCustom>{content.account.in}</TypographyCustom>
            </StyledStack>
        </Box>
    );

    return (
        <Box>
            <Toolbar sx={{ display: trigger ? "none" : "" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <BoxWrap>
                        {content.main.map((item, index) => (
                            <TypographyCustom key={index}>
                                {item}
                            </TypographyCustom>
                        ))}
                    </BoxWrap>
                    <MenuList sx={{ mt: 3 }}>
                        {content.listNav.map((item, index) => (
                            <MenuItem key={index} sx={{ ml: -2 }}>
                                <TypographyCustom
                                    onMouseEnter={toggleDrawer("left", true)}
                                    py={0.5}
                                >
                                    {item.key}
                                </TypographyCustom>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Box>
            </Toolbar>
            <Box>
                <Drawer
                    anchor={"left"}
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}
                    sx={{ background: "info" }}
                    // onMouseLeave={toggleDrawer("left", false)}
                >
                    {list("left")}
                </Drawer>
            </Box>
        </Box>
    );
};

export default HeaderNavigate;
