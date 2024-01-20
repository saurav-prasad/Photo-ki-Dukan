import React, { useState } from 'react'
import './searchBar.css'
import { Search } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import runDebounce from '../../functions/debounce'

function SearchBar() {
    const location = useParams().query
    const navigate = useNavigate()
    const [data, setData] = useState('')



    let timer = null
    const onClick = (e) => {
        e?.preventDefault()
        if (data.length > 0) {
            // debouncing
            if (timer !== null) clearTimeout(timer)
            timer = setTimeout(() => {
                navigate(`/search/${data}`)
                timer = null
            }, 1000)
        }
    }

    return (
        <header className='mx-auto w-[85%] md:max-w-2xl pt-[4rem]'>
            <div className='searchContainer flex justify-start items-center gap-1 rounded-lg px-3 py-2 md:py-4'>
                {/* header title */}
                <div onClick={onClick} className='rounded-lg cursor-pointer py-1 px-3'>
                    <Search className='text-white' />
                </div>
                <form onSubmit={onClick} className='flex-1 flex justify-between items-center border-l-2 '>
                    <input
                        onChange={(e) => { setData(e.target.value) }}
                        type="text"
                        class="w-full bg-[#0d1829] flex bg-transparent ml-4 font-semibold text-lg text-white outline-0 placeholder:text-white placeholder:text-lg placeholder:font-semibold placeholder:select-none"
                        placeholder={location ? "Start new search" : "Search"}
                    />

                    <button type='submit' className='select-none cursor-pointer font-semibold text-base md:text-lg transition-all hover:bg-[#00000024] text-white border-[2px] border-white rounded-lg px-2'>
                        GO!
                    </button>
                </form>
            </div>
        </header>
    )
}

export default SearchBar