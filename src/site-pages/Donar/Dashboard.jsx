import React from 'react'
import { useDonar } from "../../site-components/Donor/ContextApi/DonarContext";

const Dashboard = () => {
  const { donar, setDonar } = useDonar();
    console.log(donar);
  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard;
