import { useAppSelector } from "@/hooks/useAppHooks";
import { useIsLaptop } from "@/hooks/useIsMobile";
import useUpdateUserData from "@/hooks/useUpdateUser";
import { IUser } from "@/models/IUser";
import { selectUserData } from "@/store/slices/userSlice";
import { EmailOutlined, PhoneIphone } from "@mui/icons-material";
import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";
import EditableText from "./EditableText";

interface ProfileInfoProps {
  user?: IUser;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const userData = useAppSelector(selectUserData);
  const isLaptop = useIsLaptop();
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

  return user ? (
    <Box
      width={isLaptop ? "100%" : "50%"}
      sx={{ bgcolor: "#23B1D0", borderRadius: "20px", maxWidth: 500 }}
    >
      <Typography variant="h4" textAlign={"center"} sx={{ mt: 2 }}>
        {userData?.id === user.id ? "Edit Your info" : "Profile info"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "2",
          justifyContent: "center",
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
          justifyContent: "center",
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

      {userData?.id === user.id && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
    </Box>
  ) : (
    <Box>
      <Typography sx={{ mb: 4 }} variant="h2">
        <Skeleton />
      </Typography>
      <Skeleton variant="rectangular" width={200} height={100} />
      <Box sx={{ mt: 4 }}>
        <Skeleton variant="rounded" width={300} height={40} />
        <Skeleton variant="rounded" width={300} height={40} />
        <Skeleton variant="rounded" width={300} height={40} />
        <Skeleton variant="rounded" width={300} height={40} />
      </Box>
    </Box>
  );
};

export default ProfileInfo;
