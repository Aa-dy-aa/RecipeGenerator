'use client'
// import { useUser } from '@clerk/nextjs'
import React, { useContext } from 'react'
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { UserRecipeListContext } from '/app/_context/UserRecipeListContext';
import userDetails from '/app/(auth)/userDetails.js';
function AddRecipe() {
    const { user,loading } = userDetails();
    const { userRecipeList, setUserRecipeList } = useContext(UserRecipeListContext);
    console.log(user);
    return (
        <div className='flex items-center justify-between'>
            <div>
                <h2 className='text-2xl'>
                    Hello, <span style={{ color: '#FF7B74' }} className='font-bold'>{user?.name}</span>
                </h2>
                <p className='text-sm text-gray-500'>
                    Create new Recipe with AI, Share with friends and earn from it
                </p>
            </div>
            <Link href={userRecipeList?.length >= 10 ? '/dashboard/upgrade' : '/create-recipe'}>
                <Button style={{ backgroundColor: '#FF7B74' }}>+ Create AI Recipe</Button>
            </Link>
        </div>
    )
}

export default AddRecipe;

