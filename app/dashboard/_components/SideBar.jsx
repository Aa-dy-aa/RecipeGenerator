'use client';

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { HiHome, HiBolt, HiMiniPower } from 'react-icons/hi2';
import { MdOutlineContentPasteSearch } from 'react-icons/md';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { UserRecipeListContext } from '../../_context/UserRecipeListContext';

// 📦 Component to display Linear Progress with percentage label
function LinearProgressWithLabel({ value }) {
  return (
    <Box display="flex" alignItems="center" className="mt-2 w-full">
      <Box width="100%" mr={1}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: 8,
            borderRadius: 5,
            [`& .MuiLinearProgress-bar`]: {
              backgroundColor: '#FF7B74',
            },
          }}
        />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

function SideBar() {
  const { userRecipeList, setUserRecipeList } = useContext(UserRecipeListContext);

  const Menu = [
    { id: 1, name: 'Home', icon: <HiHome />, path: '/dashboard' },
    { id: 2, name: 'Explore', icon: <MdOutlineContentPasteSearch />, path: '/dashboard/explore' },
    { id: 3, name: 'Upgrade', icon: <HiBolt />, path: '/dashboard/upgrade' },
    { id: 4, name: 'Logout', icon: <HiMiniPower />, path: '/dashboard/logout' }
  ];

  const path = usePathname();
  const maxRecipes = 10; // 💡 Set your max limit here
  const recipeCount = userRecipeList?.length || 0;
  const progress = Math.min((recipeCount / maxRecipes) * 100, 100); // 🚫 cap at 100%

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md flex flex-col justify-between">
      <div>
        {/* Logo */}
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
                  item.path === path && 'bg-gray-100 text-black mb-3'
                }`}
              >
                <div className="text-2xl">{item.icon}</div>
                <h2>{item.name}</h2>
              </div>
            </Link>
          ))}
        </ul>
      </div>

      {/* Bottom Progress Block */}
      <div className="absolute bottom-10 w-[80%]">
        <LinearProgressWithLabel value={progress} />
        <h2 className="text-sm my-2">
          {recipeCount} out of {maxRecipes} Recipes created!
        </h2>
        <h2 className="text-xs text-gray-500">
          Upgrade your plan for unlimited Recipe Generation
        </h2>
      </div>
    </div>
  );
}

export default SideBar;

