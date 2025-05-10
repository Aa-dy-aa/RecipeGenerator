import React from 'react'
import Image from 'next/image'
import {Button} from "@/components/ui/button";

function Header() {
  return (
      <div className="h-23 flex items-center overflow-hidden -ml-10 justify-between p-5 shadow-sm">
        <Image src="/recipe.png" width={250} height={160} alt="Recipe Icon" />
         <Button
        style={{ backgroundColor: '#FF7B74' }}
        className="text-white hover:opacity-90">Get Started</Button>
      </div>
  )
}

export default Header