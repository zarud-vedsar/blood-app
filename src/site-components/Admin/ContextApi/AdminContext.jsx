import React, { createContext, useContext, useState } from 'react'

const AdminContext = createContext();

export const AdminProvider = ({children}) => {

    const [adminDetail,setAdminDetail] = useState(null);

  return (
    <AdminContext.Provider value={{ adminDetail, setAdminDetail }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdminContext = () => useContext(AdminContext);

