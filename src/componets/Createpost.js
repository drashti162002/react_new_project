import * as React from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { blue, red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TextField from '@mui/material/TextField';
import {useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem'; 
import '../componets/css/Createpost.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom";


// var posts = []

function Createpost() {
    const pagename = { color: blue[500] };
    const navigate = useNavigate();
    
    
    const token = localStorage.getItem('Token');
    console.log(token)
    
    const [description, setDescription] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [file, setFile] = useState([]);
    
    
    var post = {
        Description:description,
        Image:selectedImages
    }
    
    console.log("post", post);
    console.log('selectedImages', selectedImages)
    console.log("description", description)
    
    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        //    console.log("selectedFiles", selectedFiles);
        const selectedFilesArray = Array.from(selectedFiles);
        //   console.log("selectedFilesArray", selectedFilesArray)
        
        var fileArr = [];
        const imagesArray = selectedFilesArray.map((file) => {
           fileArr.push(file)
           return URL.createObjectURL(file);
        });
        setFile(fileArr)
        console.log("file",file);
        console.log('fileArr', fileArr)
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    fileArr = []

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const backToDashbordPage = () =>{
    navigate('/Dashbord');
  }
 
  const addNewPost = async (e) =>{
    console.log("file11",file);
    var bodyFormData = new FormData();
    bodyFormData.append('caption', description);
    for (let index = 0; index < file.length; index++) {
        const element = file[index];
        bodyFormData.append('images', element); 
    }

    try {
        const res = await axios.post("http://localhost:3550/post/insPost",
        bodyFormData,
        { headers: {'logingtoken': token }});
        console.log(res);
        navigate('/Dashbord');
      } catch (error) {
        
      }
    }

  return (
    <Box sx={{display:"flex", justifyContent:"center"}}>
      <div className="full_post">
        <Toolbar sx={{ borderBottom: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={pagename}
          >
            Create Post
          </Typography>
          <IconButton aria-label="close">
            <CloseIcon  onClick={() => backToDashbordPage()}/>
          </IconButton>
        </Toolbar>
        <TextField
          id="standard-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          sx={{ marginTop: "50px" }}
          onChange={(e) => setDescription(e.target.value)}
          placeholder=" What's on your mind"
          variant="standard"
          fullWidth
        />
    <section>
      {selectedImages.length > 0 &&
        (selectedImages.length > 10 ? (
          <p className="error">
            You can't upload more than 10 images! <br />
            <span>
              please delete <b> {selectedImages.length - 10} </b> of them{" "}
            </span>
          </p>
        ) : (
          <button
            className="upload-btn"
            onClick={() => {
              console.log(selectedImages);
            }}
          >
            UPLOAD {selectedImages.length} IMAGE
            {selectedImages.length === 1 ? "" : "S"}
          </button>
        ))}

     
      <ImageList sx={{ width: 500 }} cols={3} rowHeight={164}>
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
             <ImageListItem key={image}>
             
                <img src={image} height="200" alt="upload"/>
                <button onClick={() => deleteHandler(image)}>
                  delete image
                </button>
                <p>{index + 1}</p>
    
              </ImageListItem>
            );
          })}
      </ImageList>
    </section>
        <Stack spacing={2} direction="row">
      <label
      className="upload_photo">
      <InsertPhotoIcon lable="photo" />
      <br />
        Photo/Video
        <br />
        <span>up to 10 images</span>
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />          
      </label>
      <br />
        </Stack>
        <Stack sx={{ marginTop: "25px" }}>
          <Button onClick={() => addNewPost()} variant="contained">Post</Button>
        </Stack>
      </div>
    </Box>
  );
}

export default Createpost;