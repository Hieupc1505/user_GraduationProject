import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
interface CheckBoxItemProps {
    value: string;
    index: number;
}
const CheckBoxItem = ({ value, index }: CheckBoxItemProps) => {
    const [checked, setChecked] = React.useState([-1]);
    // const labelId = `checkbox-list-label-${value}`;
    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    return (
        <ListItem disablePadding>
            <ListItemButton
                role={undefined}
                onClick={handleToggle(index)}
                dense
            >
                <ListItemIcon sx={{ minWidth: "auto" }}>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(index) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": value }}
                    />
                </ListItemIcon>
                <ListItemText id={value} primary={value} />
            </ListItemButton>
        </ListItem>
    );
};

export default CheckBoxItem;
