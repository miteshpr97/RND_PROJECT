import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { Link } from 'react-router-dom';
//import MainCard from 'ui-component/cards/MainCard';

import {  Table, TableHead, TableRow, TableCell, TableBody, TablePagination, IconButton } from '@mui/material';

const formatDateToDDMMYYYY = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function Plan() {
  const [data, setData] = useState([]);
  //   const [value, setValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4); // Initialize page size

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedData = data.slice(startIndex, endIndex);

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}api/new_jobs/jobStatusOne`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const apiData = await response.json();

        const formattedData = apiData.map((item) => ({
          ...item,
          JobsStartDate: formatDateToDDMMYYYY(item.JobsStartDate),
          JobExpectedCompleteDate: formatDateToDDMMYYYY(item.JobExpectedCompleteDate)
        }));

        const reversedData = formattedData.reverse();
        setData(reversedData);
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Accordion  sx={{ border: '0.5px solid #055F85', marginTop: '20px' }} >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography style={{ fontSize: '18px', color: 'black' }}>Plan Jobs</Typography>
        </AccordionSummary>
        <AccordionDetails>
        
            <div style={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: '14%' }}>Job Number</TableCell>
                    <TableCell style={{ width: '14%' }}>Job Date</TableCell>
                    <TableCell style={{ width: '14%' }}>Job Summary</TableCell>
                    <TableCell style={{ width: '14%' }}>Pick Up Lock</TableCell>
                    <TableCell style={{ width: '14%' }}>Delivery Lock</TableCell>
                    <TableCell style={{ width: '14%' }}>Plan Job</TableCell>
                    <TableCell style={{ width: '14%' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedData.map((item, index) => (
                    <TableRow key={index} style={{ borderBottom: '1px solid black' }}>
                      <TableCell>{item.JobNo}</TableCell>
                      <TableCell>{item.JobsStartDate}</TableCell>
                      <TableCell>{item.JobSummary}</TableCell>
                      <TableCell>{item.PickupLocation}</TableCell>
                      <TableCell>{item.DeliveryLocation}</TableCell>
                      <TableCell>

                      <Link to={`/final-jobs/${item.JobNo}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    <AssignmentIcon variant="contained" sx={{ color:'#076086', marginLeft:'20px' }} />
                  </Link>


                        {/* <Button variant="contained" sx={{ backgroundColor: '#15698c', color: 'white' }}>
                          <Link to={`/final-jobs/${item.JobNo}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            Plan
                          </Link>
                        </Button> */}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          sx={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: '#ffd800'
                          }}
                        ></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              component="div"
              count={data.length}
              page={currentPage - 1}
              onPageChange={handleChangePage}
              rowsPerPage={pageSize}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <div>Total Pages: {totalPages}</div> {/* Display the total pages */}
        
          
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
