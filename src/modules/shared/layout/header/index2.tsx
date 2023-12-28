import { useEffect } from "react";
import { Container, Box, styled } from "@mui/material";
import { BoxProps } from "@mui/material";
import NavigateHeader from "~/home/components/Navigate";
import HeaderAppBar from "~/home/components/AppBar";
import {
    setHeaderDefault,
    setLanguageDefault,
} from "~/shared/utils/setHeaderDefault";
import axios from "axios";
import { getInfo } from "~/home/api/getInfo.api";
import { userGetInfo } from "~/auth/store/authAction";
import { useAppDispatch } from "~app/hooks";

const Header = () => {
    const dispatch = useAppDispatch();

    const loadUser = async () => {
        if (localStorage["ACCESSTOKEN"]) {
            setHeaderDefault(localStorage["ACCESSTOKEN"]);
        }

        try {
            const data = await getInfo(`/api/v2/auth/info`);

            if (data.success) {
                dispatch(userGetInfo()).then(console.log);
            }
        } catch (err) {
            localStorage.removeItem("ACCESSTOKEN");
            setHeaderDefault(null);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const BoxWrap = styled(Box)<BoxProps>(({ theme }) => ({
        background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.light})`,
        // height: "120px",
    }));

    return (
        <BoxWrap>
            <Container maxWidth="xl">
                <NavigateHeader />
                <HeaderAppBar />
            </Container>
        </BoxWrap>
    );
};

export default Header;
