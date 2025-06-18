"use client"
import React,{useEffect} from 'react'
import {db} from '../../../configs/db'
import {RecipeList} from '../../../configs/schema'
import {eq} from 'drizzle-orm'
import {useUser} from '@clerk/nextjs'

function UserRecipeList() {
  const{user}=useUser();
  useEffect(()=>{
    user&&getUserRecipes();
  },[user])
  const getUserRecipes=async()=>{
    const result=await db.select().from (RecipeList)
    .where(eq(RecipeList?.createdBy,user?.primaryEmailAddress?.emailAddress));
    console.log(result);
  }
  return (
    <div>UserRecipeList</div>
  )
}

export default UserRecipeList