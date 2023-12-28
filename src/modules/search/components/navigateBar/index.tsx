import React, { EventHandler, useState } from "react";
import {
    Box,
    Container,
    Grid,
    Button,
    Typography,
    Stack,
    ButtonProps,
    styled,
    Popover,
} from "@mui/material";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, {
    bindTrigger,
    bindHover,
    bindMenu,
} from "material-ui-popup-state";
import {
    usePopupState,
    bindPopper,
    bindPopover,
} from "material-ui-popup-state/hooks";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import BoxTheme from "~/shared/components/BoxTheme";
import SelectOption from "~/shared/features/SelectOption";
import { filtersProps, renderText } from "~/search/layout/search.text";
import FilterListIcon from "@mui/icons-material/FilterList";
import { stat } from "fs";
import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";

export interface navSearchProps {
    content: filtersProps;
    handleSelect: (v: number, i: string) => void;
    handleFilter: (v: number) => void;
    sortProduct: (v: number) => void;
}

const NavigateBar = ({
    content,
    handleSelect,
    handleFilter,
    sortProduct,
}: navSearchProps) => {
    const [status, setStatus] = useState<string>("inc");
    const { lang } = useAppSelector((state: RootState) => state.mainSlice);
    const DisableBtn = styled(Button)<ButtonProps>(({ theme }) => ({
        color: `${theme.palette.text.secondary} !important`,
        textTransform: "inherit",
    }));

    const popupState = usePopupState({
        variant: "popper",
        popupId: "menu",
    });

    const handlePopupChange = (
        e: React.MouseEvent<HTMLLIElement>,
        item: string
    ) => {
        // Xử lý khi item được click
        setStatus((pre) => {
            if (pre === "inc" && item === "dec") return "dec";
            if (pre === "dec" && item === "inc") return "inc";
            return pre;
        });
        // ...
        // Đóng menu nếu cần thiết
        popupState.close();
        sortProduct(status === "inc" ? -1 : 1);
    };

    const sort = status === "inc" ? { rotate: "180deg" } : {};
    return (
        <BoxTheme>
            <Stack
                sx={{
                    gap: 2,
                    px: 2.5,
                    py: 1.5,
                    fontSize: "body2",
                }}
                direction={"row"}
            >
                <DisableBtn variant="text" disabled>
                    {/* Sắp xếp theo */}
                    {renderText("sort", lang)}
                </DisableBtn>
                {/* <Button
                    size="small"
                    variant="contained"
                    sx={{
                        bgcolor: "orange.main",
                        color: "custom.main",
                        px: 2,
                        textTransform: "capitalize",
                        fontSize: "body2",
                        py: 0,
                    }}
                >
                    Liên quan
                </Button>
                <Button
                    size="small"
                    sx={{
                        px: 2,
                        textTransform: "capitalize",
                        fontSize: "body2",
                        py: 0,
                        bgcolor: "background.paper",
                        color: "text.primary",
                    }}
                    variant="contained"
                >
                    Mới Nhất
                </Button>
                <Button
                    size="small"
                    sx={{
                        px: 2,
                        textTransform: "capitalize",
                        fontSize: "body2",
                        py: 0,
                        bgcolor: "background.paper",
                        color: "text.primary",
                    }}
                    variant="contained"
                >
                    Bán Chạy
                </Button> */}
                <SelectOption
                    element={0}
                    list={content}
                    size="medium"
                    sx={{
                        px: 2.5,
                        py: 1.5,
                        mr: 0.5,
                        minWidth: "34px",
                        bgcolor: "background.paper",
                        "& .MuiTypography-root": {
                            textTransform: "capitalize",
                            fontSize: "caption.secondary",
                        },
                        "&.Mui-selected": {
                            bgcolor: "orange.main",
                            color: "white",
                        },
                        "&.Mui-selected:hover": {
                            bgcolor: "orange.main",
                            color: "white",
                        },
                    }}
                    callback={handleSelect}
                    onClick={handleFilter}
                />
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {() => (
                        <React.Fragment>
                            <Button
                                variant="contained"
                                {...bindHover(popupState)}
                                endIcon={<KeyboardArrowDownIcon />}
                                size="small"
                                sx={{
                                    px: 2,
                                    textTransform: "capitalize",
                                    fontSize: "body2",
                                    py: 0,
                                    bgcolor: "background.paper",
                                    color: "text.primary",
                                    minWidth: "200px",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                    }}
                                >
                                    {renderText("price", lang)}
                                    <FilterListIcon sx={sort} />
                                </Box>
                            </Button>

                            <HoverPopover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                            >
                                <MenuItem
                                    onClick={(event) =>
                                        handlePopupChange(event, "inc")
                                    }
                                    sx={{ minWidth: "200px" }}
                                >
                                    {renderText("az", lang)}
                                </MenuItem>
                                <MenuItem
                                    onClick={(event) =>
                                        handlePopupChange(event, "dec")
                                    }
                                    sx={{ minWidth: "200px" }}
                                >
                                    {renderText("za", lang)}
                                </MenuItem>
                            </HoverPopover>
                        </React.Fragment>
                    )}
                </PopupState>
            </Stack>
        </BoxTheme>
    );
};

export default NavigateBar;
