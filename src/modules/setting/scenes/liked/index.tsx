import { Avatar, Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { productProps } from "~/product/store/productSlice";
import { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import axios from "axios";
import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import { Link } from "react-router-dom";

const LikedProduct = () => {
    const handleDetail = (id: string) => {
        return <Typography>ChiTiet</Typography>;
    };

    const [data, setData] = useState<productProps[] | null>(null);
    const { user } = useAppSelector((state: RootState) => state.userReducer);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/v1/product/liked");

            if (data && data.success) {
                setData(data.liked);
            }
        };
        if (user) fetchData();
    }, [user]);

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 0.5,
        },
        {
            field: "images",
            headerName: "Ảnh",
            flex: 0.6,
            cellClassName: "name-column--cell",
            renderCell: (params: any) => (
                <Link to={`/product/${params.row._id}`}>
                    <Avatar variant="square" src={params.row.images.main} />
                </Link>
            ),
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
            renderCell: (params: any) => (
                <Link to={`/product/${params.row._id}`}>{params.row.name}</Link>
            ),
        },
        {
            field: "price",
            headerName: "Price",
            flex: 1,
            cellClassName: "Price-column--cell",
        },
        {
            field: "brand",
            headerName: "Brand",
            flex: 1,
            cellClassName: "Brand-column--cell",
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
                        getRowId={(row) => generateRandomNumber()}
                        // components={{ Toolbar: GridToolbar }}
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

export default LikedProduct;

function generateRandomNumber() {
    const min = 1000; // Giá trị nhỏ nhất có 4 chữ số
    const max = 9999; // Giá trị lớn nhất có 4 chữ số
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
