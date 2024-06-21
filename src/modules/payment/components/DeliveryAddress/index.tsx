import { Box, Typography, Button, Stack } from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";

interface DeliveryAddressProps {
    handleClickOpen: () => void;
    content: string[];
    name: string;
    address: string;
    number: string | number;
}
const DeliveryAddress = ({
    handleClickOpen,
    content,
    name,
    address,
    number,
}: DeliveryAddressProps) => {
    return (
        <Box sx={{ bgcolor: "background.paper", mb: 2 }}>
            <Box
                component={"div"}
                sx={{
                    width: "100%",
                    height: "4px",

                    backgroundImage:
                        "repeating-linear-gradient(45deg,#6fa6d6,#6fa6d6 33px,transparent 0,transparent 41px,#f18d9b 0,#f18d9b 74px,transparent 0,transparent 82px)",
                }}
            ></Box>
            <Box
                className={"address"}
                sx={{
                    pt: 2.5,
                    px: 3.75,
                    pb: 3,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2.5,
                    }}
                >
                    <RoomOutlinedIcon sx={{ color: "orange.main" }} />
                    <Typography variant="body1" color={"orange.main"}>
                        {content[0]}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            alignItems: "center",
                            flex: 1,
                        }}
                    >
                        <Stack sx={{ minWidth: "140px", textAlign: "center" }}>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: "bolder" }}
                            >
                                {name}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: "bolder" }}
                            >
                                {"0" + number}
                            </Typography>
                        </Stack>
                        <Typography variant="body2" ml={2.5}>
                            {address}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "caption.fontSize",
                                color: "orange.main",
                                border: 1,
                                borderColor: "orange.main",
                                px: "5px",
                                py: "2px",
                                flexShrink: 0,
                                borderRadius: "2px",
                            }}
                        >
                            {content[1]}
                        </Typography>
                    </Box>
                    <Button
                        variant="text"
                        size="small"
                        sx={{
                            textTransform: "capitalize",
                            ml: 2,
                            minWidth: "90px",
                        }}
                        onClick={handleClickOpen}
                    >
                        {content[2]}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default DeliveryAddress;
