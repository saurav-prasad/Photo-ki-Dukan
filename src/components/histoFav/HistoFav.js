import React, { useEffect, useState } from 'react'
import supabaseClient from '../../functions/supabaseClient';
import sortArray from '../../functions/sortArray'
import Card from '../card/Card';
import { Slide } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { createFavourite } from '../../redux/features/favourite';
import { createDownloads } from '../../redux/features/downloads';
import { useLocation, useNavigate } from 'react-router-dom';

function HistoFav({ type, showAlert }) {
    const [data, setData] = useState()
    const histoFavState = useSelector(state => state[`${type}Reducer`])
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authReducer)
    const navigate = useNavigate()
    const location = useLocation()
    const [bottomPosition, setBottomPosition] = useState(false)

    // fetching data from database and adding it to the redux store
    useEffect(() => {
        async function fetchData() {
            setBottomPosition(false)
            setData()
            try {
                if (histoFavState.length === 0) {
                    const imageData = await supabaseClient
                        .from(type)
                        .select('*')
                        .eq('user_id', user?.id)
                    if (imageData.data.length <= 0) { setBottomPosition(true) }
                    dispatch(type === 'favourite' ? createFavourite(imageData.data) : createDownloads(imageData.data))
                }
            } catch (error) {
                console.log(error);
                setBottomPosition(true)
            }
        }
        fetchData()
    }, [location])

    // fetching data from redux store
    useEffect(() => {
        setData(sortArray(histoFavState))
    }, [histoFavState, location])

    // if logged out
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user])

    return (
        // <div className={`md:mt-10 mt-5 absolute w-full ${(data?.length === 1) && 'bottom-0'} ${(data?.length === 2) && 'sm:bottom-0'} ${(data?.length === 3) && "md:bottom-0"} ${(data?.length === 4) && 'xl:bottom-0 '} ${(bottomPosition || data?.length <= 0) ? 'bottom-0' : ""}`}>
        <div className={`md:mt-10 mt-5 absolute w-full ${(data?.length >= 1) && 'h-full'} ${(bottomPosition || data?.length <= 0) ? 'bottom-0' : ""}`}>
            {/* <Slide direction='up' duration={250}> */}
            {/* header */}
            <section className='text-white text-4xl md:text-5xl font-bold flex flex-col gap-2 mt-7 select-none'>
                <span className='w-full text-center capitalize'>{type}</span>
            </section>
            {/* cards */}
            <section className="bg-white mt-12 h-full">
                <div className="lg:mx-12 px-3 py-10 grid grid-cols-1 gap-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 h-full">
                    {
                        data && data.map((image) =>

                            <Card showAlert={showAlert} dwndTime={type === 'downloads' && true} favBtn={type === 'favourite' ? true : false} alterValues={true} key={image.id} data={image} />
                        )
                    }
                </div>
                {/* if image not available */}
                {
                    data?.length <= 0 && <div className="md:h-[33vh] h-[30vh] flex justify-center items-center">
                        <Slide duration={180} direction='up'>
                            <h1 className='text-center text-3xl md:text-4xl font-semibold text-gray-900 '>No {type}!</h1>
                        </Slide>
                    </div>
                }
            </section>
            {/* </Slide> */}
        </div >
    )
}

export default HistoFav
