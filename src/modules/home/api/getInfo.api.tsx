import axios from "axios";

export const getInfo = async (link: string) => {
    const { data } = await axios.get(link);
    return data;
};
