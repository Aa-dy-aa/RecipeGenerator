import React from 'react'
import AddRecipe from './_components/AddRecipe'
import UserRecipeList from './_components/UserRecipeList'

function Dashboard() {
  return (
    <div>
      <AddRecipe/>
      <UserRecipeList/>
    </div>
  )
}

export default Dashboard