import { Box, Chip } from "@mui/material";
import React, { useState } from "react";

const HandleStatus = ({ status }: { status: number }) => {
    return (
        <Box>
            {status == 0 && <Chip color="info" label={"Đang chờ xác nhận"} />}
            {status == 1 && <Chip color="warning" label={"Đang vận chuyển"} />}
            {status == 2 && <Chip color="success" label={"Đã giao hàng"} />}
            {status == -1 && <Chip color="success" label={"Đã hủy đơn hàng"} />}
        </Box>
    );
};

export default HandleStatus;
