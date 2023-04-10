import React from "react";
import { Avatar } from "@mui/material";

interface ProfileAvatarProps {
  src: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ src }) => {
  return <Avatar alt="Profile Picture" src={src} sx={{ width: 180, height: 180 }} />;
};

export default ProfileAvatar;
