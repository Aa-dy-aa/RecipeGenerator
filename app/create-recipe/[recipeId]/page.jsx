"use client"
import React,{useEffect} from 'react'

function RecipeLayout({params}) {
  useEffect(()=>{
    console.log(params)
  },[params])
  const GetRecipe=()=>{}
  return (
    <div>RecipeLayout</div>
  )
}

export default RecipeLayout