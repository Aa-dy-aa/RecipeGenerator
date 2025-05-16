import React from 'react'
import Header from '../dashboard/_components/Header'

function CreateRecipeLayout({children}) {
  return (
    <div>
        <Header/>
        {children}
    </div>
  )
}

export default CreateRecipeLayout