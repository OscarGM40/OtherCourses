import { Grid, makeStyles } from "@material-ui/core";
import Add from "./components/Add";
import Feed from "./components/Feed";
import Leftbar from "./components/Leftbar";
import Navbar from './components/Navbar'
import Rightbar from "./components/Rightbar";

const useStyles = makeStyles((theme) => ({
  right:{
    [theme.breakpoints.down('xs')]:{
      display: 'none',
    }
  }

}))


const App = () => {
  const classes = useStyles();

  return (
  <div >
    <Navbar />
{/* Ejemplo de division de una row en Material UI */}
   <Grid container>
     <Grid item sm={2} xs={2}>
       <Leftbar /> 
     </Grid>
     <Grid item sm={7} xs={10}>
      <Feed />
     </Grid>
     <Grid item sm={3} md={3} className={classes.right}>
       <Rightbar />
     </Grid>
   </Grid> 
   <Add />
  </div>);
};

export default App;
