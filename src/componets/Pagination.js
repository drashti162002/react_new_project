import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



 function PaginationControlled(props) {
    // const [page, setPage] = React.useState(props.pageCount);
    
  
    return (
      <Stack spacing={2}>
        {/* <Typography>Page: {props.pageCount}</Typography> */}
        <Pagination count={props.pageTotalNumber} onChange={props.handleChange} />
      </Stack>
    );
  }
  export default PaginationControlled;