import React from 'react'
import './header.css'
import { AlignRight } from 'lucide-react'

function Header() {
    return (
        <header className='md:mx-7 mx-2 pt-2 md:pt-9'>
            <div className='headerContainer flex justify-between items-center gap-4 rounded-lg px-3 md:px-6 py-4'>
                {/* header title */}
                <div>
                    <h1 className='transition-all hover:underline cursor-pointer select-none font-semibold text-lg text-white'>Homepage</h1>
                </div>
                {/* signin/ signup */}
                <div className='flex justify-between items-center gap-5'>
                    <div className='md:hidden block relative'>
                        <AlignRight strokeWidth={3} size={27} className='cursor-pointer text-white' />
                    </div>
                    {/* Login button */}
                    <div className='md:block hidden'>
                        <span className='transition-all hover:underline cursor-pointer select-none font-semibold text-lg text-white'>Login</span>
                    </div>
                    {/* signup button */}
                    <div className='md:block hidden'>
                        <button
                            className='border-2 transition-all hover:bg-[#00000024] px-2 rounded-lg cursor-pointer select-none font-semibold text-lg text-white'
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header