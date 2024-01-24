import { Star } from 'lucide-react'
import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import supabaseClient from '../../functions/supabaseClient'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFavourite } from '../../redux/features/favourite'
import timePassed from '../../functions/timePassed'
import { Zoom } from 'react-awesome-reveal'

function Card({ data, alterValues, favBtn, showAlert, dwndTime }) {
    const location = useLocation().pathname
    const params = useParams()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()

    // on image click
    const onClick = () => {
        navigate(`${location}/preview/${alterValues ? data.image_id : data.id}`)
    }

    // on image detail modal open
    useEffect(() => {
        document.body.style.overflow = params.id ? 'hidden' : 'auto';
    }, [location])

    // removing an image from favourite list
    const removeFromFav = async () => {
        try {

            const { error } = await supabaseClient
                .from('favourite')
                .delete()
                .eq('user_id', user.id)
                .eq('image_id', data.image_id)
            !error && dispatch(deleteFavourite({ id: data.image_id }))
        } catch (error) {
            console.log(error);
        }
    };

    // on favourite icon click
    const onFavClick = () => {
        removeFromFav()
        showAlert('Image removed from favourite')
    }

    return (
        <>
            <Zoom duration={150} triggerOnce>
                <div className="relative">
                    {/* Image */}
                    <div className="h-64 w-full bg-gray-200 relative">
                        <img onClick={onClick}
                            src={alterValues ? data.image_url : data.webformatURL}
                            alt={data?.type}
                            className="h-full w-full object-cover object-center rounded-md cursor-pointer hover:brightness-[0.83] transition-brightness duration-450 z-[5]"
                        />
                        {/* favourite button */}
                        {favBtn &&
                            <Star onClick={onFavClick} size={30} className={`cursor-pointer absolute top-2 right-2 text-amber-500 fill-amber-400 z-[6]`} />
                        }
                        {/* timestamp */}
                        {dwndTime &&
                            <span className='absolute top-0 right-0 select-none text-xs font-medium text-slate-500 bg-white pl-1 rounded-l-lg text-center pb-[0.1rem]'>{timePassed(data.timestamp)} ago</span>
                        }
                    </div>
                    {/* tags */}
                    <div className={`mt-3 flex 'justify-start' items-center flex-wrap gap-3`}>
                        {
                            data.tags?.split(', ').map((e, index) =>
                                <span key={index} className='bg-[#f5f5f5] text-[#767676] font-normal px-2 capitalize'>{e}</span>
                            )
                        }
                    </div>
                </div>
            </Zoom>
        </>
    )
}

export default Card