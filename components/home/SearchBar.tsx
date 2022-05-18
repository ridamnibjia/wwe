import { useRouter } from 'next/router';
import React, { FormEvent, useContext, useState } from 'react'
import { BsSearch } from "react-icons/bs";
import { ThemeContext } from '../context/themeContext';

const SearchBar = () => {
    const Router = useRouter()
    const { theme, show } = useContext(ThemeContext)
    const [searchInput, setSearchInput] = useState("");
    const handleSubmitSearch = (e: FormEvent) => {
        e.preventDefault();
        Router.push(`/search?q=${searchInput}`);
    };


    return (
        <div className={`flex ${show ? 'xsm:flex' : 'xsm:hidden'} w-full sm:flex  rounded-sm shadow-md border-2  ${theme === 'light ' ? 'bg-white border-[#555]' : 'bg-[#333] border-[#555]'} items-center mb-4  overflow-hidden`}>
            <form onSubmit={handleSubmitSearch} className={`${theme === 'light' ? 'bg-white hover:bg-[#efefef]' : 'bg-[#222] hover:bg-[#444]'} flex items-center flex-1`}>
                <div className={`${theme === 'light' ? 'text-[#444]' : 'text-[#efefef]'} pl-3`}>
                    <BsSearch />
                </div>
                <input type="search" onChange={(e) => setSearchInput(e.target.value)} name="search" aria-label='search' className={`${theme === 'light' ? 'text-[#444]' : 'text-[#efefef]'}  bg-transparent text-lg flex-1 pr-2 outline-none pl-3 w-[90%]`} placeholder='Type something here...' />
                <button type='submit' className='bg-light-black xsm:px-4 md:px-8 transition duration-300 group relative z-50 hover:bg-main-black  py-2 text-white text-md font-md'>
                    Search
                </button>
            </form >
        </div >

    )
}

export default SearchBar