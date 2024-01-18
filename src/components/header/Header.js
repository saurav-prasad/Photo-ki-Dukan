import React from 'react'
import './header.css'

function Header() {
    return (
        <header className='mx-7 pt-9'>
            <div className='headerContainer flex justify-between items-center gap-4 rounded-lg px-6 py-4'>
                {/* header title */}
                <div>
                    <h1 className='transition-all hover:underline cursor-pointer select-none font-semibold text-lg text-white'>Homepage</h1>
                </div>
                {/* signin/ signup */}
                <div className='flex justify-between items-center gap-5'>
                    {/* Login button */}
                    <div>
                        <span className='transition-all hover:underline cursor-pointer select-none font-semibold text-lg text-white'>Login</span>
                    </div>
                    {/* signup button */}
                    <div>
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