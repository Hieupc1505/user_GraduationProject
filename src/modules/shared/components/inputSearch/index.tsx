import { memo, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    Stack,
    TextFieldProps,
    styled,
    TextField,
    Tooltip,
    Badge,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { Mode } from "~/shared/layout/header";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { changeLanguage, changeMode } from "~/shared/store/mainSlice";
import { useAppDispatch } from "~app/hooks";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import useLocalStorage from "~/shared/hooks/useLocalStorage";
import { getMessageTooltip } from "./input.text";
import GTranslateTwoToneIcon from "@mui/icons-material/GTranslateTwoTone";
import { changeStatus } from "~/shared/store/status.auth";

interface modeProps {
    inputReplaceHolder: string;
    mode: Mode | undefined;
    trigger: boolean;
    setOpen: () => void;
    setClose: () => void;
}

const CustomizedInputBase = ({
    mode,
    inputReplaceHolder,
    trigger,
    setOpen,
    setClose,
}: modeProps) => {
    const dispatch = useAppDispatch();
    const { isLoad, user } = useAppSelector(
        (state: RootState) => state.userReducer
    );
    const navigate = useNavigate();
    const location = useLocation();
    const [lib, setLib, removeLib] = useLocalStorage("search", "");

    const [search, setSearch] = useState<string>("");

    const { cart } = useAppSelector((state: RootState) => state.cartReducer);
    const { lang } = useAppSelector((state: RootState) => state.mainSlice);

    const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
        "& *": {
            color: trigger
                ? `${theme.palette.info.main} !important`
                : theme.palette.custom.main,
        },
        "& input": {
            paddingLeft: theme.spacing(1),
            color: trigger
                ? `${theme.palette.info.main} !important`
                : theme.palette.custom.main,
        },
    }));

    const handleChangeMode = () => {
        dispatch(changeMode());
    };
    const handleLanguage = () => {
        dispatch(changeLanguage());
    };

    const handleClickSetting = () => {
        navigate("/settings/info");
    };

    const getLengthCart = () => {
        if (cart) return cart.length;
    };

    useEffect(() => {
        if (location.state?.search) setSearch(location.state?.search);
        return () => removeLib();
    }, [location.state]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setLib(data.get("search")?.toString());
        console.log("search");
        navigate(`/search?key=${data.get("search")}`);
    };

    const handleSecurityLink = (link: string) => {
        if (!user) {
            navigate("/user/login", { state: { link: location.pathname } });
        } else {
            navigate(link);
        }
    };
    return (
        <Stack
            component="form"
            direction={"row"}
            spacing={2}
            onSubmit={handleSubmit}
            sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 600,
            }}
        >
            <StyledTextField
                sx={{ ml: 1, flex: 1 }}
                size="small"
                placeholder={inputReplaceHolder}
                variant="standard"
                color={trigger ? "info" : "custom"}
                focused={!trigger ? true : false}
                name="search"
                defaultValue={lib}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />

            <Box>
                <Tooltip title={getMessageTooltip("settings", lang)} arrow>
                    <IconButton
                        onClick={user ? handleClickSetting : setOpen}
                        color={trigger ? "info" : "custom"}
                    >
                        {user ? (
                            <SettingsTwoToneIcon />
                        ) : (
                            <PersonOutlineOutlinedIcon />
                        )}
                    </IconButton>
                </Tooltip>
                <Tooltip title={getMessageTooltip("liked", lang)} arrow>
                    <IconButton
                        onClick={() => handleSecurityLink("/settings/liked")}
                        color={trigger ? "info" : "custom"}
                    >
                        <FavoriteBorderOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={getMessageTooltip("cart", lang)} arrow>
                    {/* <Link to="/cart"> */}
                    <IconButton
                        color={trigger ? "info" : "custom"}
                        onClick={() => handleSecurityLink("/cart")}
                    >
                        <Badge badgeContent={getLengthCart()} color="error">
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </IconButton>
                    {/* </Link> */}
                </Tooltip>
                <Tooltip title={getMessageTooltip("mode", lang)} arrow>
                    <IconButton
                        color={trigger ? "info" : "custom"}
                        onClick={handleChangeMode}
                    >
                        <LightModeOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={getMessageTooltip("lang", lang)} arrow>
                    <IconButton
                        color={trigger ? "info" : "custom"}
                        onClick={handleLanguage}
                    >
                        <GTranslateTwoToneIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Stack>
    );
};

export default memo(CustomizedInputBase);
