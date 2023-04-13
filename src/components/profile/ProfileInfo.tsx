import { useAppSelector } from "@/hooks/useAppHooks";
import useUpdateUserData from "@/hooks/useUpdateUser";
import { IUser } from "@/models/IUser";
import { selectUserData } from "@/store/slices/userSlice";
import { EmailOutlined, PhoneIphone } from "@mui/icons-material";
import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import EditableText from "./EditableText";

interface ProfileInfoProps {
  user: IUser;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const userData = useAppSelector(selectUserData);
  const updateUserData = useUpdateUserData();

  const updateName = async (fullName: string) => {
    await updateUserData({
      fullName,
    });
  };

  const updateImageUrl = async (image_url: string) => {
    await updateUserData({
      image_url,
    });
  };

  const updateBio = async (bio: string) => {
    await updateUserData({
      bio,
    });
  };

  return (
    <div>
      <Typography variant="h2">{user.fullName}</Typography>
      <TextField
        name="bio"
        label="Bio"
        value={user.bio || "add bio..."}
        multiline
        rows={4}
        variant="outlined"
        sx={{
          color: "#fffff",
          margin: 2,
          width: "100%",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "2",
          justifyContent: "space-between",
        }}
      >
        <PhoneIphone sx={{ margin: 3 }} />
        <EditableText
          label="Phone"
          value={"0686886853"}
          uneditable={user.id !== userData?.id}
          placeholder="Enter your phone number..."
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2",
        }}
      >
        <EmailOutlined
          sx={{
            margin: 3,
            "&:hover .icon": {
              visibility: "visible",
              opacity: 1,
            },
          }}
        />
        <EditableText
          value={user.email}
          label="Email"
          uneditable={user.id !== userData?.id}
          placeholder="Enter your email..."
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <EmailOutlined
          sx={{
            margin: 3,
            "&:hover .icon": {
              visibility: "visible",
              opacity: 1,
            },
          }}
        />
        <EditableText
          value={user.image_url || ""}
          label="Image Url"
          uneditable={user.id !== userData?.id}
          onSubmit={updateImageUrl}
          placeholder="Enter an image url..."
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <EmailOutlined
          sx={{
            margin: 3,
            "&:hover .icon": {
              visibility: "visible",
              opacity: 1,
            },
          }}
        />
        <EditableText
          value={user.fullName}
          label="Name"
          uneditable={user.id !== userData?.id}
          onSubmit={updateName}
          placeholder="Enter new name..."
        />
      </Box>
    </div>
  );
};

export default ProfileInfo;
