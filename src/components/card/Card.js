import React, { useState } from 'react'
import CardDetail from '../cardDetail/CardDetail'
import { Zoom } from 'react-awesome-reveal'

function Card({ id, image, name, price, href, imageSrc, imageAlt, color }) {
    const [toggle, setToggle] = useState(false)
    return (

        <div key={id} className="relative">
            {
                toggle && <CardDetail image={imageSrc} toggle={toggle} setToggle={setToggle} />
            }
            <div onClick={() => { setToggle(!toggle) }} className="h-64 w-full bg-gray-200">
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="h-full w-full object-cover object-center rounded-md cursor-pointer hover:brightness-[0.85] transition-brightness duration-400"
                />
            </div>
            <div className="mt-3 flex justify-start items-center gap-3">
                {
                    Array.from({ length: 3 }).map((e, index) =>
                        <span key={index} className='bg-[#f5f5f5] text-[#767676] font-normal px-2 capitalize '>bloom</span>
                    )
                }
            </div>
        </div>

    )
}

export default Card