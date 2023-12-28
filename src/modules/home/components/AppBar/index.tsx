import { Box, Avatar, Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoShop from "../../assets/imgs/o6.png";
import { Search, SearchIconWrapper, StyledInputBase } from "./styled";
export default function HeaderAppBar() {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton disabled>
                <Avatar
                    src={LogoShop}
                    sx={{ width: 140, height: 80 }}
                    alt="logo"
                    variant="square"
                />
            </IconButton>
            <Search>
                <SearchIconWrapper sx={{ color: "custom.main" }}>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                />
            </Search>
            <IconButton sx={{ color: "custom.main" }}>
                <Badge badgeContent={4} color="error">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
        </Box>
    );
}
