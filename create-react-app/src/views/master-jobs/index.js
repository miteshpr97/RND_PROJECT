import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import WorkOrder from './Work_Order/WorkOrder';
import TransporterJob from './Transporter/TransporterJob';
import VehicleType from './Vehicle_Type/VehicleType';


const MasterJobs = () => {
 
 

  return (
    <MainCard title=" Master Jobs">

        <div>
        <WorkOrder/>
        </div>
        <br></br>
        <div>
        <TransporterJob/>
        </div>
        <br></br>
        <div>
        <VehicleType/>
        </div>
        
      
 

    </MainCard>
  );
};

export default MasterJobs;
