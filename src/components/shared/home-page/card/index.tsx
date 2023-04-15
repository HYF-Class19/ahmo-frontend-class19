import { useAppDispatch } from "@/hooks/useAppHooks";
import { menuType, setType } from "@/store/slices/menuSlice";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import styles from "./Card.module.scss";

export default function ActionAreaCard() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRedirect = async (type: menuType) => {
    dispatch(setType(type));
    await router.push("/chat");
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={3}>
        <Card
          onClick={() => handleRedirect(menuType.direct)}
          className={styles.rootCard}
          sx={{
            maxWidth: 400,
            border: "10px solid #810984",
            borderRadius: 3,
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="365"
              image="/chat-pic.jpg"
              alt="personal chat picture"
            />
            <div className={styles.overlay}>
              <h3>Personal Chat</h3>
            </div>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          onClick={() => handleRedirect(menuType.game)}
          className={styles.rootCard}
          sx={{
            maxWidth: 400,
            border: "10px solid #FFFFFF",
            borderRadius: 3,
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="365"
              image="/puzzles.png"
              alt="game chat picture"
              sx={{ backgroundColor: "primary.main" }}
            />
            <div className={styles.overlay}>
              <h3>Game Chat</h3>
            </div>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card
          onClick={() => handleRedirect(menuType.group)}
          className={styles.rootCard}
          sx={{ maxWidth: 400, border: "10px solid #810984", borderRadius: 3 }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="360"
              image="/hi-hey.png"
              alt="group chat picture"
              sx={{ backgroundColor: "primary.main" }}
            />
            <div className={styles.overlay}>
              <h3>Group Chat</h3>
            </div>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
