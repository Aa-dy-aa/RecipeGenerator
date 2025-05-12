import React from 'react';
import Image from 'next/image';
import { Button } from "../../components/ui/button";

function Header() {
  return (
    <div className="h-24 flex items-center justify-between px-6 py-4 shadow-sm bg-white">
      <Image src="/recipe.png" width={200} height={140} alt="Recipe Icon" />
      <Button
        style={{ backgroundColor: '#FF7B74' }}
        className="text-white hover:opacity-90"
      >
        Get Started
      </Button>
    </div>
  );
}

export default Header;
