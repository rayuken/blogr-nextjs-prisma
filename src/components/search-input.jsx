"use client";
import React from "react";

const SearchInput = ({setSearchTerm, search}) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className='mb-4'>
        <input
          type='text'
          placeholder='Search by title or author...'
          className='border p-2 rounded-md text-gray-900'
          onChange={handleSearchChange}
        />
        <button className="bg-purple-700 hover:bg-purple-600 h-11 rounded-lg p-2" onClick={search}>Search</button>
      </div>
  );
};

export default SearchInput;
