import { useAppSelector } from "@/hooks/useAppHooks";
import { useIsLaptop } from "@/hooks/useIsMobile";
import { selectIsAuth } from "@/store/slices/userSlice";
import { AccountCircle, Chat, Lock } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Grid, Link as Mlink, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Footer = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const router = useRouter();
  const isLaptop = useIsLaptop();
  return (
    <Box
      position="fixed"
      bottom={0}
      width="100%"
      height={isLaptop ? "auto" : "60px"}
      bgcolor="primary.main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="21px 15px"
      color="white"
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={8}
        color="secondary.main"
        sx={{
          "& > div": {
            "&:hover": {
              color: "secondary.light",
              cursor: "pointer",
            },
          },
        }}
      >
        <Grid item>
          <Box
            onClick={() => router.push("/learn-more")}
            display="flex"
            alignItems="center"
          >
            <AccountCircle fontSize="small" />
            <Typography variant="body1" style={{ marginLeft: "8px" }}>
              About Us
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center">
            <GitHubIcon fontSize="small" />
            <Mlink
              color={"inherit"}
              underline="none"
              target="_blank"
              href="https://github.com/HYF-Class19/ahmo-frontend-class19"
            >
              <Typography variant="body1" style={{ marginLeft: "8px" }}>
                GitHub
              </Typography>
            </Mlink>
          </Box>
        </Grid>
        {!isAuth && (
          <Grid item>
            <Box
              onClick={() => router.push("/auth/login")}
              display="flex"
              alignItems="center"
            >
              <Lock fontSize="small" />
              <Typography variant="body1" style={{ marginLeft: "8px" }}>
                Log In
              </Typography>
            </Box>
          </Grid>
        )}
        <Grid item>
          {isAuth && (
            <Box
              onClick={() => router.push("/chat")}
              display="flex"
              alignItems="center"
            >
              <Chat fontSize="small" />
              <Typography variant="body1" style={{ marginLeft: "8px" }}>
                Chats
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
