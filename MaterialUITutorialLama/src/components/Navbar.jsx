import { makeStyles } from "@material-ui/core/styles";

import { alpha, AppBar, Avatar, Badge, InputBase, Toolbar, Typography } from "@material-ui/core";
import { Cancel, Mail, Notifications, Search } from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles( (theme) => ({
  toolbar:{
    display: 'flex',
    justifyContent:'space-between',
  },
  logoLg:{
    [theme.breakpoints.down('xs')]:{
      display:'none',
    }
  },
  logoSm:{
    [theme.breakpoints.up('sm')]:{
      display:'none',
    }
  },
  search:{

    display: 'flex',
    alignItems: 'center', 
    backgroundColor: alpha(theme.palette.common.white,0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white,0.25)
    },
     borderRadius: theme.shape.borderRadius*4,
     width:'50%',
     [theme.breakpoints.down('xs')]:{
       display: (props) => props.open ? "flex": "none",
       width:'70%'
     }
  },
  searchIcon:{
    padding: theme.spacing(0, 1),
    // pointerEvents: 'none',
  },
  searchInput:{
    color:'white',
    padding: theme.spacing(0.1, 0, 0.1, 0),
    marginLeft:theme.spacing(1)
  },
  searchHidden:{
    [theme.breakpoints.up('sm')]:{
      display:"none"
    },
    marginRight:theme.spacing(2) 
  },
  cancel:{
    [theme.breakpoints.up('sm')]:{
      display:"none"
    },
    marginRight:theme.spacing(1)

  },
  icons: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]:{
      display: (props) => (props.open) ? "none" : "flex"
    }
  },
  badge: {
    marginRight: theme.spacing(2)
  }
}));



const Navbar = () => {
  const [ open, setOpen ] = useState(false)
  const classes = useStyles({open});

  return (
    <AppBar position="fixed" style={{backgroundColor:"#1755ee"}}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.logoLg}>
          Lama Dev
        </Typography> 
        <Typography variant="h6" className={classes.logoSm}>
          Lama
        </Typography>
        <div className={classes.search}>
          <Search className={classes.searchIcon}/>
            <InputBase placeholder="Search..." className={classes.searchInput}></InputBase>
            <Cancel className={ classes.cancel } onClick={() => setOpen(false)} />
        </div>
       <div className={classes.icons}>
         <Search className={classes.searchHidden} 
         onClick={ () => setOpen(true) }/>
         <Badge badgeContent={4} color="secondary" className={classes.badge}>
           <Mail />
         </Badge>
         <Badge badgeContent={2} color="secondary" className={classes.badge}>
           <Notifications />
         </Badge>
         <Avatar alt="Remmy" src="https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
         </div> 
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
