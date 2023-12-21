
// components/LogisticsAccordion.js
import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  Grid,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const initialFormData = {
  JobNo: '',
  TransporterID: '',
  VehicleCategory: '',
  VehicleType: '',
  VehicleNo: '',
  DriverName: '',
  UoM: '',
  WOLineNo: '',
  TaskDate: '',
  BuyCost: '',
  TripCount: '',
};

const LogisticsAccordion = ({ expanded, onAccordionChange,  setFormData, jobNo }) => {
  const [formList, setFormList] = useState([initialFormData]);

  // const handleChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const updatedFormList = [...formList];
  //   updatedFormList[index] = { ...updatedFormList[index], [name]: value };
  //   setFormList(updatedFormList);
  //   setFormData(updatedFormList); // Update the parent component's formData
  // };



  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormList = [...formList];
    updatedFormList[index] = {
      ...updatedFormList[index],
      [name]: value,
      // Preserve the existing JobNo
      JobNo: index === 0 ? jobNo : updatedFormList[index].JobNo,
    };
    setFormList(updatedFormList);
    setFormData(updatedFormList); // Update the parent component's formData
  };
  



  // const handleAddForm = () => {
  //   setFormList([...formList, { ...initialFormData }]);
  // };


  const handleAddForm = () => {
    setFormList([...formList, { ...initialFormData, JobNo: jobNo }]);
  };
  



  const handleDeleteForm = (index) => {
    if (index !== 0) {
      const updatedFormList = [...formList];
      updatedFormList.splice(index, 1);
      setFormList(updatedFormList);
      setFormData(updatedFormList); // Update the parent component's formData
    }
  };

  return (
    <Accordion expanded={expanded} sx={{ border: '0.5px solid #055F85', marginTop: '20px' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={onAccordionChange}
        sx={{ borderBottom: '1px solid #055F85' }}
      >
        <Typography variant="h3">Logistics</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" gutterBottom>
            Vehicles are used for this job
          </Typography>
          <Button
            variant="contained"
            style={{ backgroundColor: '#055f85', color: 'white' }}
            onClick={handleAddForm}
          >
            +Add Logistics
          </Button>
        </div>
        <br />
        {formList.map((formData, index) => (
          <form key={index} >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
              {index !== 0 && (
                <Button
                  style={{
                    marginBottom: '20px',
                    marginLeft: 'auto',
                    backgroundColor: '#f7114a',
                    color: 'white',
                  }}
                  variant="contained"
                  onClick={() => handleDeleteForm(index)}
                  startIcon={<ClearIcon />}
                >
                  Delete
                </Button>
              )}
            </div>
            <Grid container spacing={3}> 
              
              <Grid item xs={6} md={2}>
                <TextField
                  label="Job No"
                  fullWidth
                  variant="outlined"
                  name="JobNo"    
                   value={formData.JobNo === '' ? jobNo : formData.JobNo}
                  onChange={(e) => handleChange(e, index)}
                  
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  label="Transporter ID"
                  fullWidth
                  variant="outlined"
                  name="TransporterID"
                  value={formData.TransporterID}
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              {/* <Grid item xs={6} md={2}>
                <TextField
                  label="Vehicle Category"
                  fullWidth
                  variant="outlined"
                  name="VehicleCategory"
                  value={formData.VehicleCategory}
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid> */}
              <Grid item xs={6} md={2}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Vehicle Category</InputLabel>
                  <Select
                    label="Vehicle Category"
                    name="VehicleCategory"
                    value={formData.VehicleCategory}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="Option1">Truck</MenuItem>
                   
                  </Select>
                </FormControl>
              </Grid>







              <Grid item xs={6} md={2}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Vehicle Type</InputLabel>
                  <Select
                    label="Vehicle Type"
                    name="VehicleType"
                    value={formData.VehicleType}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="Option1">TATA ACE</MenuItem>
                    <MenuItem value="Option2">LPT 407</MenuItem>
                    {/* <MenuItem value="Option3">Flated Truck</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>


              <Grid item xs={6} md={2}>
                <TextField
                  label="VehicleNo"
                  fullWidth
                  variant="outlined"
                  name="VehicleNo"
                  value={formData.VehicleNo}
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  label="Driver Name"
                  fullWidth
                  variant="outlined"
                  name="DriverName"
                  value={formData.DriverName}
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  label="UoM"
                  fullWidth
                  variant="outlined"
                  name="UoM"
                  value={formData.UoM}
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  label="WOLine No"
                  fullWidth
                  variant="outlined"
                  name="WOLineNo"
                  value={formData.WOLineNo}
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  label="Task Date"
                  fullWidth
                  variant="outlined"
                  name="TaskDate"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.TaskDate}
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  label="Buy Cost"
                  fullWidth
                  variant="outlined"
                  name="BuyCost"
                  value={formData.BuyCost}
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  label="Trip Count"
                  fullWidth
                  variant="outlined"
                  name="TripCount"
                  value={formData.TripCount}
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
            </Grid>
          </form>
        ))}

        {/* <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button> */}
      </AccordionDetails>
    </Accordion>
  );
};

export default LogisticsAccordion;





