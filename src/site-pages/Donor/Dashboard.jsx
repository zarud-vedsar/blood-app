import React from 'react'
import { useDonor } from "../../site-components/Donor/ContextApi/DonorContext";

const Dashboard = () => {
  const { donor, setDonor } = useDonor();
    console.log(donor);
  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard;
