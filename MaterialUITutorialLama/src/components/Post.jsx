import {
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Paper,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(5),
  },
  media: {
    height: 250,
    [theme.breakpoints.down("sm")]: {
      height: 150,
    },
  },
}));

const Post = () => {
  const classes = useStyles();

  return (
      <Card className={classes.card} elevation={2}>
          <Paper elevation={3}>
        <CardActionArea>

          <CardMedia 
            className={classes.media}
            image="https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            title="My Post"
            />
        </CardActionArea>
            </Paper>
        <CardContent>
          <Typography gutterBottom variant="h5">
            My First Post
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit exercitationem nostrum animi at ex tenetur! Voluptatum
            accusamus quas repudiandae sequi nulla autem quisquam veniam
            voluptates mollitia. Saepe pariatur voluptas laudantium. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Minus quam maxime
            provident dolor illum! Provident fugit non ipsam fuga, laboriosam
            amet atque ut facilis id autem quos sapiente doloremque cupiditate?{" "}
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
  );
};

export default Post;
