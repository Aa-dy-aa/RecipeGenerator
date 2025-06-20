'use client';

import React, { useState, useRef, useEffect } from 'react';
import { HiTrash } from 'react-icons/hi2';

function DropdownOption({ children, handleOnDelete}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 📌 Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center items-center rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-2 transition duration-150 ease-in-out"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={toggleDropdown}
      >
        {children}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 rounded-xl bg-white z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none rounded-xl transition-colors duration-150"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-0"
            onClick={() => {
              {handleOnDelete}
              setIsOpen(false);
            }}
          >
            <HiTrash className="text-lg" />
            Delete
          </a>
        </div>
      )}
    </div>
  );
}

export default DropdownOption;
