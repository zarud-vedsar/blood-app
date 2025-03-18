import React from 'react'
import { useAdminContext } from '../../../site-components/Admin/ContextApi/AdminContext'
import Navbar from '../../../site-components/Admin/components/Navbar';
const Dashboard = () => {
const {adminDetail} = useAdminContext();
console.log(adminDetail)
  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default Dashboard
