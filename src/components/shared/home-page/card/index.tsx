import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function ActionAreaCard() {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ maxWidth: 400, }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="365"
              image="/puzzles.png"
              alt="game chat picture"
            />
            
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ maxWidth: 400 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="365"
              image="/chat-pic.jpg"
              alt="personal chat picture"
            />
            
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ maxWidth: 400 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="360"
              image="/hi-hey.png"
              alt="group chat picture"
            />
            
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
