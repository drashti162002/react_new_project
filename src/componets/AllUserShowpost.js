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
import { Button } from "@mui/material";
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
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Slider from 'react-slick';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';



function AllUserShowpost(props){

 const navigate = useNavigate();

 const [value, setValue] = useState(null);

 var settings = {
  dots: true,
  fade: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  focusOnSelect: true,

};

 const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



  const userComment = (id) =>{
    console.log('===========')
    navigate("/Commentpost/"+id);
  }

  const userLike = async (id) =>{
    console.log('===========')
    try {
      const res = await axios.post(`http://localhost:3550/like/like/${id}`, 
      { post_id: id }, 
      {headers: {'logingtoken': props.token }});
      console.log(res);
      setValue(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }

  }

  
    return(
        <>
        <Card sx={{ maxWidth: 600 , margin:'auto', marginTop: 7}}>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            D
          </Avatar>
        }
        title= {props.user.userId.name}
        subheader="September 14, 2016"
      />
      <CardMedia>
      <Slider  {...settings}>
            {props.user.images.map((image, index) =>{
              return(
                  <div className="all_image"> 
                  <img src={`http://localhost:3550/` + image} className="img-1" alt={image} />
                  </div> 
                 )
            })}

        </Slider>


      </CardMedia>
      <CardContent>
      <Typography
          className="text"
          variant="h4"
          component="h5"
          sx={{ color: "black" }}
        >
          {props.user.caption}
        </Typography>
        <Link>#topical</Link> <Link>#lorem</Link> <Link>#ipsum</Link>
      </CardContent>
      <CardActions disableSpacing>
      <IconButton>
        <Button
       onClick={(e) => userLike(props.user._id)} 
      >
  
        <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
      </Button>
      </IconButton>
       
        <IconButton
  
    
  
          onClick={(e) =>userComment(props.user._id)} 
         aria-label="Comment">
         <CommentIcon />
        </IconButton>
        <IconButton 
        label="Nearby" >
          <ThumbUpIcon />
        </IconButton>
      </CardActions>
     
    </Card>

        {/* <Typography
          className="text"
          variant="h4"
          component="h5"
          sx={{ color: "black" }}
        >
          {props.user.caption}
        </Typography>
        <Link>#topical</Link> <Link>#lorem</Link> <Link>#ipsum</Link> */}

        {/* <Slider  {...settings}>
            {props.user.images.map((image, index) =>{
              return(
                  <div className="all_image"> 
                  <img src={`http://localhost:3550/` + image} className="img-1" alt={image} />
                  </div> 
                 )
            })}

        </Slider> */}
        {/* <img src={ user.images[0]} className="img-2" alt={user.images[0]}/>  */}
       
      </>
    )
}
export default AllUserShowpost;