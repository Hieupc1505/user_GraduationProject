// import React, { ReactNode } from "react";

// import AuthUser from "~/shared/components/AuthUser";
// import { useAppDispatch, useAppSelector } from "~app/hooks.tsx";
// import { RootState } from "~app/store";
// import { useColorScheme } from "@mui/material";
// import { useToggle } from "~/shared/hooks/useToggle";

// const ProtectRoute = (page: ReactNode) => {
//     // const { mode, setMode } = useColorScheme();
//     // const { isLoad, user, error } = useAppSelector(
//     //     (state: RootState) => state.userReducer
//     // );
//     const { modeTheme, lang } = useAppSelector(
//         (state: RootState) => state.mainSlice
//     );

//     const [open, setOpen] = useToggle(false);
//     const handleClose = () => {
//         return;
//     };

//     return (
//         <>
//             {/* <AuthUser lang={lang} open={open} handleClose={handleClose} />; */}
//             {page}
//         </>
//     );
// };

// export default ProtectRoute;
