"use client"
import {useUser} from '@clerk/nextjs'
import React from 'react'

function AddRecipe() {
    const {user}=useUser();
  return (
    <div>
        <div>
            <h2 className='text-2xl'>Hello, <span className='font-bold'>{user?.fullName}</span></h2>
        </div>
    </div>
  )
}

export default AddRecipe