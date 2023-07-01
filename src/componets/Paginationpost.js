import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Avatar from "@mui/material/Avatar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Link from "@mui/material/Link";
import CommentIcon from '@mui/icons-material/Comment';
import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import Commentpost from "./Commentpost";


function AllUserShowpost(props){

  
    return(
        <>
        <Toolbar>
          <Avatar src="/broken-image.jpg" />
          <Typography
            variant="h7"
            component="div"
            sx={{ flexGrow: 1, marginLeft: 4 }}
          >
            <Typography
              variant="h7"
              component="div"
              sx={{ color: "text.disabled" }}
            >
              {props.user._id}
            </Typography>
          </Typography>
        </Toolbar>

        <Typography
          className="text"
          variant="h4"
          component="h5"
          sx={{ color: "black" }}
        >
          {props.user.caption}
        </Typography>
        <Link>#topical</Link> <Link>#lorem</Link> <Link>#ipsum</Link>

        <div className="all_image">
            {props.user.images.map((image, index) =>{
                 return(
                  <img src={`http://localhost:3550/` + image} className="img-1" alt={image} />
                 )
            })}

        </div>
        {/* <img src={ user.images[0]} className="img-2" alt={user.images[0]}/>  */}
        <BottomNavigation
        //  value={value}
        //  onChange={(event, newValue) => {
        //    setValue(newValue);
        //  }}
          sx={{
            borderTop: 1,
            borderBottom: 1,
            borderColor: "grey.500",
            marginTop: 2,
          }}
        >
          <BottomNavigationAction
            // value={value}
            // onChange={(event, newValue) => {
            //   setValue(newValue);
            // }}
            label="Recents"
            icon={<FavoriteIcon />}
            sx={{ borderRight: 1, borderColor: "grey.500" }}
            // onClick={(e) =>userLike(props.user._id)}
          />
          <BottomNavigationAction
            label="Favorites"
            icon={<CommentIcon />}
            sx={{ borderRight: 1, borderColor: "grey.500" }}
            // component={Link} 
            // to={Commentpost}
            // onClick={(e) =>userComment(props.user._id)}
          />
          <BottomNavigationAction label="Nearby" icon={<ThumbUpIcon />} />
        </BottomNavigation>
      </>
    )
}
export default AllUserShowpost;