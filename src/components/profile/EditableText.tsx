import React, { useState } from "react";
import { Box, IconButton, InputBase, Typography } from "@mui/material";
import { Edit, Check } from "@mui/icons-material";

interface EditableTextProps {
  label: string;
  onSubmit: (value: string) => void;
  placeholder: string;
}

const EditableText: React.FC<EditableTextProps> = ({
  label,
 
  onSubmit,
  placeholder,
}) => {
  const [value, setValue] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  const handleIconClick = () => {
    if (isEditable) {
      onSubmit(value);
    }
    setIsEditable(!isEditable);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography sx={{ marginRight: 1 }}>{label}:</Typography>
      <InputBase
        value={value}
        onChange={(e) => setValue(e.target.value)}
        readOnly={!isEditable}
        multiline
        placeholder={placeholder}
        inputProps={{ style: { borderBottom: isEditable ? "2px solid blue" : "1px solid #F3FB8C"  } }}
      />
      <IconButton size="small" onClick={handleIconClick}>
        {isEditable ? <Check /> : <Edit />}
      </IconButton>
    </Box>
  );
};

export default EditableText;