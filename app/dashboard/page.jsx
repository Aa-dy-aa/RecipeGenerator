import React from 'react'
import {UserButton} from '@clerk/nextjs'
import AddRecipe from './_components/AddRecipe'

function Dashboard() {
  return (
    <div>
      <AddRecipe/>
    </div>
  )
}

export default Dashboard