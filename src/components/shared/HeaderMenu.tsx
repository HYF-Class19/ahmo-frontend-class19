import { useAppSelector } from "@/hooks/useAppHooks";
import { selectUserData } from "@/store/slices/userSlice";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import * as React from "react";
import CustomAvatar from "./CustomAvatar";

interface HeaderMenuProps {
  anchorEl: null | HTMLElement;
  setAnchorEl: any;
  logout: any;
  handleClick: any;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  anchorEl,
  setAnchorEl,
  handleClick,
  logout,
}) => {
  const open = Boolean(anchorEl);
  const router = useRouter();
  const userData = useAppSelector(selectUserData);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={() => router.push(`/profile/${userData?.id}`)}>
        <CustomAvatar user={userData} /> Profile
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClick}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={logout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default HeaderMenu;
