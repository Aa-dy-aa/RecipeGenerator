'use client'
import React from 'react';
import Image from 'next/image';
import { Button } from "../../components/ui/button";
import { useRouter } from 'next/navigation';

function Header() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');  // Redirect to login instead of dashboard
  };

  return (
    <header className="h-24 flex items-center justify-between px-6 py-4 shadow-sm bg-white">
      {/* Logo */}
      <Image src="/recipe.png" width={200} height={140} alt="Recipe Icon" />

      {/* Get Started CTA */}
      <Button
        style={{ backgroundColor: '#FF7B74' }}
        className="text-white hover:opacity-90"
        onClick={handleGetStarted}
      >
        Get Started
      </Button>
    </header>
  );
}

export default Header;
