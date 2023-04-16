import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import {
  deleteUserData,
  selectIsAuth,
  selectUserData,
} from "@/store/slices/userSlice";
import ArticleIcon from "@mui/icons-material/Article";
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import { ListItemIcon, Skeleton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import * as React from "react";
import CustomAvatar from "./CustomAvatar";

interface CustomDrawer {
  open: boolean;
  setOpen: Function;
}

const CustomDrawer: React.FC<CustomDrawer> = ({ open, setOpen }) => {
  const isAuth = useAppSelector(selectIsAuth);
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const pathname = router.pathname;

  const logout = async () => {
    destroyCookie(null, "authToken");
    dispatch(deleteUserData());
  };

  const list = () => (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: "primary.light",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      role="presentation"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      {isAuth !== false ? (
        <>
          {userData ? (
            <Link
              style={{ textDecoration: "none" }}
              href={`/profile/${userData.id}`}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 5,
                }}
              >
                <CustomAvatar user={userData} />
                <Typography
                  variant={"h6"}
                  sx={{
                    marginLeft: "15px",
                    color: router.asPath.startsWith("/profile")
                      ? "gold"
                      : "white",
                    "&:hover": {
                      color: "#b885f4",
                    },
                  }}
                >
                  {userData.fullName}
                </Typography>
              </Box>
            </Link>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", ml: "15px", width: "60px" }}
              />
            </Box>
          )}
          <Divider sx={{ width: "100%", borderColor: "warning.main" }} />
          <List>
            {[
              { href: "/", name: "Home", icon: <HomeIcon color={"warning"} /> },
              {
                href: "/chat",
                name: "Chat",
                icon: <ChatIcon color={"warning"} />,
              },
              {
                href: "/learn-more",
                name: "Learn more",
                icon: <ArticleIcon color={"warning"} />,
              },
              {
                href: "/auth/login",
                name: "Logout",
                icon: <LoginIcon color={"warning"} />,
                cb: logout,
              },
            ].map((item, index) => (
              <ListItem
                onClick={() => {
                  router.push(item.href);
                  if (item.cb) {
                    item.cb();
                  }
                }}
                key={index}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    sx={{
                      color: pathname === item.href ? "warning.main" : "white",
                      textTransform: "uppercase",
                      "&:hover": {
                        color: "secondary.light",
                      },
                    }}
                    primary={item.name}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <List>
          {[
            { href: "/", name: "Home", icon: <HomeIcon color={"warning"} /> },
            {
              href: "/learn-more",
              name: "Learn more",
              icon: <ArticleIcon color={"warning"} />,
            },
            {
              href: "/auth/login",
              name: "Login",
              icon: <LoginIcon color={"warning"} />,
            },
            {
              href: "/auth/register",
              name: "Register",
              icon: <HowToRegIcon color={"warning"} />,
            },
          ].map((item, index) => (
            <ListItem
              onClick={() => router.push(item.href)}
              key={index}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  sx={{
                    color: pathname === item.href ? "warning.main" : "white",
                    textTransform: "uppercase",
                    "&:hover": {
                      color: "secondary.light",
                    },
                  }}
                  primary={item.name}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default CustomDrawer;
