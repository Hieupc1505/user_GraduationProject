export type filtersProps = string[];

const text = {
    filters: {
        vn: ["Liên Quan", "Mới Nhất", "Bán Chạy"],
        en: ["Related", "Newest", "Best Selling"],
    },
    title: {
        vn: ["Sắp xếp theo", "Giá"],
        en: ["Sort By", "Price"],
    },
};

const searchVn = {
    filters: "Bộ Lọc Tìm Kiếm",
    related: "Liên Quan",
    new: "Mới Nhất",
    best: "Bán Chạy",
    sort: "Sắp xếp theo",
    price: "Giá",
    az: "Từ thấp đến cao",
    za: "Từ cao đến thấp",
    category: "Danh Mục",
    rate: "Đánh giá",
    range: "Khoảng giá",
    apply: "Áp dụng",
    from: "đTừ",
    to: "đTới",
};
const searchEn = {
    filters: "Sort By",
    related: "Related",
    new: "Newest",
    best: "Best Selling",
    sort: "Sort By",
    price: "Price",
    az: "From low to high",
    za: "From high to low",
    category: "Category",
    rate: "Rates",
    range: "Price Range",
    apply: "Apply",
    from: "$From",
    to: "$to",
};

export type KeyError =
    | "filters"
    | "related"
    | "new"
    | "best"
    | "sort"
    | "price"
    | "az"
    | "za"
    | "category"
    | "rate"
    | "range"
    | "apply"
    | "from"
    | "to";

export function renderText(code: KeyError, language: string): string {
    const errorMessages = language === "en" ? searchEn : searchVn;
    const defaultMessage =
        language === "en" ? "Unknown error" : "Lỗi không xác định";
    return errorMessages[code] || defaultMessage;
}

export default text;
