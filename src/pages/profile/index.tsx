import React, { useEffect, useState } from "react";
import { Box, Grid, colors } from "@mui/material";
import MainLayout from "@/layouts/MainLayout";
import { NextPage } from "next";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ChangePasswordForm , { ChangePasswordFormData} from "@/components/profile/ChangePasswordForm";
import SideMenuButton from "@/components/profile/SideMenuButton";
import MainContent from "@/components/profile/mainContent";
import { useAppSelector } from "@/hooks/useAppHooks";
import { selectUserData } from "@/store/slices/userSlice";
import CustomAvatar from "@/components/shared/CustomAvatar";

const Profile: NextPage = () => {
  const userData = useAppSelector(selectUserData)
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false)
  const [bio, setBio] = useState("Software Developer");
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890");
  const [email, setEmail] = useState("john.doe@example.com");
  const [image_url, setImage_url] = useState(userData?.image_url || '')

  const handleButtonClick = () => {
    setShowChangePasswordForm(!showChangePasswordForm);
  };

  const onSubmit = (data: ChangePasswordFormData) => {
    console.log(data);
  };

  if(!userData) return null;

  return (
    <MainLayout>
        <Box sx={{ bgcolor: '#120428' }}>
      
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
                <>
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
                    <CustomAvatar user={userData} width={180} height={180} />
                    <ProfileInfo
                      name={userData.fullName}
                      bio={bio}
                      setBio={setBio}
                      phoneNumber={phoneNumber}
                      setPhoneNumber={setPhoneNumber}
                      email={email}
                      setEmail={setEmail}
                      setImage_url={setImage_url}
                      image_url={image_url}
                    />
                  </Box>
                </>
              )}
              {showChangePasswordForm && (
                <ChangePasswordForm
                  onSubmit={onSubmit}
                />
              )}
            </MainContent>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default Profile;
