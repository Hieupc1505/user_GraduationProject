import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { productProps } from "~/product/store/productSlice";
import { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import axios from "axios";
import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import { Link, Navigate, useNavigate } from "react-router-dom";
import HandleStatus from "./HandleStatus";
import { v4 } from "uuid";

const Ordered = () => {
    const [data, setData] = useState<productProps[] | null>(null);
    const { user } = useAppSelector((state: RootState) => state.userReducer);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/v1/order/ordered");

            if (data && data.success) {
                setData(data.orders);
            }
        };
        if (user) fetchData();
    }, [user]);
    const naviage = useNavigate();

    const handleOrderDetail = (_id: string) => {
        console.log(_id);
        naviage(`/settings/order/detail/${_id}`);
    };

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 0.5,
        },
        {
            field: "address",
            headerName: "Địa chỉ giao",
            flex: 1.4,
            cellClassName: "name-column--cell",
            renderCell: (params: any) => (
                <Typography>{params.row.shipping.address}</Typography>
            ),
        },
        {
            field: "total",
            headerName: "Number",
            flex: 1,
            cellClassName: "Price-column--cell",
            renderCell: (params: any) => (
                <Typography>{params.row.shipping.number}</Typography>
            ),
        },
        {
            field: "count",
            headerName: "Số lượng sản phẩm",
            flex: 0.4,
            cellClassName: "Brand-column--cell",
            renderCell: (params: any) => (
                <Typography>{params.row.products.length}</Typography>
            ),
        },
        {
            field: "status",
            headerName: "Trạng thái", //trạng thái tổng quát
            flex: 1,
            cellClassName: "Brand-column--cell",
            renderCell: (params: any) => (
                <HandleStatus status={params.row.status} />
            ),
        },
        {
            field: "payment",
            headerName: "Chi Tiết", //trạng thái tổng quát
            flex: 1,
            cellClassName: "Brand-column--cell",
            renderCell: (params: any) => (
                <Button
                    onClick={() => handleOrderDetail(params.row._id)}
                    variant="outlined"
                    size="small"
                    color="info"
                >
                    Chi tiết
                </Button>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Typography>Danh sách Sản Phẩm Đã Thích</Typography>
            <Box
                m="40px 0 0 0"
                height="75vh"
                // sx={{
                //     "& .MuiDataGrid-root": {
                //         border: "none",
                //     },
                //     "& .MuiDataGrid-cell": {
                //         borderBottom: "none",
                //     },
                //     "& .name-column--cell": {
                //         color: colors.greenAccent[300],
                //     },
                //     "& .MuiDataGrid-columnHeaders": {
                //         backgroundColor: colors.blueAccent[700],
                //         borderBottom: "none",
                //     },
                //     "& .MuiDataGrid-virtualScroller": {
                //         backgroundColor: colors.primary[400],
                //     },
                //     "& .MuiDataGrid-footerContainer": {
                //         borderTop: "none",
                //         backgroundColor: colors.blueAccent[700],
                //     },
                //     "& .MuiCheckbox-root": {
                //         color: `${colors.greenAccent[200]} !important`,
                //     },
                //     "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                //         color: `${colors.grey[100]} !important`,
                //     },
                // }}
            >
                {data && (
                    <DataGrid
                        rows={data}
                        columns={columns}
                        getRowId={() => v4()}
                        components={{ Toolbar: GridToolbar }}
                        // slots={{
                        //     toolbar: EditToolbar,
                        // }}
                        // checkboxSelection
                    />
                )}
            </Box>
        </Box>
    );
};

export default Ordered;
