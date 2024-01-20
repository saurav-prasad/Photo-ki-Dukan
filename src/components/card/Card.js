import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function Card({ data }) {
    const location = useLocation().pathname
    const params = useParams()
    const navigate = useNavigate()

    const onClick = () => {
        navigate(`${location}/preview/${data.id}`)
    }

    useEffect(() => {
        document.body.style.overflow = params.id ? 'hidden' : 'auto';
    }, [location])

    return (

        <div className="relative">
            <div onClick={onClick} className="h-64 w-full bg-gray-200">
                <img
                     src={data.webformatURL}
                    alt={data.type}
                    className="h-full w-full object-cover object-center rounded-md cursor-pointer hover:brightness-[0.83] transition-brightness duration-450"
                />
            </div>
            <div className="mt-3 flex justify-start items-center flex-wrap gap-3">
                {
                    data.tags.split(', ').map((e, index) =>
                        <span key={index} className='bg-[#f5f5f5] text-[#767676] font-normal px-2 capitalize'>{e}</span>
                    )
                }
            </div>
        </div>

    )
}

export default Card