import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';

import { Grid, TextField } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';

const EditDialog = ({ open, handleClose, Transporter_id }) => {
  const [formData, setFormData] = useState({
    Transporter_id: '',
    Name: '',
    Contact_Person: '',
    Phone_Number: '',
    Address: ''
  });



  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;




  useEffect(() => {
    console.log('Component mounted');

    if (Transporter_id ) {
      axios
        .get(`${REACT_APP_API_URL}api/transport/${Transporter_id}`)
        .then((response) => {
          console.log('API response:', response.data);

          setFormData({
            ...response.data // Spread the properties of response.data
          });
          console.log(formData, "plx textr")
        })
        .catch((error) => {
          console.error('Error fetching job data:', error);
        });
    }

    return () => {
      console.log('Component unmounted');
    };
  }, [Transporter_id]); // Include WorkOrderNo in the dependency array if it's used in the useEffect






  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



//update data
  const handleSubmit = () => {
    // Create an object containing the updated data
    const updatedData = {
      Transporter_id: formData.Transporter_id,
      Name: formData.Name,
      Contact_Person: formData.Contact_Person,
      Phone_Number: formData.Phone_Number,
      Address: formData.Address

      
    };

    // Send a PUT request to update the data
    axios
      .patch(`${REACT_APP_API_URL}api/transport/${Transporter_id}`, updatedData)
      .then((response) => {
        console.log('Data updated successfully:', response.data);
        // Show a success message (you can customize this)
        alert('Data updated successfully');
        // Refresh the page
        window.location.reload();
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
        <MainCard title="TransportEdit">
          {console.log(Transporter_id)}



           <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Transporter_id"
                  fullWidth
                  variant="outlined"
                  name="Transporter_id"
                  value={formData.Transporter_id}
                  onChange={(e) => handleChange(e, 'Transporter_id')}
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <TextField
                  label="Name"
                  fullWidth
                  variant="outlined"
                  name="Name"
                  value={formData.Name}
                  onChange={(e) => handleChange(e, 'Name')}
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <TextField
                  label="Contact Person"
                  fullWidth
                  variant="outlined"
                  name="Contact_Person"
                  value={formData.Contact_Person}
                  onChange={(e) => handleChange(e, 'Contact_Person')}
                />
              </Grid>

              
              <Grid item xs={6} md={3}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  variant="outlined"
                  name="Phone_Number"
                  value={formData.Phone_Number}
                  onChange={(e) => handleChange(e, 'Phone_number')}
                />
              </Grid>


                <Grid item xs={6} md={12}>
                  <TextField
                    label="Address"
                    fullWidth
                    variant="outlined"
                    name="Address"
                    value={formData.Address}
                    onChange={(e) => handleChange(e, 'Address')}
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
