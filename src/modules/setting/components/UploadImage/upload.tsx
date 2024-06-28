import { Avatar, Button } from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ChangeEvent, useState } from "react";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

interface UploadProps {
    url?: string;
    changeImage: (a: string) => void;
}

const UploadImage = ({ url, changeImage }: UploadProps) => {
    const [image, setImage] = useState<string>(() => url ?? "");

    const showImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        let main: string;

        if (files && files.length === 1) {
            const url = URL.createObjectURL(files[0]);
            main = await convertBase64(files[0]);

            setImage(url);
            changeImage(main);

            return;
        }
    };

    return (
        <>
            {!!image && (
                <Avatar
                    variant="square"
                    src={image}
                    className="img-main"
                    sx={{ width: "200px", height: "200px" }}
                />
            )}
            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
            >
                Hình ảnh Chính
                <VisuallyHiddenInput
                    type="file"
                    name={"file"}
                    onChange={showImage}
                />
            </Button>
        </>
    );
};

export default UploadImage;
const convertBase64 = (file: File): Promise<string> => {
    return new Promise((res, rej) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            res(fileReader.result as string);
        };
        fileReader.onerror = (err) => {
            rej(err);
        };
    });
};
