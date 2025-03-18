import React from 'react'
import { useAdminContext } from '../../../site-components/Admin/ContextApi/AdminContext'
const Dashboard = () => {
const {adminDetail} = useAdminContext();
console.log(adminDetail)
  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
