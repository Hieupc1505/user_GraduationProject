import React, {
    useEffect,
    useState,
    MouseEvent,
    useRef,
    MouseEventHandler,
} from "react";
import {
    DialogTitle,
    DialogContent,
    Box,
    TextField,
    Divider,
    Collapse,
    List,
    ListItem,
    ListItemText,
    Button,
    DialogActions,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

import { updateProps, dataProps } from "./index";
import axios from "axios";
interface addProps {
    data?: updateProps;
    handleAdd: (data: dataProps, type?: number) => void;
    handleBack: (val: boolean) => void;
    setChecked: (val: number) => void;
}
const label = { inputProps: { "aria-label": "Checkbox demo" } };

interface AddressProps {
    name: string;
    code: number;
    codename: StaticRange;
    phone_code?: number;
    level: number;
    division_type: string;
}

interface storeProps {
    p: AddressProps[] | [];
    w: AddressProps[] | [];
    d: AddressProps[] | [];
}

const DialogMainAdd: React.FC<addProps> = ({
    data,
    handleAdd,
    handleBack,
    setChecked,
}) => {
    const [value, setValue] = React.useState(0);
    const [key, setKey] = useState(false);
    const wrap = useRef();
    const [addr, setAddr] = useState<string[]>(["", "", ""]);
    const link = useRef();
    // link.current = {
    //     p: null,
    //     d: null,
    //     w: null,
    // };
    const [store, setStore] = useState<storeProps>({
        p: [],
        d: [],
        w: [],
    });

    const [pick, setPick] = useState({
        p: 0,
        d: 0,
        w: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/v1/address/p");
            setStore({ ...store, p: data.p });
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            setAddr(data?.address.split(", "));
        }
    }, [data]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleFocus = () => {
        setKey(true);
    };

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <Box
                component={"div"}
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                // ariaLabelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box
                        // onClick={handleClick}
                        sx={{
                            border: "1px solid",
                            borderColor: "grey.200",
                            borderTop: "none",
                            maxHeight: "240px",
                            height: "240px",
                            overflowY: "auto",
                        }}
                    >
                        {children}
                    </Box>
                )}
            </Box>
        );
    }

    const handleDocumentMousedown = (event: any) => {
        if (!event.target.closest(".wrap")) {
            setKey(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleDocumentMousedown);

        return () => {
            document.removeEventListener("mousedown", handleDocumentMousedown);
        };
    }, []);

    const handleClick = async (level: number, code: number, e: any) => {
        if (level === 1) {
            setAddr(["", "", ""]);
        }
        if (level === 2) {
            const { data } = await axios.get(`/api/v1/address/${code}/d`);

            if (data && data.success) {
                setPick((pre) => ({
                    ...pre,
                    p: code,
                }));
                setStore((pre) => ({
                    ...pre,
                    d: data.d,
                }));
                // setKey(false);
            }
        }
        if (level === 3) {
            const { data } = await axios.get(
                `/api/v1/address/${pick.p}/${code}/w`
            );

            if (data && data.success) {
                setPick((pre) => ({
                    ...pre,
                    d: code,
                }));
                setStore((pre) => ({
                    ...pre,
                    w: data.w,
                }));
            }
        }
        setValue(() => level - 1);

        setAddr((preV) => {
            const newArr = [...preV];
            newArr[level - 2] = e.target.innerText;
            console.log("newArr", newArr);
            return newArr;
        });
    };
    const handleClose = (level: number, e: any) => {
        setAddr((preV) => {
            const newArr = [...preV];
            newArr[2] = e.target.innerText;
            return newArr;
        });
        // console.log(addr);
        setKey(false);
    };

    const changeTap = (value: number) => {
        setAddr((preV) => {
            return preV.map((item, index) => (index < value ? item : ""));
        });
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        console.log({
            email: form.get("name"),
            password: form.get("number"),
            ad: form.get("address"),
            ad2: form.get("detail"),
            default: form.get("default"),
        });
        const key = form.get("default") === "on" ? true : false;
        const index = data ? data.index : undefined;
        handleAdd(
            {
                name: form.get("name")?.toString() || "",
                number: form.get("number")?.toString() || "",
                address: valueAddress as string,
                detail: form.get("detail")?.toString() || "",
                dfu: key,
            },
            index
        );

        handleBack(false);
    };

    const valueAddress = addr[2]
        ? `${addr[0] && addr[0]}${addr[1] && ", " + addr[1]}${
              addr[2] && ", " + addr[2]
          }`.trim()
        : addr.filter(Boolean).join();

    const generRateAddresss = (level: number) => {
        const { p, d, w } = store;
        if (level === 1) {
            return p.map((item, index) => (
                <ListItem
                    key={index}
                    sx={{
                        "&:hover": {
                            bgcolor: "action.hover",
                        },
                    }}
                    onClick={(e: any) => handleClick(level + 1, item.code, e)}
                >
                    <ListItemText primary={item.name} />
                </ListItem>
            ));
        }
        if (level === 2) {
            return d.map((item, index) => (
                <ListItem
                    key={index}
                    sx={{
                        "&:hover": {
                            bgcolor: "action.hover",
                        },
                    }}
                    onClick={(e: any) => handleClick(level + 1, item.code, e)}
                >
                    <ListItemText primary={item.name} />
                </ListItem>
            ));
        }
        if (level === 3) {
            return w.map((item, index) => (
                <ListItem
                    key={index}
                    sx={{
                        "&:hover": {
                            bgcolor: "action.hover",
                        },
                    }}
                    onClick={(e: any) => handleClose(3, e)}
                >
                    <ListItemText primary={item.name} />
                </ListItem>
            ));
        }
    };

    return (
        <Box
            component={"form"}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <DialogTitle id="alert-dialog-title">{"Địa Chỉ Mới"}</DialogTitle>
            <Divider />
            <DialogContent>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                        id="name"
                        label="Họ Và Tên"
                        variant="outlined"
                        required
                        name="name"
                        size="small"
                        defaultValue={data?.name}
                    />
                    <TextField
                        id={"number"}
                        label="Số Điện Thoại"
                        variant="outlined"
                        required
                        size="small"
                        name="number"
                        defaultValue={data?.number}
                    />
                </Box>
                <Box>
                    <TextField
                        id="address"
                        name="address"
                        label="Tỉnh/Thành Phố, Quận/Huyện, Phường/Xã"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ my: 2 }}
                        onFocus={handleFocus}
                        focused={key}
                        // onBlur={(e) => handleClose(e)}
                        value={valueAddress}
                        InputProps={{
                            readOnly: true,
                        }}
                    />

                    <Collapse in={key}>
                        <Box
                            className={"wrap"}
                            ref={wrap}
                            sx={{ width: "100%", mb: 2 }}
                        >
                            <Box
                                sx={{
                                    borderColor: "divider",
                                }}
                            >
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                    variant="fullWidth"
                                    sx={{
                                        border: ".8px solid",
                                        borderColor: "grey.300",
                                    }}
                                >
                                    <Tab
                                        sx={{ flex: 1 }}
                                        label="Tỉnh/Thành Phố"
                                        {...a11yProps(0)}
                                        onClick={() => changeTap(0)}
                                    />
                                    <Tab
                                        disabled={!addr[0]}
                                        sx={{
                                            flex: 1,
                                            // cursor: "not-allowed !important",
                                        }}
                                        label="Quận/Huyện"
                                        {...a11yProps(1)}
                                        onClick={() => changeTap(1)}
                                    />
                                    <Tab
                                        disabled={!addr[1]}
                                        sx={{
                                            flex: 1,
                                            // cursor: "not-allowed !important",
                                        }}
                                        label="Phường/Xã"
                                        {...a11yProps(2)}
                                        onClick={() => changeTap(2)}
                                    />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                <List dense={false} sx={{ pt: 0 }}>
                                    {store?.p.length && generRateAddresss(1)}
                                </List>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <List dense={false} sx={{ pt: 0 }}>
                                    {store?.d.length && generRateAddresss(2)}
                                </List>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
                                {store?.w.length && generRateAddresss(3)}
                                {/* <List dense={false} sx={{ pt: 0 }}>
                                    {generate(
                                        <ListItem
                                            sx={{
                                                "&:hover": {
                                                    bgcolor: "action.hover",
                                                },
                                            }}
                                            onClick={(e) => handleClick(2, e)}
                                        >
                                            <ListItemText primary="Single-line item" />
                                        </ListItem>
                                    )}
                                </List> */}
                            </CustomTabPanel>
                        </Box>
                    </Collapse>
                </Box>
                <TextField
                    id="detail"
                    label="Địa Chỉ Cụ Thể"
                    variant="outlined"
                    required
                    size="small"
                    fullWidth
                    name="detail"
                    defaultValue={data?.detail}
                />
                <Box>
                    <FormControlLabel
                        control={<Checkbox defaultChecked={data?.dfu} />}
                        name="default"
                        label={
                            <Typography
                                component={"span"}
                                variant="body2"
                                color={"text.secondary"}
                            >
                                Đặt làm địa chỉ mặc định
                            </Typography>
                        }
                    />
                </Box>
            </DialogContent>

            <Divider />
            <DialogActions>
                <Button onClick={() => handleBack(false)}>Trở Lại</Button>
                <Button
                    autoFocus
                    type={"submit"}
                    sx={{
                        bgcolor: "orange.main",
                        color: "custom.main",
                        textTransform: "capitalize",
                    }}
                >
                    Xác Nhận
                </Button>
            </DialogActions>
        </Box>
    );
};

export default DialogMainAdd;
