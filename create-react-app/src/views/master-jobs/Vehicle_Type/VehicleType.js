import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, TextField, Button } from '@mui/material';
import { Container } from '@mui/system';
import ViewVehicleTypeModel from './ViewVehicleTypeModel';

const initialFormData = {
  ServiceDescription: '',
  ServiceLineNo: '',
  UoM: '',
  ContractRate: ''
};

export default function VehicleType() {
  const [formData, setFormData] = useState(initialFormData); // Use object, not array
  const [workOrderExpanded, setWorkOrderExpanded] = useState(true);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;


  const handleOpen = () => {
    setViewModalOpen(true);
  };

  const handleClose = () => {
    setViewModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${REACT_APP_API_URL}api/workOrder`;
      console.log('Request URL:', url);
      console.log('Request Data:', JSON.stringify(formData));

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Handle successful response
        alert('Data submitted successfully');
        console.log('Data submitted successfully');
        setFormData(initialFormData); // Reset form data
      } else {
        // Handle error response
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error occurred while submitting data', error);
    }
  };

  return (
    <div>
      <Accordion
        expanded={workOrderExpanded}
        onChange={() => setWorkOrderExpanded(!workOrderExpanded)}
        sx={{ border: '0.5px solid #055F85', marginTop: '20px' }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography style={{ fontSize: '18px', color: 'black' }}>Vehicle</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Vehicle Category"
                  fullWidth
                  variant="outlined"
                  name="Vehicle_Category"
                  value={formData.Vehicle_Category}
                  onChange={(e) => handleChange(e, 'Vehicle_Category')}
                />
              </Grid>

              <Grid item xs={6} md={3}>
                <TextField
                  label="Vehicle Type"
                  fullWidth
                  variant="outlined"
                  name="Vehicle_Type"
                  value={formData.Vehicle_Type}
                  onChange={(e) => handleChange(e, 'Vehicle_Type')}
                />
              </Grid>

          

              <Container
              sx={{display:'flex', justifyContent:'space-between'}}
              
              >
                <Button variant="contained" style={{ backgroundColor: '#15698c', color: 'white', marginTop: '10px' }} 
                onClick={handleOpen}

                >
                  view
                </Button>
                <Button variant="contained" style={{ backgroundColor: '#15698c', color: 'white', marginTop: '10px' }} type="submit">
                  Submit
                </Button>

                {viewModalOpen && <ViewVehicleTypeModel  onClose={handleClose} />}
              </Container>
            </Grid>
          </form>

          


          
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
