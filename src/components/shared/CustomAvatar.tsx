import { IChat } from "@/models/IChat";
import { IUser } from "@/models/IUser";
import { Avatar } from "@mui/material";
import React from "react";

interface CustomAvatarProps {
  user?: IUser | null;
  chat?: IChat | null;
  height?: number;
  width?: number;
  color?: any;
  mr?: number;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({
  user,
  chat,
  height,
  width,
  color,
  mr,
}) => {
  if (user) {
    return user.image_url ? (
      <Avatar sx={{ height, width, mr }} src={user.image_url} />
    ) : (
      <Avatar sx={{ height, width, bgcolor: !color ? "lightblue" : color, mr }}>
        {user.fullName[0]}
      </Avatar>
    );
  }

  if (chat) {
    return chat.image_url ? (
      <Avatar sx={{ height, width, mr }} src={chat.image_url} />
    ) : (
      <Avatar sx={{ height, width, bgcolor: !color ? "lightblue" : color, mr }}>
        {chat.name?.slice(0, 1)}
      </Avatar>
    );
  }

  return (
    <Avatar
      sx={{ height, width, bgcolor: !color ? "lightblue" : color, mr: 2 }}
    />
  );
};

export default CustomAvatar;
