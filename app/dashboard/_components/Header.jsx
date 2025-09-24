"use client"
import React from 'react'
import Image from 'next/image'
// import {UserButton} from '@clerk/nextjs'
// add user status button and change user button


function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
        <Image src={'/icon.png'} width={50} height={50} alt="Logo icon"/>
        {/* <UserButton/> */}
    </div>
  )
}

export default Header