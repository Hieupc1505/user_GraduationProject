import {
    StackNav,
    Item,
    StyledDivider,
    ButtonNav,
    BadgeExtend,
} from "./styled";

import { Stack, IconButton, Box } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ModeToggle from "~/home/features/toggleMode";
import MenuListAvatar from "../AvatarMenu";

import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "~app/hooks.tsx";
import { RootState } from "~app/store";

const NavigateHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (route: string) => {
        navigate(`${route}`, { state: { from: location.pathname } });
    };

    const toogleFeatureSignInUp = () => {
        return (
            <Box sx={{ display: "flex", gap: 0.75 }}>
                <ButtonNav
                    onClick={() => handleClick("/user/sign-up")}
                    variant="text"
                >
                    Đăng ký
                </ButtonNav>

                <StyledDivider
                    variant="middle"
                    orientation="vertical"
                    flexItem
                />

                <ButtonNav
                    onClick={() => handleClick("/user/sign-in")}
                    variant="text"
                >
                    Đăng nhập
                </ButtonNav>
            </Box>
        );
    };

    return (
        <StackNav direction="row" spacing={2}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
                <Item>Tải ứng dụng</Item>
                <StyledDivider
                    variant="middle"
                    orientation="vertical"
                    flexItem
                />
                <Item>Kết nối</Item>
                <Stack direction="row" spacing={2}>
                    <Stack
                        direction="row"
                        spacing={-1}
                        sx={{ marginLeft: "0 !important" }}
                    >
                        <IconButton
                            sx={{ color: "custom.main" }}
                            aria-label="fb-icon"
                        >
                            <FacebookRoundedIcon />
                        </IconButton>
                        <IconButton
                            sx={{ color: "custom.main" }}
                            aria-label="insta-icon"
                        >
                            <InstagramIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </Stack>
            {/* <Divider orientation="vertical" flexItem /> */}
            <Item sx={{ flexGrow: 1 }}></Item>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <ButtonNav variant="text">
                    <BadgeExtend
                        color="error"
                        badgeContent="4"
                        variant="dot"
                        sx={{ top: 0.5, right: 1 }}
                    >
                        <NotificationsNoneIcon />
                    </BadgeExtend>
                    Thông báo
                </ButtonNav>
                <ButtonNav variant="text" startIcon={<HelpOutlineIcon />}>
                    Hỗ trợ
                </ButtonNav>
                {toogleFeatureSignInUp()}
                <ModeToggle />
            </Stack>
        </StackNav>
    );
};

export default NavigateHeader;
