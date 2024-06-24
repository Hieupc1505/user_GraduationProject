import {
    AppBar,
    styled,
    AppBarProps,
    Container,
    Backdrop,
} from "@mui/material";
import HeaderContent from "~/shared/components/HeaderContent";
import HeaderNavigate from "~/shared/components/HeaerNavigate";
import { headerTextContent } from "./header.text";
import { useColorScheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "~app/hooks.tsx";
import { RootState } from "~app/store";
import { useCallback, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export type Mode = "light" | "dark";

import useScrollTrigger from "@mui/material/useScrollTrigger";

import { changeStatus } from "~/shared/store/status.auth";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
    scroll?: boolean;
    position: "absolute" | "fixed" | "relative" | "static" | "sticky";
}

const Header = ({ scroll = false, position = "fixed" }: HeaderProps) => {
    const { mode, setMode } = useColorScheme();
    const { modeTheme, lang } = useAppSelector(
        (state: RootState) => state.mainSlice
    );
    const { isLoad, user } = useAppSelector(
        (state: RootState) => state.userReducer
    );
    const { open } = useAppSelector((state: RootState) => state.statusAuth);

    const dispatch = useAppDispatch();
    // const [open, setOpen] = useToggle(false);

    const handleClose = useCallback(() => {
        dispatch(changeStatus(false));
    }, []);
    const location = useLocation();
    const navigate = useNavigate();

    const handleOpen = useCallback(() => {
        navigate("/user/login", { state: { link: location.pathname } });
    }, [location]);

    useEffect(() => {
        setMode(modeTheme);
    }, [modeTheme]);

    useEffect(() => {
        if (open) {
            handleClose();
        }
    }, [user]);

    let trigger = useScrollTrigger({
        // target: window(),
        disableHysteresis: true,
        threshold: 300,
    });
    const StyledAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
        padding: `${theme.spacing(1)} 0`,
        background: trigger
            ? mode === "light"
                ? "#fff"
                : "#000"
            : "transparent",
    }));

    if (scroll === false) {
        trigger = true;
    }

    return (
        <StyledAppBar
            position={position}
            sx={{
                boxShadow: !trigger ? "none" : "auto",
                mt: !trigger ? 3 : 0,
            }}
        >
            <Container
                maxWidth="xl"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                }}
            >
                <HeaderNavigate
                    content={headerTextContent.headerNavigate[lang]}
                    mode={mode as Mode}
                    trigger={trigger}
                />
                <HeaderContent
                    content={headerTextContent.headerContent[lang]}
                    mode={mode as Mode}
                    trigger={trigger}
                    setOpen={handleOpen}
                    setClose={handleClose}
                />
            </Container>

            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isLoad}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </StyledAppBar>
    );
};

export default Header;
