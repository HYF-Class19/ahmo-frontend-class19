import { Check, Edit } from "@mui/icons-material";
import { Box, IconButton, InputBase, Typography } from "@mui/material";
import React, { useState } from "react";

interface EditableTextProps {
  label: string;
  onSubmit?: (value: string) => void;
  placeholder: string;
  value: string;
  uneditable?: boolean;
}
const EditableText: React.FC<EditableTextProps> = ({
  label,
  onSubmit,
  placeholder,
  value,
  uneditable,
}) => {
  const [newValue, setNewValue] = useState(value);
  const [isEditable, setIsEditable] = useState(false);

  const handleIconClick = () => {
    if (isEditable && onSubmit) {
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
        inputProps={{
          style: {
            borderBottom: isEditable ? "2px solid blue" : "1px solid #F3FB8C",
          },
        }}
        sx={{ color: isEditable ? "blue" : "#FFFFFF" }}
      />
      {!uneditable && (
        <IconButton size="small" onClick={handleIconClick}>
          {isEditable ? <Check /> : <Edit />}
        </IconButton>
      )}
    </Box>
  );
};

export default EditableText;
