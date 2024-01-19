import React, { useEffect, useState } from 'react'
import CardDetail from '../cardDetail/CardDetail'

function Card({ id, image, name, price, href, imageSrc, imageAlt, color }) {

    const [toggle, setToggle] = useState(false)
    useEffect(() => {
        document.body.style.overflow = toggle ? 'hidden' : 'auto';
    }, [toggle])

    return (

        <div key={id} className="relative">
            {
                toggle && <CardDetail image={imageSrc} toggle={toggle} setToggle={setToggle} />
            }
            <div onClick={() => { setToggle(!toggle) }} className="h-64 w-full bg-gray-200">
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="h-full w-full object-cover object-center rounded-md cursor-pointer hover:brightness-[0.83] transition-brightness duration-450"
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