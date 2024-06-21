import React from "react";
import {
    Button,
  
    Box,

    Typography,
    Divider,

} from "@mui/material";


interface CustomAddressProps {
    name: string;
    number: string | number;
    detail: string;
    dfu?: boolean;
    index: number;
    handleUpdate: (key: number) => void;
}

const CustomAddress = ({
    name,
    number,
    detail,
    dfu = false,
    index,
    handleUpdate,
}: CustomAddressProps) => {
    return (
        <Box
            className={"item-info"}
            sx={{
                display: "flex",
                alignItems: "start",
                gap: 1.5,
                mt: 1,
            }}
        >
            <Box sx={{ flex: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                    }}
                >
                    <Typography variant="body2" fontWeight={"bold"}>
                        {name}
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography color={"text.secondary"} variant="body2">
                        {number}
                    </Typography>
                </Box>
                <Typography
                    variant="caption"
                    color={"text.secondary"}
                    component={"div"}
                >
                    {detail}
                </Typography>
                {dfu && (
                    <Box
                        sx={{
                            color: "orange.main",
                            textTransform: "capitalize",
                            fontSize: "caption.fontSize",
                            border: ".2px solid",
                            borderColor: "orange.main",
                            px: "5px",
                            py: "2px",
                            display: "inline-block",
                            borderRadius: "2px",
                        }}
                    >
                        Mặc định
                    </Box>
                )}
            </Box>
            <Button
                variant="text"
                size="small"
                sx={{
                    fontSize: "caption.fontSize",
                    textTransform: "capitalize",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    px: "24px",
                }}
                onClick={() => handleUpdate(index)}
            >
                Cập Nhật
            </Button>
        </Box>
    );
};
export default React.memo(CustomAddress);
