import { getText } from "~/shared/utils/getTextbyLang";

export const prodDetailTextStore = {
    productPreviewText: {
        vn: {
            action: ["Chia sẻ", "Đã Thích"],
            titleInfo: {
                infoRating: ["Đánh Giá", "Đã Bán"],
                listOptions: ["Màu Sắc", "Chủ Đề", "Số Lượng"],
                actionBtn: ["Sản Phẩm Có Sẵn", "Thêm Vào Giỏ Hàng", "Mua Ngay"],
            },
        },
        en: {
            action: ["Share", "Liked"],
            titleInfo: {
                infoRating: ["Rating", "Sold"],
                listOptions: ["Color", "Theme", "Quantity"],
                actionBtn: ["Available", "Add to Cart", "Buy Now"],
            },
        },
    },
    productInfoText: {
        vn: ["Chi Tiết Sản Phẩm", "Mô Tả Sản Phẩm"],
        en: ["Product Details", "Product Description"],
    },
    assessmentText: {
        vn: {
            title: "Đánh Giá Sản Phẩm",
            overview: {
                pre: "trên",
                list: [
                    "Tất Cả",
                    "5 Sao",
                    "4 Sao",
                    "3 Sao",
                    "2 Sao",
                    "1 Sao",
                    "Có Bình Buận",
                    "Có Hình Ảnh & Video",
                ],
            },
        },
        en: {
            title: "Product Reviews",
            overview: {
                pre: "of",
                list: [
                    "All",
                    "5 Stars",
                    "4 Stars",
                    "3 Stars",
                    "2 Stars",
                    "1 Star",
                    "Has Comments",
                    "Has Photos & Videos",
                ],
            },
        },
    },
    slideProduct: {
        vn: ["Có thể bạn sẽ thích", "Xem Tất Cả"],
        en: ["You May Like", "View All"],
    },
};

const announcementVn = {
    addLike: "Vui lòng đăng nhập để thêm tài khoản yêu thích.",
    success: "Thêm thành công vào danh sách sản phẩm yêu thích.",
};
const announcementEn = {
    addLike: "Please log in to add a favorite account.",
    success: "Successfully added to the list of favorite products.",
};

export type keyProps = "addLike" | "success";
export interface storeProps {
    addLike: string;
    success: string;
}

export const getMessage = (key: keyProps, lang: string) => {
    return getText(key, announcementVn, announcementEn, lang);
};
