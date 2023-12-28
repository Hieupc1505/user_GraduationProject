import axios from "axios";

export interface orderItemProps {
    address: string;
    number: string;
    cost: number;
    notes: string;

    type: number;
    total: number;

    products: string;
}

const orderAPI = {
    addOrderItem: async (orderItem: orderItemProps) => {
        if (orderItem.type === 0) {
            const { data } = await axios.post(`/api/v1/order/add`, orderItem);
            return data;
        } else if (orderItem.type === 1) {
            const { data } = await axios.post(
                `/api/v1/order/banking`,
                orderItem
            );
            return data;
        }
    },
};

export default orderAPI;
