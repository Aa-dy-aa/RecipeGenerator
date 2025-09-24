'use client'
import React from 'react';
import Image from 'next/image';
import { Button } from "../../components/ui/button";
import { useRouter } from 'next/navigation'
import Link from 'next/link';
function Header() {
   const router = useRouter();
  
    const handleGetStarted = () => {
      router.push('/dashboard'); 
    }
  return (
    <div className="h-24 flex items-center justify-between px-6 py-4 shadow-sm bg-white">
      <Image src="/recipe.png" width={200} height={140} alt="Recipe Icon" />
      <Button
        style={{ backgroundColor: '#FF7B74' }}
        className="text-white hover:opacity-90"
        onClick={handleGetStarted}
      >
        Get Started
      </Button>
      <div className="space-x-4">
        <Link href="/login">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
            Login
          </button>
        </Link>

        <Link href="/register">
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
