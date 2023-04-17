import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import ProfileInfo from "@/components/profile/ProfileInfo";
import SideMenuButton from "@/components/profile/SideMenuButton";
import MainContent from "@/components/profile/mainContent";
import CustomAvatar from "@/components/shared/CustomAvatar";
import { useAppSelector } from "@/hooks/useAppHooks";
import { useIsLaptop } from "@/hooks/useIsMobile";
import MainLayout from "@/layouts/MainLayout";
import { useGetProfileQuery } from "@/services/authService";
import { selectUserData } from "@/store/slices/userSlice";
import { Box, Grid, Skeleton, TextField, Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

interface ProfilePageProps {
  id: number;
}

const ProfilePage: NextPage<ProfilePageProps> = ({ id }) => {
  const { data: user, isLoading, error } = useGetProfileQuery(id);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const userData = useAppSelector(selectUserData);
  const isLaptop = useIsLaptop();

  const handleButtonClick = () => {
    setShowChangePasswordForm(!showChangePasswordForm);
  };
  return (
    <MainLayout
      title={`AHMO - ${user ? user.fullName : ""} profile`}
      description={user?.fullName + " profile page"}
    >
      <Box sx={{ bgcolor: "#120428", minHeight: isLaptop ? "100vh" : "auto" }}>
        <Grid container>
          <Grid item xs={isLaptop ? 12 : 1}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: isLaptop ? "auto" : "100vh",
                mt: 2,
              }}
            >
              {userData?.id === user?.id && (
                <SideMenuButton
                  showForm={showChangePasswordForm}
                  onClick={handleButtonClick}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={isLaptop ? 12 : 11}>
            <MainContent>
              {!showChangePasswordForm && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "space-evenly",
                    flexDirection: isLaptop ? "column" : "row",
                    marginTop: 5,
                  }}
                >
                  {user ? (
                    <Box
                      width={isLaptop ? "100%" : "50%"}
                      sx={{
                        mr: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Typography sx={{ mb: 4 }} variant="h2">
                        {userData?.id === user.id
                          ? userData?.fullName
                          : user.fullName}
                      </Typography>
                      <CustomAvatar user={user} width={280} height={280} />
                      <TextField
                        name="bio"
                        label="Bio"
                        value={
                          user.bio ||
                          "Always up for a good conversation. Lover of books, music, and all things tech. Bringing the best vibes to your chats."
                        }
                        multiline
                        rows={4}
                        fullWidth
                        sx={{
                          mt: 4,
                          maxWidth: 500,
                        }}
                        inputProps={{
                          style: {
                            color: "white",
                          },
                        }}
                        variant="filled"
                        color="secondary"
                      />
                    </Box>
                  ) : (
                    <Skeleton variant="circular" width={180} height={180} />
                  )}
                  <ProfileInfo user={user} />
                </Box>
              )}
              {showChangePasswordForm && userData?.id === user?.id && (
                <ChangePasswordForm
                  setShowChangePasswordForm={setShowChangePasswordForm}
                  user={userData}
                />
              )}
            </MainContent>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx?.params?.id || 1;
  return {
    props: {
      id: +id,
    },
  };
};

export default ProfilePage;
