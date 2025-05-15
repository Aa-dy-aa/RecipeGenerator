"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { HiHome, HiBolt, HiMiniPower } from "react-icons/hi2"
import { MdOutlineContentPasteSearch } from "react-icons/md"
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel({ value }) {
    return (
        <Box display="flex" alignItems="center" className="mt-5 w-full">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" value={value} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(value)}%`}</Typography>
            </Box>
        </Box>
    );
}

function SideBar() {
    const Menu = [
        { id: 1, name: 'Home', icon: <HiHome />, path: '/dashboard' },
        { id: 2, name: 'Explore', icon: <MdOutlineContentPasteSearch />, path: '/dashboard/explore' },
        { id: 3, name: 'Upgrade', icon: <HiBolt />, path: '/dashboard/upgrade' },
        { id: 4, name: 'Logout', icon: <HiMiniPower />, path: '/dashboard/logout' }
    ];

    const path = usePathname();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
        }, 800);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed h-full md:w-64 p-5 shadow-md flex flex-col justify-between">
            <div>
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
                        <Link href={item.path} key={item.id}>
                            <div
                                className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg ${
                                    item.path === path && 'bg-gray-100 text-black'
                                }`}
                            >
                                <div className='text-2xl'>{item.icon}</div>
                                <h2>{item.name}</h2>
                            </div>
                        </Link>
                    ))}
                </ul>
            </div>

            {/* Bottom block: progress bar + text */}
            <div className="flex flex-col gap-1">
                <LinearProgressWithLabel value={progress} />
                <p className="text-sm text-gray-700">3 out of 5 Recipes created!</p>
                <p className="text-xs text-gray-500">Upgrade your plan for unlimited Recipe Generation</p>
            </div>
        </div>
    )
}

export default SideBar;



