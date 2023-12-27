// ViewWorkOrderModal.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EditDialog from './EditDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';


const ViewWorkOrderModal = ({ onClose }) => {
  const [data, setData] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selecteWorkOrderNo, setselecteWorkOrderNo] = useState(null);
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
        const response = await fetch(`${REACT_APP_API_URL}api/workOrder`);
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



  const handleEditClick = (WorkOrderNo) => {
    console.log(WorkOrderNo ,"singledata")
    setEditDialogOpen(true);
    setselecteWorkOrderNo(WorkOrderNo);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };


  const handleDeleteConfirmDialogOpen = (WorkOrderNo) => {
    setselecteWorkOrderNo(WorkOrderNo);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmDialogClose = () => {
    setDeleteConfirmationOpen(false);
  };



  const handleDeleteClick = (WorkOrderNo) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(WorkOrderNo);
    }
  };

  const deleteItem = async (WorkOrderNo) => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}api/workOrder/${WorkOrderNo}`, {
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
      <DialogTitle>View Work Order</DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='small-text'>Service Description</TableCell>
              <TableCell className='small-text'>Service LNo.</TableCell>
              <TableCell className='small-text'>UoM</TableCell>
              <TableCell className='small-text'>Contract Rate</TableCell>
              <TableCell className='small-text'>Edit</TableCell>
              <TableCell className='small-text'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className='small-text'>{item.ServiceDescription}</TableCell>
                <TableCell className='small-text'>{item.ServiceLineNo}</TableCell>
                <TableCell className='small-text'>{item.UoM}</TableCell>
                <TableCell className='small-text'>{item.ContractRate}</TableCell>

                <TableCell>
                    <EditNoteIcon
                     variant="contained"
                     style={{color: 'black', cursor: 'pointer'  }}
                     onClick={() => handleEditClick(item.WorkOrderNo)}
                    
                    />
                
                  </TableCell>
                  <TableCell>
                    <DeleteIcon
                     variant="contained"
                     style={{ color: 'red', cursor: 'pointer' }}
                     onClick={() => handleDeleteConfirmDialogOpen(item.WorkOrderNo)}
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

        <EditDialog open={editDialogOpen} handleClose={handleCloseEditDialog} WorkOrderNo={selecteWorkOrderNo} />
     
        <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        handleClose={handleDeleteConfirmDialogClose}
        handleDelete={() => {
          // Handle the delete action here and then close the dialog
          handleDeleteClick(selecteWorkOrderNo);
          handleDeleteConfirmDialogClose();
        }}
      />
     
     
     
     
       
      </DialogContent>
    </Dialog>
  );
};

export default ViewWorkOrderModal;
