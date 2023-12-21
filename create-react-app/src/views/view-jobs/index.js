
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Tabs, Tab, Container, Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, styled, TablePagination } from '@mui/material';
import EditDialog from './EditDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';




const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    overflowX: 'auto', // Enable horizontal scroll on small screens
    backgroundColor: 'pink',
    '& .small-text': {
      fontSize: '0.7rem', // Adjust the font size as needed
    },
  },
}));


const ResponsiveBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    // Adjust padding as needed
  },
  maxWidth: '100%',
}));

const formatDateToDDMMYYYY = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const ViewJobs = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // Add state for delete confirmation dialog
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Initialize page size


  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedData = data.slice(startIndex, endIndex);

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


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

        // Format the dates in "dd/mm/yyyy" format while fetching the data
        const formattedData = apiData.map(item => ({
          ...item,
          JobsStartDate: formatDateToDDMMYYYY(item.JobsStartDate),
          JobExpectedCompleteDate: formatDateToDDMMYYYY(item.JobExpectedCompleteDate)
        }));

        // Reverse the order of the data before setting it in the state
        const reversedData = formattedData.reverse();
        setData(reversedData);
        console.log('Fetched data from API:', reversedData);
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    };

    fetchData();
  }, []);



  const handleEditClick = (jobId) => {
    setEditDialogOpen(true);
    setSelectedJobId(jobId);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };




  const handleDeleteClick = (jobId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(jobId);
    }
  };

  const deleteItem = async (jobId) => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}api/new_jobs/${jobId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(`Deleted item with JobNo: ${jobId}`);

      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };



  const handleDeleteConfirmDialogOpen = (jobId) => {
    setSelectedJobId(jobId);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmDialogClose = () => {
    setDeleteConfirmationOpen(false);
  };


  return (

    <MainCard title="View Jobs" secondary={
      <Link to="/new-jobs/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" style={{ backgroundColor: '#15698c', color: 'white' }}>
          New Jobs
        </Button>
      </Link>
    }>
      <Container maxWidth="lg">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Plan Jobs Tabs"
        >
          <Tab label="All Jobs" />
          {/* Add other tabs here */}
        </Tabs>
      </Container>

      <ResponsiveBox>
        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='small-text'>Job Number</TableCell>
                <TableCell className='small-text'>Job Date</TableCell>
                <TableCell className='small-text'>Job Summary</TableCell>
                <TableCell className='small-text'>Pick Up Lock</TableCell>
                <TableCell className='small-text'>Delivery Lock</TableCell>
                <TableCell className='small-text'>Edit Jobs</TableCell>
                <TableCell className='small-text'>Delete Jobs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className='small-text'>{item.JobNo}</TableCell>
                  <TableCell className='small-text'>{item.JobsStartDate}</TableCell>
                  <TableCell className='small-text'>{item.JobSummary}</TableCell>
                  <TableCell className='small-text'>{item.PickupLocation}</TableCell>
                  <TableCell className='small-text'>{item.DeliveryLocation}</TableCell>
                  <TableCell>
                    <EditNoteIcon
                     variant="contained"
                     style={{color: 'black', cursor: 'pointer'  }}
                     onClick={() => handleEditClick(item.JobNo)}
                    
                    />
                
                  </TableCell>
                  <TableCell>
                    <DeleteIcon
                     variant="contained"
                     style={{ color: 'red', cursor: 'pointer' }}
                     onClick={() => handleDeleteConfirmDialogOpen(item.JobNo)}
                    /> 
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={data.length}
            page={currentPage - 1}
            onPageChange={handleChangePage}
            rowsPerPage={pageSize}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <div>Total Pages: {totalPages}</div> {/* Display the total pages */}


        </StyledTableContainer>
      </ResponsiveBox>

      <EditDialog open={editDialogOpen} handleClose={handleCloseEditDialog} jobId={selectedJobId} />

      {/* Render the DeleteConfirmationDialog component */}
      <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        handleClose={handleDeleteConfirmDialogClose}
        handleDelete={() => {
          // Handle the delete action here and then close the dialog
          handleDeleteClick(selectedJobId);
          handleDeleteConfirmDialogClose();
        }}
      />
    </MainCard>
  );
};

export default ViewJobs;



