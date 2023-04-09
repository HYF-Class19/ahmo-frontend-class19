import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { PersonOutline, PhoneIphone, EmailOutlined } from "@mui/icons-material";
import EditableText from "./EditableText";
import { FormField } from "../shared/FormField";

interface ProfileInfoProps {
  name: string;
  bio: string;
  setBio: (bio: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  email: string;
  setEmail: (email: string) => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  bio,
  setBio,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
}) => {
  return (
    <div>
      <Typography variant="h2">{name}</Typography>
      <TextField
        name="bio"
        label="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        multiline
        rows={4}
        variant="outlined"
        sx={{
          margin: 2,
          width: "100%",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
        }}
      />
      <Box sx={{ display: "flex", alignItems: "center" , marginBottom: "2", justifyContent: "space-between"}}>
        <PhoneIphone sx={{ margin: 3 }} />
        <EditableText
          label="Phone"
          onSubmit={(value) => setPhoneNumber(value)}
          placeholder="Enter your phone number..."
        />
      </Box>
      
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <EmailOutlined sx={{ margin: 3 ,  "&:hover .icon": {
          visibility: "visible",
          opacity: 1,
        }}} />
        <EditableText
          label="Email"
          onSubmit={(value) => setEmail(value)}
          placeholder="Enter your email..."
        />
      </Box>
    

    </div>
  );
};

export default ProfileInfo;
