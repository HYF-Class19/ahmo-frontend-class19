import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import {
  deleteUserData,
  selectIsAuth,
  selectUserData,
} from "@/store/slices/userSlice";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Box, IconButton, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import React from "react";
import { useSelector } from "react-redux";
import CustomAvatar from "../CustomAvatar";
import HeaderMenu from "../HeaderMenu";
import styles from "./Header.module.scss";

const Header = () => {
  const userData = useSelector(selectUserData);
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = router.pathname;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const logout = async () => {
    await router.push("/auth/login");
    destroyCookie(null, "authToken");
    dispatch(deleteUserData());
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Image src="/ahmo-logo.png" alt="logo" width={65} height={65} />
      </div>
        <nav>
          {isAuth !== false ? (
            <>
              <ul>
                <li className={pathname === "/" ? styles.active : ""}>
                  <Link href={"/"}>Home</Link>
                </li>
                <li className={pathname === "/chat" ? styles.active : ""}>
                  <Link href={"/chat"}>Chat</Link>
                </li>
                <li className={pathname === "/learn-more" ? styles.active : ""}>
                  <Link href={"/learn-more"}>Learn more</Link>
                </li>
              </ul>
              <ul>
                <li className={pathname === "/profile" ? styles.active : ""}>
                  {userData ? (
                    <Link href={`/profile/${userData.id}`}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <CustomAvatar user={userData} />
                        <Typography variant={"h6"} style={{ marginLeft: "15px" }}>
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
                </li>
                <li>
                  <IconButton
                    onClick={handleClick}
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    color={"warning"}
                  >
                    <SettingsOutlinedIcon
                      sx={{ width: "30px", height: "30px" }}
                    />
                  </IconButton>
                  <HeaderMenu
                    logout={logout}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    handleClick={handleClick}
                  />
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul>
                <li className={pathname === "/" ? styles.active : ""}>
                  <Link href={"/"}>Documentation</Link>
                </li>
                <li className={pathname === "/learn-more" ? styles.active : ""}>
                  <Link href={"/learn-more"}>Learn more</Link>
                </li>
              </ul>
              <ul>
                <li className={pathname === "/auth/login" ? styles.active : ""}>
                  <Link href={"/auth/login"}>Login</Link>
                </li>
                <li
                  className={pathname === "/auth/register" ? styles.active : ""}
                >
                  <Link href={"/auth/register"}>Register</Link>
                </li>
              </ul>
            </>
          )}
        </nav>
    </header>
  );
};

export default Header;
