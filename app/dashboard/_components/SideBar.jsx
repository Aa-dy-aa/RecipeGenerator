"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { HiHome, HiBolt, HiMiniPower } from "react-icons/hi2"
import { MdOutlineContentPasteSearch } from "react-icons/md"

function SideBar() {
    const Menu = [
        { id: 1, name: 'Home', icon: <HiHome />, path: '/dashboard' },
        { id: 2, name: 'Explore', icon: <MdOutlineContentPasteSearch />, path: '/dashboard/explore' },
        { id: 3, name: 'Upgrade', icon: <HiBolt />, path: '/dashboard/upgrade' },
        { id: 4, name: 'Logout', icon: <HiMiniPower />, path: '/dashboard/logout' }
    ]

    const path = usePathname()

    return (
        <div className="fixed h-full md:w-64 p-5 shadow-md">
            {/* Logo container */}
            <div className="w-full flex justify-center items-center mb-2 -ml-8 overflow-hidden">
                <Image
                    src="/recipe.png"
                    alt="Recipe logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-55 md:w-60 h-auto object-contain scale-130 mx-auto"
                />
            </div>

            <hr className="mt-1 mb-5" />

            {/* Navigation Menu */}
            <ul>
                {Menu.map((item) => (
                    <div
                        key={item.id}
                        className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg ${
                            item.path === path && 'bg-gray-100 text-black'
                        }`}
                    >
                        <div className='text-2xl'>{item.icon}</div>
                        <h2>{item.name}</h2>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default SideBar

