import React, { useState } from 'react';
import LogisticsAccordion from './LogisticsAccordion';
import MHEAccordion from './MHEAccordion';
import SpecialAccordion from './SpecialAccordion';
import ManAccordion from './ManAccordion';
import WorkAccordion from './WorkAccordion';
import { useNavigate } from 'react-router';

const Todo = ({ JobNo, handleSubmit }) => {
  const navigate = useNavigate();
  const [logisticsExpanded, setLogisticsExpanded] = useState(false);
  const [mheExpanded, setMheExpanded] = useState(false);
  const [manExpanded, setmanExpanded] = useState(false);
  const [specialExpanded, setspecialExpanded] = useState(false);
  const [workOrderExpanded, setworkOrderExpanded] = useState(false);

  // const [activeAccordion, setActiveAccordion] = useState(null);
  const [logisticsFormData, setLogisticsFormData] = useState([]);
  const [mheFormData, setMheFormData] = useState([]);
  const [manPowerFormData, setManPowerFormData] = useState([]);
  const [specialFormData, setSpecialFormData] = useState([]);
  const [workOrderFormData, setworkOrderFormData] = useState([]);

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const handleLogisticsAccordionChange = () => {
    setLogisticsExpanded(!logisticsExpanded);
  };

  const handleMheAccordionChange = () => {
    setMheExpanded(!mheExpanded);
  };

  const handleManAccordionChange = () => {
    setmanExpanded(!manExpanded);
  };

  const handlespecialAccordionChange = () => {
    setspecialExpanded(!specialExpanded);
  };

  const handleworkOrderAccordionChange = () => {
    setworkOrderExpanded(!workOrderExpanded);
  };

  const handleSubmitAllData = async () => {
    try {
      handleSubmit();

      // Submit Logistics Data
      // const logisticsResponse = await fetch(`${REACT_APP_API_URL}api/logistics`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(logisticsFormData),
      // });

      // if (logisticsResponse.ok) {
      //   console.log('Logistics data submitted successfully');
      //   setLogisticsFormData([]);
      // } else {
      //   console.error('Failed to submit logistics data');
      // }

      // Submit Logistics Data

      // Submit Logistics Data

      const logisticsResponse = await fetch(`${REACT_APP_API_URL}api/logistics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(logisticsFormData)
      });

      if (logisticsResponse.ok) {
        console.log('Logistics data submitted successfully');
        setLogisticsFormData({}); // Set to an empty object
      } else {
        const errorData = await logisticsResponse.json();
        console.error('Failed to submit logistics data:', errorData);
      }

      // Submit MHE Data
      const mheResponse = await fetch(`${REACT_APP_API_URL}http://localhost:3306/api/mhe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mheFormData)
      });

      if (mheResponse.ok) {
        console.log('MHE data submitted successfully');
        setMheFormData([]);
      } else {
        console.error('Failed to submit MHE data');
      }

      // Submit ManPower Data
      const manPowerResponse = await fetch(`${REACT_APP_API_URL}api/manPower`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(manPowerFormData)
      });

      if (manPowerResponse.ok) {
        console.log('ManPower data submitted successfully');
        setManPowerFormData([]);
      } else {
        console.error('Failed to submit ManPower data');
      }

      // Submit Special Data
      const specialResponse = await fetch(`${REACT_APP_API_URL}api/special`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(specialFormData)
      });

      if (specialResponse.ok) {
        console.log('Special data submitted successfully');
        setSpecialFormData([]);
      } else {
        console.error('Failed to submit Special data');
      }



      const workOrderResponse = await fetch(`${REACT_APP_API_URL}api/workOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(workOrderFormData)
      });

      if (workOrderResponse.ok) {
        console.log('work Order data submitted successfully');
        setworkOrderFormData([]);
      } else {
        console.error('Failed to work data');
      }

      navigate('/close-jobs');
      window.location.reload();
      //  navigate('/close-jobs')
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div>
      {/* Logistics Accordion */}
      <LogisticsAccordion
        expanded={logisticsExpanded}
        onAccordionChange={handleLogisticsAccordionChange}
        formData={logisticsFormData}
        setFormData={setLogisticsFormData}
        jobNo={JobNo} // Pass the JobNo data here
      />c

      {/* MHE Accordion */}
      <MHEAccordion
        expanded={mheExpanded}
        onAccordionChange={handleMheAccordionChange}
        formData={mheFormData}
        setFormData={setMheFormData}
        jobNo={JobNo} // Pass the JobNo data here
      />

      {/* ManPower Accordion */}
      <ManAccordion
        expanded={manExpanded}
        onAccordionChange={handleManAccordionChange}
        formData={manPowerFormData}
        setFormData={setManPowerFormData}
        jobNo={JobNo} // Pass the JobNo data here
      />

      {/* Special Accordion */}
      <SpecialAccordion
        expanded={specialExpanded}
        onAccordionChange={handlespecialAccordionChange}
        formData={specialFormData}
        setFormData={setSpecialFormData}
        jobNo={JobNo} // Pass the JobNo data here
      />

      <WorkAccordion
        expanded={workOrderExpanded}
        onAccordionChange={handleworkOrderAccordionChange}
        formData={workOrderFormData}
        setFormData={setworkOrderFormData}
        jobNo={JobNo} // Pass the JobNo data here
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleSubmitAllData}
          style={{
            marginBottom: '10px',
            backgroundColor: '#15698c',
             color: 'white',
            borderRadius: '6px',
            fontFamily: 'sans-serif',
            marginTop: '5px',
            padding: '9px 20px',
            fontSize: '18px',
            cursor: 'pointer',
            fontWeight: '600px'
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Todo;
