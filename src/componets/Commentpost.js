import { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';

function Commentpost() {

  const navigate = useNavigate();

    const [comment, setComment] = useState();
    const [open, setOpen] = useState(true);
    const [scroll, setScroll] = useState('paper');
    const [getComment, setGetComment] = useState([])

    const token = localStorage.getItem("Token");
    const { id } = useParams();    

    useEffect (() =>{
        showAllComment(id);
       }, [])

    const commentAdd = async (e) =>{
        console.log("id",id);   
        console.log("comment",comment);   
        try {
            const res = await axios.post("http://localhost:3550/comment/comment", 
            { post_id: id , comment}, 
            {headers: {'logingtoken': token }});
            console.log(res);
            setComment('')
          } catch (error) {
            
          }
          showAllComment(id);
        }
     
       const showAllComment = async (id) =>{     
         try {
            console.log("1211",id);
           const res = await axios.get(`http://localhost:3550/comment/getCommentData/${id}`, {
             headers: {'logingtoken': token }});
             console.log(res);
            console.log(res.data.commentData);
            setGetComment(res.data.commentData)
           
         } catch (error) {
           console.log(error)
         }
       }
      
       const backToDashbordPage = () =>{
        navigate('/Dashbord');
      }
    
    return(
        <>
      <Dialog
        open={open}
        // onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">User Comment
        
        <CloseIcon sx={{marginLeft:20}} onClick={() => backToDashbordPage()}/>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            // ref={descriptionElementRef}
            tabIndex={-1}
          >
         {getComment?.map((userComment, index)=>{
            return(
                <>
                <List>
                <ListItem >
                <ListItemAvatar>
                <Avatar src="/broken-image.jpg" />
                </ListItemAvatar>
                <ListItemText primary={userComment.userId.name} secondary={userComment.comment} />
              </ListItem>
              </List>
                {/* <h2>{userComment.comment}</h2> */}
              </>
            )

         })}
          </DialogContentText>
        </DialogContent>
        <TextField
            //   sx={{ position: 'fixed', bottom: 0 }}
              name="comment"
              variant="standard"
              value={comment}
              label="Comment"
              placeholder="Enter Comment"
              onChange={(e) => setComment(e.target.value)}
              />
       <DialogActions>
         <Button onClick={() => commentAdd()}  size="small">Add Comment</Button>
        </DialogActions>
      </Dialog>
      </>
    )
}
export default Commentpost;