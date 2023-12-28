import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Paper,
    Typography,
    Chip,
    InputLabel,
    Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { renderTextField } from "~/setting/utils/renderContent";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import axios from "axios";
import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import convertMoney from "../../utils/convertMoney";
import { orange } from "@mui/material/colors";

const OrderDetail = () => {
    const params = useParams();

    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const [proInOrder, setProInOrder] = useState(null);
    const { user } = useAppSelector((state: RootState) => state.userReducer);
    const { lang } = useAppSelector((state: RootState) => state.mainSlice);

    useEffect(() => {
        const fetchData = async (id: string) => {
            const { data } = await axios.post(`/api/v1/order/detail`, {
                orderId: id,
            });

            if (data && data.success) {
                // console.log(data);
                setProInOrder(() => data.products);
                setData(() => data.data[0]);
            } else setData(null);
        };

        if (params?.id && user) fetchData(params.id);
    }, [params.id, user]);

    const renderStatus = (status: number) => {
        if (status === 1)
            return <Chip label={"Đang vận chuyển"} color="warning" />;
        if (status === 2)
            return <Chip label={"Đã giao hàng"} color="success" />;
        if (status === -1) return <Chip label={"Đã hủy"} color="error" />;

        return <Chip label={"Đang chờ xác nhận"} color="info" />;
    };

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 0.5,
        },
        {
            field: "images",
            headerName: "Ảnh",
            flex: 1,
            cellClassName: "name-column--cell",
            renderCell: (params: any) => (
                <Link to={`/product/${params.row._id}`}>
                    <Avatar variant="square" src={params.row.images.main} />
                </Link>
            ),
        },
        {
            field: "name",
            headerName: "Tên sản phẩm",
            flex: 2,
            cellClassName: "name-column--cell",
            renderCell: (params: any) => (
                <Link to={`/product/${params.row._id}`}>{params.row.name}</Link>
            ),
        },
        {
            field: "status",
            headerName: "Trạng thái", //trạng thái tổng quát
            flex: 1.4,
            cellClassName: "Brand-column--cell",
            renderCell: (params: any) => renderStatus(params.row.status),
        },
    ];

    const handleClickEmail = (_id: string) => {
        navigate("/customers", { state: { _id } });
    };

    const updateStatusOrder = async (status: number) => {
        const { data } = await axios.post("/api/v1/order/update", {
            id: params.id,
            status,
        });
        if (data && data.success) {
            alert("Cập nhập thành công");
            navigate("/orders");
        }
    };

    const EditToolbar = () => {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignContent: "center",
                    pb: 0,
                    gap: 2,
                }}
            >
                {data && (
                    <>
                        {+data["status"] === 1 && (
                            <Button
                                variant="outlined"
                                color="info"
                                // onClick={() => updateStatusOrder(1)}
                            >
                                Xác nhận đã lấy hàng
                            </Button>
                        )}
                        {[0, 1].includes(+data["status"]) && (
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => updateStatusOrder(-1)}
                            >
                                Hủy đơn hàng
                            </Button>
                        )}
                    </>
                )}
            </Box>
        );
    };

    console.log(data);
    return (
        <Box m={"20px"}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="h5">Chi tiết đơn hàng</Typography>
            </Box>
            <Paper sx={{ p: 4 }}>
                {!!data && (
                    <>
                        {renderTextField("ID", data["_id"], 0)}
                        {renderTextField("Khách hàng", data["email"], 1)}
                        {renderTextField("Số điện thoại", data["number"], 2)}
                        {renderTextField(
                            "Địa chỉ giao hàng",
                            data["address"],
                            3
                        )}
                        {renderTextField(
                            "Giá trị đơn hàng",
                            convertMoney(+data["total"]),
                            4,
                            { color: orange[600] }
                        )}
                    </>
                )}
                {EditToolbar()}
                <Box m="40px 0 0 0" height="75vh">
                    {!!proInOrder && (
                        <DataGrid
                            rows={proInOrder}
                            columns={columns}
                            getRowId={() => uuidv4()}
                            // slots={{
                            //     toolbar: EditToolbar,
                            // }}
                            // components={{ Toolbar: GridToolbar }}
                        />
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default OrderDetail;
