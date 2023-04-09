import React, { useState } from "react";
import { Box, Grid, colors } from "@mui/material";
import MainLayout from "@/layouts/MainLayout";
import { NextPage } from "next";
import ProfileAvatar from "@/components/profile/avatar";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import SideMenuButton from "@/components/profile/SideMenuButton";
import MainContent from "@/components/profile/mainContent";

const Profile: NextPage = () => {
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const handleButtonClick = () => {
    setShowChangePasswordForm(!showChangePasswordForm);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const [bio, setBio] = useState("Software Developer");
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890");
  const [email, setEmail] = useState("john.doe@example.com");

  return (
    <MainLayout>
       <Box sx={{ backgroundColor: colors.lightBlue[100] }}>
      
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
                    <ProfileAvatar src={""} />
                    <ProfileInfo
                      name="John Doe"
                      bio={bio}
                      setBio={setBio}
                      phoneNumber={phoneNumber}
                      setPhoneNumber={setPhoneNumber}
                      email={email}
                      setEmail={setEmail}
                    />
                  </Box>
                </>
              )}
              {showChangePasswordForm && (
                <ChangePasswordForm
                  onSubmit={function (FormData): void {
                    throw new Error("Function not implemented.");
                  }}
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
