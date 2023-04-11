import React, { useState } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";
import { deleteUserData, selectUserData } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/hooks/useAppHooks";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HeaderMenu from "../HeaderMenu";

const Header = () => {
  const userData = useSelector(selectUserData);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = router.pathname;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl)
  };


  const logout = async () => {
    await router.push("/auth/login");
    destroyCookie(null, "authToken");
    dispatch(deleteUserData());
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <img src="/ahmo-logo.png" alt="logo" />
      </div>
      <nav>
        {userData ? (
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
                <Link href={"/profile"}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Avatar />
                    <Typography style={{ marginLeft: "15px" }}>
                      Helen
                    </Typography>
                  </Box>
                </Link>
              </li>
              <li>
                <Link href={pathname}>
                  <IconButton  onClick={handleClick}
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined} color={"warning"}>
                    <SettingsOutlinedIcon
                      sx={{ width: "30px", height: "30px" }}
                    />
                  </IconButton>
                </Link>
                <HeaderMenu logout={logout} anchorEl={anchorEl} setAnchorEl={setAnchorEl} handleClick={handleClick} />
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
