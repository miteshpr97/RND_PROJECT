// ViewWorkOrderModal.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EditDialog from './EditDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';


const ViewTransporterModal = ({ onClose }) => {
  const [data, setData] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selecteTransporter_id, setselecteTransporter_id] = useState(null);
//  const [selectedJobId, setSelectedJobId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); 





  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;


  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Initialize page size


  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedData = data.slice(startIndex, endIndex);




  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };


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
        const response = await fetch(`${REACT_APP_API_URL}api/transport`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const apiData = await response.json();

        setData(apiData);
      
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    };

    fetchData();
  }, []);



  const handleEditClick = (Transporter_id) => {
    console.log(Transporter_id ,"singledata")
    setEditDialogOpen(true);
    setselecteTransporter_id(Transporter_id);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };


  const handleDeleteConfirmDialogOpen = (Transporter_id) => {
    setselecteTransporter_id(Transporter_id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmDialogClose = () => {
    setDeleteConfirmationOpen(false);
  };



  const handleDeleteClick = (Transporter_id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(Transporter_id);
    }
  };

  const deleteItem = async (Transporter_id) => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}api/transport/${Transporter_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(`Deleted item with JobNo: ${WorkOrder}`);

      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };







  return (
    <Dialog 
    open={true} onClose={onClose}
    sx={{
      "& .MuiDialog-container": {
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "980px",  // Set your width here
        },
      },
    }}
  
    >
      <DialogTitle>View Transporter </DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='small-text'>Transporter_id</TableCell>
              <TableCell className='small-text'>Name</TableCell>
              <TableCell className='small-text'>Contact Person</TableCell>
              <TableCell className='small-text'>Phone Number</TableCell>
              <TableCell className='small-text'>Address</TableCell>
              <TableCell className='small-text'>Edit</TableCell>
              <TableCell className='small-text'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className='small-text'>{item.Transporter_id}</TableCell>
                <TableCell className='small-text'>{item.Name}</TableCell>
                <TableCell className='small-text'>{item.Contact_Person}</TableCell>
                <TableCell className='small-text'>{item.Phone_Number}</TableCell>
                <TableCell className='small-text'>{item.Address}</TableCell>

                <TableCell>
                    <EditNoteIcon
                     variant="contained"
                     style={{color: 'black', cursor: 'pointer'  }}
                     onClick={() => handleEditClick(item.Transporter_id)}
                    
                    />
                
                  </TableCell>
                  <TableCell>
                    <DeleteIcon
                     variant="contained"
                     style={{ color: 'red', cursor: 'pointer' }}
                     onClick={() => handleDeleteConfirmDialogOpen(item.Transporter_id)}
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

          <Button variant="contained" onClick={onClose}>
          Close
        </Button>

        <EditDialog open={editDialogOpen} handleClose={handleCloseEditDialog} Transporter_id={selecteTransporter_id} />
     
        <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        handleClose={handleDeleteConfirmDialogClose}
        handleDelete={() => {
          // Handle the delete action here and then close the dialog
          handleDeleteClick(selecteTransporter_id);
          handleDeleteConfirmDialogClose();
        }}
      />
     
     
     
     
       
      </DialogContent>
    </Dialog>
  );
};

export default ViewTransporterModal;
