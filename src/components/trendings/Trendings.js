import React from 'react'

function Trendings() {
    const list = ['flowers', 'love', 'forest', 'river']
    return (
        <header className='mx-auto pt-8 w-fit'>
            <div className='headerContainer flex justify-start items-center gap-1 rounded-lg px-3 py-2'>
                <span className='cursor-pointer select-none font-semibold text-base text-white'>Trendings:</span>
                <div className='space-x-1'>
                    {
                        list.map((e, index) =>
                            <span key={index} className='transition-all hover:underline cursor-pointer select-none font-normal text-base text-white'>{e}</span>)
                    }
                </div>
            </div>
        </header>
    )
}

export default Trendings