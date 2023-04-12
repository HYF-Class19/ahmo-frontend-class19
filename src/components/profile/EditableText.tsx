import React, { useState } from "react";
import { Box, IconButton, InputBase, Typography } from "@mui/material";
import { Edit, Check } from "@mui/icons-material";

interface EditableTextProps {
  label: string;
  onSubmit: (value: string) => void;
  placeholder: string;
  value: string;
}
const EditableText: React.FC<EditableTextProps> = ({
  label,
  onSubmit,
  placeholder,
  value
}) => {
  const [newValue, setNewValue] = useState(value)
  const [isEditable, setIsEditable] = useState(false);

  const handleIconClick = () => {
    if (isEditable) {
      onSubmit(newValue);
    }
    setIsEditable(!isEditable);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", color: "#FFFFFF" }}>
      <Typography sx={{ marginRight: 1 }}>{label}:</Typography>
      <InputBase
        value={value}
        onChange={(e) => setNewValue(e.target.value)}
        readOnly={!isEditable}
        placeholder={placeholder}
        inputProps={{ style: { borderBottom: isEditable ? "2px solid blue" : "1px solid #F3FB8C"  } }}
        sx= { {color: isEditable ? "blue" : "#FFFFFF"  } }
      />
      <IconButton size="small" onClick={handleIconClick}>
        {isEditable ? <Check /> : <Edit />}
      </IconButton>
    </Box>
  );
};

export default EditableText;