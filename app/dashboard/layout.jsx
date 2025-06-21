"use client";
import React,{useState} from 'react'
import Header from './_components/Header'
import SideBar from './_components/SideBar'
import {UserRecipeListContext} from '../_context/UserRecipeListContext'

function DashboardLayout({children}) {
  const [userRecipeList,setUserRecipeList]=useState([]);
  return (
    <UserRecipeListContext.Provider value={{userRecipeList,setUserRecipeList}}>
    <div>
        <div className='md:w-64 hidden md:block'>
            <SideBar/>
        </div>
        <div className='md:ml-64'>
          <Header/>
          <div className='p-10'>
            {children}
          </div>
        </div>
    </div>
    </UserRecipeListContext.Provider>
  )
}

export default DashboardLayout