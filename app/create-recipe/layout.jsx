"use client"
import React, { useState }  from 'react'
import {UserInputContext} from '../_context/UserInputContext'
import Header from '../dashboard/_components/Header'

function CreateRecipeLayout({children}) {
  const [userRecipeInput,setUserRecipeInput]=useState([]);
  return (
    <div>
      <UserInputContext.Provider value ={{userRecipeInput,setUserRecipeInput}}>
        <>
        <Header/>
        {children}
        </>
      </UserInputContext.Provider>
    </div>
  )
}

export default CreateRecipeLayout