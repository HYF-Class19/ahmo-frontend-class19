import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import ProfileInfo from "@/components/profile/ProfileInfo";
import SideMenuButton from "@/components/profile/SideMenuButton";
import MainContent from "@/components/profile/mainContent";
import CustomAvatar from "@/components/shared/CustomAvatar";
import { useAppSelector } from "@/hooks/useAppHooks";
import MainLayout from "@/layouts/MainLayout";
import { useGetProfileQuery } from "@/services/authService";
import { selectUserData } from "@/store/slices/userSlice";
import { Box, Grid, Skeleton } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

interface ProfilePageProps {
  id: number;
}

const ProfilePage: NextPage<ProfilePageProps> = ({ id }) => {
  const { data: user, isLoading, error } = useGetProfileQuery(id);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const userData = useAppSelector(selectUserData);

  const handleButtonClick = () => {
    setShowChangePasswordForm(!showChangePasswordForm);
  };
  return (
    <MainLayout>
      <Box sx={{ bgcolor: "#120428" }}>
        <Grid container>
          <Grid item xs={1}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <SideMenuButton
                showForm={showChangePasswordForm}
                onClick={handleButtonClick}
              />
            </Box>
          </Grid>
          <Grid item xs={11}>
            <MainContent>
              {!showChangePasswordForm && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    marginTop: 5,
                  }}
                >
                  {user ? (
                    <CustomAvatar user={user} width={180} height={180} />
                  ) : (
                    <Skeleton variant="circular" width={180} height={180} />
                  )}
                  <ProfileInfo user={user} />
                </Box>
              )}
              {showChangePasswordForm && (
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
