import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Paginationpost from './Paginationpost';
import Pagination from './Pagination';


function Paginationdata() {
    const navigate = useNavigate();
  
    const token = localStorage.getItem("Token");
  
    const [postData, setPostData] = useState([])
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [pageTotalNumber, setPageTotalNumber] = useState(0);
  
  
    useEffect(() => {
      paginationUserData();
    }, [pageCount]);
  
    const paginationUserData = async (e) => {
      try {
        const res = await axios.get(`http://localhost:3550/paginate/pagination?page=${pageCount}`, {
          headers: { logingtoken: token },
        });
        console.log("res",res);
        // console.log(res.data.post);
        // console.log(res.data.post.pages);
        setPostData(res.data.post);
        setData(res.data.post.docs);
        setPageTotalNumber(res.data.post.pages);
      } catch (error) {
        console.log(error);
      }
    };

    const handleChange = (event, value) => {
        setPageCount(value);
    };
  
  
  
  
    return (
      <>
        {data?.map((user, index) => {
          return (
          <Paginationpost user={user}/>
              );
            })}
        <Pagination
        pageTotalNumber={pageTotalNumber}
        // pageCount={pageCount}
        handleChange={handleChange}
        />
      </>
    );
  }
  export default Paginationdata;
  