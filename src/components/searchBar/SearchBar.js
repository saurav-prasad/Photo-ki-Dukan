import React from 'react'
import './searchBar.css'
import { Search } from 'lucide-react'

function SearchBar() {
    return (
        <header className='mx-auto max-w-2xl pt-[4rem]'>
            <div className='searchContainer  flex justify-start items-center gap-1 rounded-lg px-3 py-4'>
                {/* header title */}
                <div className='rounded-lg cursor-pointer py-1 px-3'>
                    <Search className='text-white' />
                </div>
                <div className='flex-1 flex justify-between items-center border-l-2 '>
                    <input
                        type="text"
                        class="w-full bg-[#0d1829] flex bg-transparent ml-4 font-semibold text-lg text-white outline-0 placeholder:text-white placeholder:text-lg placeholder:font-semibold placeholder:select-none"
                        placeholder="Search"
                    />

                    <div className='select-none cursor-pointer font-semibold text-lg transition-all hover:bg-[#00000024] text-white border-[2px] border-white rounded-lg px-2'>
                        GO!
                    </div>
                </div>
            </div>
        </header>
    )
}

export default SearchBar