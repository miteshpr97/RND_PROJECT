import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';

import { Grid, TextField } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';

const EditDialog = ({ open, handleClose, ServiceLineNo }) => {
  const [formData, setFormData] = useState({
    ServiceDescription: '',
    ServiceLineNo: '',
    UoM: '',
    ContractRate: ''
  });


  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    console.log('Component mounted');

    if (ServiceLineNo) {
      axios
        .get(`${REACT_APP_API_URL}api/workOrder/${ServiceLineNo}`)
        .then((response) => {
          console.log('API response:', response.data);

          setFormData({
            ...response.data // Spread the properties of response.data
          });
        })
        .catch((error) => {
          console.error('Error fetching job data:', error);
        });
    }

    return () => {
      console.log('Component unmounted');
    };
  }, [ServiceLineNo]); // Include ServiceLineNo in the dependency array if it's used in the useEffect

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };




  const handleSubmit = () => {
    // Create an object containing the updated data
    const updatedData = {
      ServiceDescription: formData.ServiceDescription,
      ServiceLineNo: formData.ServiceLineNo,
      UoM: formData.UoM,
      ContractRate: formData.ContractRate

      
    };

    // Send a PUT request to update the data
    axios
      .patch(`${REACT_APP_API_URL}api/workOrder/${ServiceLineNo}`, updatedData)
      .then((response) => {
        console.log('Data updated successfully:', response.data);
        // Show a success message (you can customize this)
        alert('Data updated successfully');
        // Refresh the page
      //  window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        // Show an error message (you can customize this)
        alert('Error updating data');
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}
    sx={{
      "& .MuiDialog-container": {
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "800px",  // Set your width here
        },
      },
    }}
    
    
    >
      <DialogContent>
        <MainCard title="Work OrderEdit">
          {console.log(ServiceLineNo)}
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <TextField
                label="Service Description"
                fullWidth
                variant="outlined"
                name="ServiceDescription"
                value={formData.ServiceDescription}
                onChange={(e) => handleChange(e, 'ServiceDescription')}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                label="Service LineNo"
                fullWidth
                variant="outlined"
                name="ServiceLineNo"
                value={formData.ServiceLineNo}
                onChange={(e) => handleChange(e, 'ServiceLineNo')}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                label="UoM"
                fullWidth
                variant="outlined"
                name="UoM"
                value={formData.UoM}
                onChange={(e) => handleChange(e, 'UoM')}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                label="Contract Rate"
                fullWidth
                variant="outlined"
                name="ContractRate"
                value={formData.ContractRate}
                onChange={(e) => handleChange(e, 'ContractRate')}
              />
            </Grid>
          </Grid>
        </MainCard>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button  onClick={handleSubmit}  color="primary">Save</Button>

        
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
