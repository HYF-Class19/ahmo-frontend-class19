import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function ActionAreaCard() {
  return (
    <Grid container>
    <Card sx={{ maxWidth: 400  }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image="/puzzles.png"
          alt="game chat picture"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Game Chat
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
  );
}