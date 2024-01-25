import React from 'react'
import { useNavigate } from 'react-router-dom'

function Trendings() {
    const navigate = useNavigate()

    const onClick = (e) => {
        navigate(`/search/${e}`)
    }

    const list = ['flowers', 'love', 'forest', 'river', 'rose']

    return (
        <header className='mx-auto pt-8 w-fit'>
            <div className='headerContainer flex justify-start items-center gap-1 rounded-lg px-3 py-2'>
                <span className='cursor-pointer select-none font-semibold text-base text-white'>Trendings:</span>
                <div className='flex flex-row justify-start items-center gap-2 flex-wrap'>
                    {
                        list.map((e, index) =>
                            <span onClick={() => onClick(e)} key={index} className='transition-all hover:underline cursor-pointer select-none font-normal text-base text-white'>{e}</span>)
                    }
                </div>
            </div>
        </header>
    )
}

export default Trendings