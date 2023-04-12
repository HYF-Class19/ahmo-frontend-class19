import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { PersonOutline, PhoneIphone, EmailOutlined } from "@mui/icons-material";
import EditableText from "./EditableText";
import { FormField } from "../shared/FormField";
import { useUpdateUserMutation } from "@/services/authService";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import { selectUserData, updateUserData } from "@/store/slices/userSlice";

interface ProfileInfoProps {
  name: string;
  bio: string;
  setBio: (bio: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  email: string;
  setEmail: (email: string) => void;
  setImage_url: (imageUrl: string) => void;
  image_url: string
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  bio,
  setBio,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  setImage_url,
  image_url
}) => {
  const userData = useAppSelector(selectUserData)!
  const [updateUser, result] = useUpdateUserMutation()
  const dispatch = useAppDispatch()

  const updateName = async (fullName: string) => {
    if(userData && fullName !== userData?.fullName && fullName.length >= 2) {
      await updateUser({userId: userData.id, body:{fullName}})
      if(!result.error) {
        dispatch(updateUserData({fullName}))
      }
    }
  }

  const updateImageUrl = async (image_url: string) => {
    if(userData && image_url !== userData?.image_url && image_url.length >= 6) {
      await updateUser({userId: userData.id, body:{image_url}})
      if(!result.error) {
        dispatch(updateUserData({image_url}))
      }
    }
  }

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
          color: "#fffff",
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
          value={"0686886853"}
          onSubmit={(value) => setPhoneNumber(value)}
          placeholder="Enter your phone number..."
        />
      </Box>
      
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between",  marginBottom: "2"}}>
        <EmailOutlined sx={{ margin: 3 ,  "&:hover .icon": {
          visibility: "visible",
          opacity: 1,
        }}} />
        <EditableText
          value={userData.email}
          label="Email"
          onSubmit={(value) => setEmail(value)}
          placeholder="Enter your email..."
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <EmailOutlined sx={{ margin: 3 ,  "&:hover .icon": {
          visibility: "visible",
          opacity: 1,
        }}} />
        <EditableText
          value={userData.image_url || ''}
          label="Image Url"
          onSubmit={updateImageUrl}
          placeholder="Enter an image url..."
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <EmailOutlined sx={{ margin: 3 ,  "&:hover .icon": {
          visibility: "visible",
          opacity: 1,
        }}} />
        <EditableText
          value={userData.fullName}
          label="Name"
          onSubmit={updateName}
          placeholder="Enter new name..."
        />
      </Box>
    

    </div>
  );
};

export default ProfileInfo;
