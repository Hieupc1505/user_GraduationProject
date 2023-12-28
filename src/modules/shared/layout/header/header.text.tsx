import logoDark from "../../assets/imgs/y-dark.2png.png";
import logoLight from "../../assets/imgs/y-light2.png";

export const headerTextContent = {
    headerContent: {
        vn: {
            logo: {
                light: logoLight,
                dark: logoDark,
            },

            inputReplaceHolder: "Tìm kiếm...",
            pages: {
                Nam: "/",
                Nữ: "",
                Mới: "/",
                Best: "",
                Sale: "",
            },
        },
        en: {
            logo: {
                light: logoLight,
                dark: logoDark,
            },

            inputReplaceHolder: "Search...",
            pages: {
                Man: "/",
                Woman: "",
                New: "/",
                Best: "",
                Sale: "",
            },
        },
    },
    headerNavigate: {
        vn: {
            main: ["Nam", "Nữ", "Bộ Sưu Tập"],
            listNav: [
                { key: "Xem Tất Cả", link: "/" },
                { key: "Sản Phẩm Mới", link: "/" },
                { key: "Bán Chạy", link: "/" },
                { key: "Áo Nam", link: "/" },
                { key: "Quần Nam", link: "/" },
                { key: "Đồ Bơi - Đồ Đi Biển", link: "/" },
                { key: "Phụ kiện", link: "/" },
                { key: "Ưu đãi", link: "/" },
                { key: "Tin Thời trang", link: "/" },
            ],
            extends: [
                { key: "Danh Sách Cửa Hàng", link: "/" },
                { key: "Theo Dõi Đơn Hàng", link: "/" },
                { key: "Tin Thời Trang", link: "/" },
                { key: "Liên Hệ", link: "/" },
            ],
            account: {
                add: "Đăng ký",
                in: "Đăng nhập",
                out: "Đăng xuất",
            },
        },
        en: {
            main: ["Man", "Woman", "Collection"],
            listNav: [
                { key: "All Products", link: "/" },
                { key: "New Arrivals", link: "/" },
                { key: "Best Sellers", link: "/" },
                { key: "Men's Shirts", link: "/" },
                { key: "Men's Pants", link: "/" },
                { key: "Swimwear - Beachwear", link: "/" },
                { key: "Accessories", link: "/" },
                { key: "Offers", link: "/" },
                { key: "Fashion News", link: "/" },
            ],
            extends: [
                { key: "Store Locations", link: "/" },
                { key: "Your Orders", link: "/" },
                { key: "Fashion News", link: "/" },
                { key: "Contact Us", link: "/" },
            ],
            account: {
                add: "Sign up",
                in: "Sign in",
                out: "Sign out",
            },
        },
    },
};
