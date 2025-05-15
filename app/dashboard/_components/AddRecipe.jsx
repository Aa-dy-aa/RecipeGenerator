"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../../../components/ui/button';

function AddRecipe() {
    const { user } = useUser();
    
    return (
        <div className='flex items-center justify-between'>
            <div>
                <h2 className='text-2xl'>Hello, <span style={{ color: '#FF7B74' }}className='font-bold '>{user?.fullName}</span></h2>
                <p className='text-sm text-gray-500'>Create new Recipe with AI, Share with friends and earn from it</p>
            </div>
            <Button style={{ backgroundColor: '#FF7B74' }}>+ Create AI Recipe</Button>
        </div>
    )
}

export default AddRecipe;
