import React from "react";
import { Box, Typography, Popover, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

import SelectOption from "~/shared/features/SelectOption";
import { useOptions } from "~/shared/hooks/useOptions";

interface RepickOptionProps {
    content: string[];
    handleClose: () => void;
    data: {
        key: string;
        value: string[];
    }[];
    type: string;
    handleChangeType: (type: string) => void;
}

const RepickOption = ({
    content,
    handleClose,
    data,
    type,
    handleChangeType,
}: RepickOptionProps) => {
    const [getSelectedColor, handleSelectColor] = useOptions(
        Array.from({ length: data.length }, () => "0")
    );

    const handleRepick = () => {
        // console.log(getSelectedColor());
        handleChangeType(getSelectedColor().toString());
        handleClose();
    };

    return (
        <div>
            <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                    <React.Fragment>
                        <Button
                            size={"small"}
                            variant="text"
                            endIcon={<KeyboardArrowDownIcon />}
                            {...bindTrigger(popupState)}
                            sx={{
                                color: "text.secondary",
                                fontSize: "overline.fontSize",
                                textTransform: "capitalize",
                            }}
                        >
                            {content[0]}:
                        </Button>
                        <Typography
                            variant="caption"
                            component={"div"}
                            color="text.secondary"
                            py={0.5}
                            px={0.55}
                        >
                            {type}
                        </Typography>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    p: 3,
                                    maxWidth: "280px",
                                }}
                            >
                                {data.length &&
                                    data.map(({ key, value }, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 1.5,
                                                alignItems: "center",
                                                mb: 1.5,
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                color={"text.secondary"}
                                            >
                                                {key}:{" "}
                                            </Typography>
                                            {
                                                <SelectOption
                                                    element={index}
                                                    list={value}
                                                    size="medium"
                                                    sx={{
                                                        px: 1.5,
                                                        py: 0.5,
                                                        minWidth: "34px",
                                                        "& .MuiTypography-root":
                                                            {
                                                                textTransform:
                                                                    "capitalize",
                                                                fontSize:
                                                                    "caption.secondary",
                                                            },
                                                    }}
                                                    callback={handleSelectColor}
                                                />
                                            }
                                        </Box>
                                    ))}

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "100%",
                                        gap: 2,
                                        mt: 1.5,
                                    }}
                                >
                                    <Button
                                        variant="text"
                                        sx={{
                                            flex: 1,

                                            color: "text.secondary",
                                            fontSize: "caption.fontSize",
                                        }}
                                    >
                                        {content[3]}
                                    </Button>
                                    <Button
                                        sx={{
                                            bgcolor: "orange.main",
                                            color: "custom.main",
                                            flex: 1,
                                            fontSize: "caption.fontSize",
                                            "&:hover": {
                                                opacity: 0.8,
                                                color: "custom.main",
                                                borderColor: "orange.main",
                                                bgcolor: "orange.main",
                                            },
                                        }}
                                        onClick={handleRepick}
                                    >
                                        {content[4]}
                                    </Button>
                                </Box>
                            </Box>
                        </Popover>
                    </React.Fragment>
                )}
            </PopupState>
        </div>
    );
};

export default RepickOption;
